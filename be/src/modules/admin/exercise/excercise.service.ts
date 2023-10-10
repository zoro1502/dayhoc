import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercises.entity';
import { IPaging, Paging } from 'src/helpers/helper';
import { Equal, In, IsNull, Like, Not, Raw, Repository } from 'typeorm';
import { UserHasExDto } from './dtos/user-has-ex.dto';
import { StudentHasExercise } from 'src/entities/student-has-exercises.entity';
import { CreateExerciseDto } from './dtos/create-accessory.dto';
import { Classroom } from 'src/entities/classes.entity';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { UserCoursesClasses } from 'src/entities/user-courses-classes.entity';
import { UpdateExDto } from './dtos/update-accessory.dto';
import * as moment from 'moment';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ExerciseService {
	constructor(
		@InjectRepository(Exercise)
		private exerciseRepo: Repository<Exercise>,

		@InjectRepository(StudentHasExercise)
		private studentHasExRepo: Repository<StudentHasExercise>,

		@InjectRepository(Classroom)
		private classRepo: Repository<Classroom>,

		@InjectRepository(UserCoursesClasses)
		private userClassRepo: Repository<UserCoursesClasses>,

		@InjectRepository(User)
		private userRepo: Repository<User>,
	) { }

	async getDataList(paging: IPaging, filters: any, req?: any) {

		let conditions = await this.buildConditions(filters);
		if (req?.user.role == 2) conditions.user_id = req.user.id;
		const [departments, total] = await this.exerciseRepo.findAndCount({
			where: conditions,
			order: { id: 'ASC' },
			relations: {
				classrooms: true,
				user: true
			},
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { result: departments, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async getListExOfStudent(paging: IPaging, req: any) {
		let condition: any = {};
		let filters = req.query;
		if (filters) {
			if (filters.class_id) condition.class_id = filters.class_id;
			if (filters.course_id) condition.course_id = filters.course_id;
			if (filters.title) condition.title = filters.title;
			if (filters.status) condition.status = filters.status;
		}
		if (req.user?.role === 2) {
			condition.exercise = {
				user_id: req.user.id
			}
			if (filters?.email) condition.users = {
				email: Like(`%${filters.email.trim()}%`)
			};
		}
		if (req.user?.role === 3) condition.student_id = req.user.id;

		const [ex, total] = await this.studentHasExRepo.findAndCount({
			where: condition,
			relations: {
				exercise: true,
				classroom: true,
				student: true
			},
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		let rs: any = ex;
		if (!_.isEmpty(rs)) {
			for (let item of rs) {
				item.exercise = await this.exerciseRepo.findOne({
					where: {
						id: item.exercise_id
					}, relations: {
						user: true
					}
				});
			}
		}

		return { result: rs, meta: new Paging(paging.page, paging.page_size, total) };

	}

	async getDepartmentById(id: number): Promise<Exercise> {
		
		return await this.exerciseRepo.findOne({
			relations: {
				classrooms: true
			},
			where: {
				id: id
			}
		});
	}

	async createDepartment(data: CreateExerciseDto, userId: number) {

		await this.validateExistClass(data);
		data.created_at = new Date();
		data.updated_at = new Date();
		data.user_id = userId;
		data.deadline = new Date(data.deadline)
		let newCate = await this.exerciseRepo.create({
			...data
		});
		await this.exerciseRepo.save(newCate);
		await this.createExercise(newCate, data);

		return newCate;
	}

	async updateEx(id: number, data: UpdateExDto, userId: any) {

		await this.validateExistClass(data, { id: id });
		delete data.class_id;
		data.deadline = new Date(data.deadline);
		await this.exerciseRepo.update(id, data);
		return this.getDepartmentById(id);
	}

	async submitEx(id: any, data: any, user: any) {
		const oldEx = await this.studentHasExRepo.findOne({
			where: {
				id: id
			}
		})
		const ex = await this.getDepartmentById(oldEx?.exercise_id);
		if (_.isEmpty(ex)) {
			throw new BadRequestException({ code: 'EX0001', message: 'not found exercise' })
		}
		if (moment().isBefore(moment(ex.deadline)) && user?.role === 3) {
			throw new BadRequestException({ code: 'EX0002', message: 'over deadline' });
		}
		let dataEx: any = {}
		if (user?.role === 2) {
			dataEx = {
				mark: parseFloat(data.mark) <= 100 && parseFloat(data.mark) || 100,
				updated_at: new Date()
			}

		}
		else if (user?.role === 3) {
			dataEx = {
				file: data.file,
				updated_at: new Date()
			}
		} else {
			return;
		}
		await this.studentHasExRepo.update(id, dataEx);
		return await this.studentHasExRepo.findOne({
			where: {
				id: id
			}
		})
	}

	async deleteDepartment(id: number): Promise<void> {
		let count = await this.studentHasExRepo.count({
			where: {
				exercise_id: id,
				file: Not(IsNull()) 
			}
		});
		if(count) {
			throw new BadRequestException({code: 'EX0004', message: 'Cannot delete exercise'});
		}
		await this.exerciseRepo.delete(id);
		await this.studentHasExRepo.delete({exercise_id: id});
	}

	async findStudentEx(id) {
		return await this.studentHasExRepo.findOne({
			where: {
				id: id
			}
		})
	}

	async buildConditions(filters: any) {
		const conditions: any = {};
		if (filters.title) conditions.title = Raw(alias => `${alias} LIKE '%${filters.title}%'`);
		if (filters.status) conditions.status = filters.status;
		if (filters.class_id) conditions.classrooms = {
			id: filters.class_id
		}
		if (filters.course_id) conditions.courses = {
			id: filters.course_id
		}
		return conditions;
	}

	async validateExistClass(data: any, exercise: any = null) {
		if (!_.isEmpty(data.class_id) && !exercise) {
			let count = await this.classRepo.count({
				relations: {
					course: true
				},
				where: {
					id: In(data.class_id),
					status: 1,
				}
			});
			if (count < data.class_id.length) {
				throw new BadRequestException({ code: 'EX0001', message: 'not found class' })
			}

		}
		if (exercise) {
			let changeClass = false;
			if (!_.isEmpty(data.class_id) && data.class_id.length > 0) {
				let ex: any = await this.getDepartmentById(exercise.id);
				if (!_.isEmpty(ex?.classrooms)) {
					for (let item of ex.classrooms) {
						if (item.id) {
							changeClass = data.class_id && data.class_id
								.some((item: any) => Number(item) === Number(item.id)) 
								|| false;
						}
					}
				}
			}
			let countExStudent = await this.studentHasExRepo.count({
				where: {
					exercise_id: exercise.id,
					file: Raw(alias => `${alias} is not null`)
				}
			});
			if (countExStudent && changeClass) {
				throw new BadRequestException({ code: 'EX0003', message: 'Cannot update class of exercise' })
			} else if(!_.isEmpty(data.class_id)) {
				await this.createExercise(exercise, data);
			}
		}

	}

	async createExercise(exercise: any, data: any) {
		await this.studentHasExRepo.delete({ exercise_id: exercise.id });
		let users = await this.userClassRepo.find({
			where: {
				class_id: In(data.class_id)
			}
		});
		if (!_.isEmpty(users)) {
			for (let item of users) {
				let obj: UserHasExDto = {
					exercise_id: exercise.id,
					class_id: item.class_id,
					student_id: item.id,
					mark: 0,
					file: null,
					created_at: new Date(),
					updated_at: new Date()
				}
				await this.studentHasExRepo.save(obj);
			}
		}
	}

	async updateExercise(id, data: any) {

	}
}
