import { Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('user')
@UseGuards(JwtGuard)
@ApiTags('Admin User')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('')
	@UseGuards(new RoleGuard([1,2,3]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateUserDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.userService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}



	@Put(':id')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateById(@Param('id') id: number, @Body() updateData: UpdateUserDto) {
		try {
			const check = await this.userService.getById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'User does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			else {
				return BaseResponse(HTTP_STATUS.success, await this.userService.updateById(id, updateData), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteById(@Param('id') id: number) {
		try {
			const check = await this.userService.getById(id);
			if (!check) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'user does not exist');
			}

			return BaseResponse(HTTP_STATUS.success, await this.userService.deleteById(id), '', 'Delete successfully!');

		} catch (e) {
			console.log('Delete user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			email: req.query.email || null,
			status: req.query.status || null,
			role: req.query.role || null,
			class_id: req.query.class_id || null,
			class_name: req.query.class_name || null,
			phone: req.query.phone || null,
		};
		return filters;
	}

	@Get('')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getLists(@Request() req: any) {
		try {
			const user = req.user;
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.userService.getLists(paging, filters, user);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('UserController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('/teacher')
	@UseGuards(new RoleGuard([2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getStudentByTeacherId(@Request() req: any) {
		try {
			const user = req.user;
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.userService.getLists(paging, filters, user);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('UserController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get(':id')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.userService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
