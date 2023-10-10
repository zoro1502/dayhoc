import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AccessoryService } from "./accessory.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IPaging } from "../../../helpers/interface/paging.interface";
import { BaseResponse } from "../../../helpers/response/response";
import { HTTP_STATUS } from "../../../helpers/constants/constants";
import { BadRequestException } from "../../../helpers/response/badRequest";
import * as _ from 'lodash';
import { CreateAccessoryDto } from "./dtos/create-accessory.dto";
import { UpdateAccessoryDto } from './dtos/update-accessory.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('classrooms')
@UseGuards(JwtGuard)
@ApiTags('Admin Accessory')
export class AccessoryController {
	constructor(private readonly accessoryService: AccessoryService) { }

	@Post('join/:id')
	@UseGuards(new RoleGuard([1,2,3]))
	@ApiResponse({ status: 200, description: 'success' })
	async joinDataById(
		@Request() req: any,
		@Param('id') id: number,
	) {
		try {
			if(_.isEmpty(await this.accessoryService.getById(id))) {
				throw new BadRequestException({ code: 'F0003' });
			}
			let user = req.user;
			// if(user?.role != 3) {
			// 	throw new BadRequestException({ code: 'F0002', message: 'User with role invalid!' });
			// }
			const result = await this.accessoryService.joinDataById(id, user?.id);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Delete('leave/:id')
	@UseGuards(new RoleGuard([3]))
	@ApiResponse({ status: 200, description: 'success' })
	async leaveDataById(
		@Request() req: any,
		@Param('id') id: number,
	) {
		try {
			if(_.isEmpty(await this.accessoryService.getById(id))) {
				throw new BadRequestException({ code: 'F0003' });
			}
			let user_id = req.query.user_id;
			const result = await this.accessoryService.leaveDataById(id, user_id);
			return BaseResponse(HTTP_STATUS.success, {}, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getLists(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let responseData: any = await this.accessoryService.getLists(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('AccessoryController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}


	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			name: req.query.name || null,
			course_name: req.query.course_name || null,
			status: req.query.status || null,
			code: req.query.code || null,
			user_id: req.user?.role == 2 && req.user.id || null 
		};
		return filters;
	}

	@Put('/:id')
	@UseGuards(new RoleGuard([1, 2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateDataById(@Param('id') id: number, @Body() data: UpdateAccessoryDto) {
		try {
			const oldAccess = await this.accessoryService.getById(id);
			const result = await this.accessoryService.updateDataById(id, data);
			if (!oldAccess)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', ' Accessory does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, result, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(new RoleGuard([1, 2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteDataById(@Param('id') id: number) {
		try {
			await this.accessoryService.deleteDataById(id);
			return BaseResponse(HTTP_STATUS.success, {}, '', 'Successful!');
				
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get(':id')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.accessoryService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'user does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('')
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateAccessoryDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.accessoryService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	
}
