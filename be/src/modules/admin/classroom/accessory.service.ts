import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Like, Raw, Repository } from "typeorm";
import { IPaging } from "../../../helpers/interface/paging.interface";
import { Paging } from "../../../helpers/response/response";
import { CreateAccessoryDto } from "./dtos/create-accessory.dto";
import { UpdateAccessoryDto } from './dtos/update-accessory.dto';
import { Classroom } from 'src/entities/classes.entity';
import { User } from 'src/entities/user.entity';
import { Course } from 'src/entities/courses.entity.ts';
import { StudentHasExercise } from 'src/entities/student-has-exercises.entity';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { UserCoursesClasses } from 'src/entities/user-courses-classes.entity';

@Injectable()
export class AccessoryService {
	constructor(
		@InjectRepository(Classroom) private readonly classRoomRepo: Repository<Classroom>,
		@InjectRepository(Course) private readonly courseRepo: Repository<Course>,
		@InjectRepository(UserCoursesClasses) private readonly userCoursesClassesRepo: Repository<UserCoursesClasses>,
	) { }

	async buildConditions(filters: any) {
		const conditions: any = {};
		if (filters) {
			if (filters.id) conditions.id = Equal(filters.id);
			if (filters.status) conditions.status = Equal(filters.status);
			if (filters.name && filters.name.trim() != '') conditions.name = Like(`%${filters.name.trim()}%`);
			if (filters.code && filters.code.trim() != '') conditions.code = Like(`%${filters.code.trim()}%`);
			if (filters.course_name && filters.course_name.trim() != '') {
				conditions.course = {
					name: Like(`%${filters.course_name.trim()}%`)
				};
			}
			if (filters?.user_id) {
				conditions.course = {
					user_id: filters.user_id
				}
			}
		}

		return conditions;
	}

	async getLists(paging: IPaging, filters: any, req?: any) {
		let conditions: any = await this.buildConditions(filters);
		if(req?.user.role === 2) {
			conditions.course = {
				user_id: req.user.id
			};
		}
		const [results, total] = await this.classRoomRepo.findAndCount({
			where: conditions,
			relations: {
				course: true
			},
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		const rs: any = results;

		if(!_.isEmpty(rs)) {
			for(let item of rs) {
				item.total = await this.userCoursesClassesRepo.count({
					where: {
						class_id: item.id
					}
				}) || 0;
				if(req?.user?.role === 3) {
					item.is_joined = await this.userCoursesClassesRepo.findOne({
						where: {
							user_id: req.user.id,
							class_id: item.id
						}
					})
				}

			}
		}

		return { result: rs, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async createData(data: CreateAccessoryDto) {

		const course = await this.courseRepo.findOne({ where: { id: data.course_id, status: 1 } });
		if (_.isEmpty(course)) {
			throw new BadRequestException({ code: 'CL0001', message: 'Course not found' });
		}
		data.created_at = new Date();
		data.updated_at = new Date();

		let newCate = await this.classRoomRepo.create({
			...data
		});
		if (!_.isEmpty(data.slot_dates)) {
			newCate.slot_date = data.slot_dates.join(',');
		}
		await this.classRoomRepo.save(newCate);
		return newCate;
	}


	async joinDataById(id: any, userId: number) {
		let count = await this.userCoursesClassesRepo.count({
			where: {
				class_id: id
			}
		});
		let countJoinUser = await this.userCoursesClassesRepo.count({
			where: {
				class_id: id,
				user_id: userId
			}
		});
		let classroom = await this.classRoomRepo.findOne({
			where: {
				id: id,
				status: 1
			}
		});
		if (count === classroom.student_max_number) {
			throw new BadRequestException({ code: 'CL0002', message: 'Classroom is full' });
		}

		if (countJoinUser) {
			throw new BadRequestException({ code: 'CL0002', message: 'You have joined!' });
		}
		console.log(classroom.course_id);
		let newCate = await this.userCoursesClassesRepo.create({
			created_at: new Date(),
			updated_at: new Date(),
			class_id: id,
			user_id: userId,
			course_id: classroom.course_id
		});
		await this.userCoursesClassesRepo.save(newCate);
	}

	async leaveDataById(id: any, userId: number) {
		await this.userCoursesClassesRepo.delete({
			class_id: id,
			user_id: userId
		});
	}

	async teacherJoin(userId: number, data: any) {
		if (!_.data) {
			// await this.UserHasClassRepository.delete({user_id: userId}) 
			// for(let item of data) {
			// 	await this.joinDataById(item, userId);
			// }
		}
	}

	async getById(id: number) {
		return await this.classRoomRepo.findOne({
			where: { id: id },
			relations: {
				course: true
			}
		});
	}

	async updateDataById(id: number, data: UpdateAccessoryDto) {

		let newDataUpdate = await this.classRoomRepo.create({ ...data, updated_at: new Date() });
		newDataUpdate.slot_date = data.slot_dates.join(',')
		await this.classRoomRepo.update(id, newDataUpdate);
		return await this.getById(id);
	}

	async deleteDataById(id: number) {
		await this.userCoursesClassesRepo.delete({
			class_id: id
		});
		await this.classRoomRepo.delete(id);

	}


}
