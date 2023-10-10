import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaging, Paging } from 'src/helpers/helper';
import { Equal, Like, Raw, Repository } from 'typeorm';
import { Classroom } from 'src/entities/classes.entity';
import { User } from 'src/entities/user.entity';
import { Course } from 'src/entities/courses.entity.ts';
import { StudentHasExercise } from 'src/entities/student-has-exercises.entity';
import { UserCoursesClasses } from 'src/entities/user-courses-classes.entity';
import * as _ from 'lodash';
import { UpdateCoursesDto } from './dtos/update-accessory.dto';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Injectable()
export class DepartmentService {
	constructor(
		@InjectRepository(Classroom) private readonly classRoomRepo: Repository<Classroom>,
		@InjectRepository(User) private readonly UserRepository: Repository<User>,
		@InjectRepository(Course) private readonly CourseRepository: Repository<Course>,
		@InjectRepository(StudentHasExercise) private readonly StudentHasExerciseRepo: Repository<StudentHasExercise>,
		@InjectRepository(UserCoursesClasses) private readonly courseHasClassRepo: Repository<UserCoursesClasses>,
	) { }

	async getDepartments(paging: IPaging, filters: any) {
		let conditions = await this.buildConditions(filters);

		const [departments, total] = await this.CourseRepository.findAndCount({
			where: conditions,
			relations: {
				user: true,
				classrooms: true
			},
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { result: departments, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async getOneById(id: number) {
		return await this.CourseRepository.findOne({ 
			where: {
				id: id
			},
			relations: {
				user: true,
				classrooms: true
			},
		 });
	}

	async createDepartment(data: any) {
		data.created_at = new Date();
		data.updated_at = new Date();
		let newCate: any = await this.CourseRepository.create({
			...data
		});

		await this.CourseRepository.save(newCate);
		return newCate;
	}

	async updateDepartment(id: number, data: UpdateCoursesDto) {
		if(_.isEmpty(await this.getOneById(id))) {
			throw new BadRequestException({code: 'C0001', message: 'Course not found'});
		}
		const newData = { ...data };
		newData.updated_at = new Date();
		await this.CourseRepository.update(id, newData);		
		return this.getOneById(id);
	}

	async deleteDepartment(id: number): Promise<void> {
		await this.classRoomRepo.delete({ course_id: id });
		await this.courseHasClassRepo.delete({course_id: id});
		await this.CourseRepository.delete(id);
	}

	async buildConditions(filters: any) {
		const conditions: any = {};

		if (filters.id) conditions.id = Equal(filters.id);
		if (filters.name) conditions.name = Raw(alias => `${alias} LIKE '%${filters.name}%'`);
		if (filters.status) conditions.status = Equal(filters.status);
		if (filters.code && filters.code.trim() != '') conditions.code = Like(`%${filters.code.trim()}%`);
		if (filters.user_name && filters.user_name.trim() != '') {
			conditions.user = {
				full_name: Like(`%${filters.user_name.trim()}%`)
			};
		}

		if (filters.user_id) {
			conditions.user = {
				id: filters.user_id
			};
		}

		return conditions;
	}
}
