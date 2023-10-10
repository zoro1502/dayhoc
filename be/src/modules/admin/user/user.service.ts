import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { ValidateService } from './services/validate.service';
import { AccessoryService } from '../classroom/accessory.service';
import { DepartmentService } from '../course/department.service';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => AccessoryService)) private roomService: AccessoryService,
		@Inject(forwardRef(() => DepartmentService)) private courseService: DepartmentService,
		private readonly validateUserService: ValidateService
		) { }

	async createData(data: CreateUserDto) {
		await this.validateUserService.validateUser(data, true);
		data.created_at = new Date();
		data.updated_at = new Date();
		data.password = await bcrypt.hash(data.password.trim(), 10);
		let newData = await this.userRepository.create({
			...data
		});
		await this.userRepository.save(newData);
		if(data.role == 2 && !_.isEmpty(data.courseIds)) {
			for(let item of data.courseIds) {
				console.log(item);
				const a = await this.courseService.updateDepartment(Number(item), {user_id: newData.id, updated_at: new Date()});
				console.log(a);
			}
		}
		return newData;
	}

	async getById(id: number) {
		return await this.userRepository.findOne(
			{
				where: {id: id},
				relations: {
					courses: true
				}
			}
		);
		
	}

	async updateById(id: number, data: UpdateUserDto) {
		await this.validateUserService.validateUser(data);
		const newData: any = {...data};
		newData.updated_at = new Date();
		if(newData.password) {
			newData.password = await bcrypt.hash(newData.password.trim(), 10);
		}
		delete newData.courseIds;
		if(data.role == 1 && !_.isEmpty(data.courseIds)) {
			for(let item of data.courseIds) {
				await this.courseService.updateDepartment(Number(item), {user_id: id, updated_at: new Date()});
			}
		}
		await this.userRepository.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		const userId  = user?.id || 0;
		let conditions: any = await this.buildConditions(filters, userId);
		let relations: any = {
			classrooms: true,
			courses: true
		};
		const [users, total] = await this.userRepository.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});


		return { result: users, meta: new Paging(paging.page, paging.page_size, total) };
	}


	async getListStudentByTeacherId(paging: IPaging, filters: any) {
		let conditions: any = await this.buildConditions(filters);
		let relations: any = {
			classrooms: true,
			courses: true
		};
		const [users, total] = await this.userRepository.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});


		return { result: users, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any, user_id: number = 0) {
		const conditions: any = {};
		conditions.id = Not(user_id);
		if (filters?.email && filters?.email.trim() != '') conditions.email =  Like(`%${filters?.email.trim()}%`);
		if (filters?.phone && filters?.phone.trim() != '') conditions.phone =  Like(`%${filters?.phone.trim()}%`);
		if (filters?.status && filters?.status != '') conditions.status =  filters?.status;
		if (filters?.role) conditions.role = Number(filters.role);
		console.log(conditions);
		return conditions;
	}

	async findByUsername(username: string) {
		return await this.userRepository.findOne({
			where: {
				email: username
			}
		});
	}

	async deleteById(id: number) {
		return await this.userRepository.delete(id);
	}

	async buildConditionByOther(filters: any, role: number, user_id: number = 0) {
		let where = `WHERE TRUE `;
		if (filters?.email && filters?.email.trim() != '') {
			where += ` AND u.email LIKE '%${filters?.email.trim()}%'`;
		}
		if (filters?.phone && filters?.phone.trim() != '') {
			where += ` AND u.phone LIKE '%${filters?.phone.trim()}%'`;
		}
		if(role === 2 && user_id) {
			where += ` AND c.user_id = ${user_id}`;
		}

		let query = `
		SELECT c.id as course_id, cl.id as class_id, u.id, 
		u.full_name, u.email, u.gender, u.status, 
		u.birth_day,
		cl.name as class_name, c.name as course_name FROM user_courses_classes ucc 
		LEFT JOIN users u on ucc.user_id = u.id
		LEFT JOIN classes cl ON ucc.class_id = ucc.class_id
		LEFT JOIN courses c ON u.id = c.user_id ${where} GROUP BY ucc.class_id`;

	}
}
