import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';
import { CreateCoursesDto } from './dtos/create-accessory.dto';
import { UpdateCoursesDto } from './dtos/update-accessory.dto';

@UseGuards(JwtGuard)
@Controller('courses')
@ApiTags('courses')
export class CoursesController {
	constructor(
		private departmentService: DepartmentService
	) { }

	@Get('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDepartments(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let departments: any = await this.departmentService.getDepartments(paging, filters);

			return BaseResponse(HTTP_STATUS.success, departments, '', 'Successful');

		} catch (e) {
			console.log('get department list ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async createDepartment(@Request() req: any, @Body() createData: CreateCoursesDto) {
		try {
			let user = req.user;
			if(user.role == 2) {
				createData.user_id = user.id;
			}

			if (_.isEmpty(createData)) throw new BadRequestException({ code: 'F0001' });
			
			return BaseResponse(
				HTTP_STATUS.success,
				await this.departmentService.createDepartment(createData),
				'',
				'Created successfully!'
			);
		} catch (e) {
			console.log('create department -------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1,2,3]))
	@ApiResponse({ status: 200, description: 'success' })
	async updateDepartment(@Param('id') id: number, @Request() req: any,  @Body() updateData: UpdateCoursesDto) {
		try {
			let user = req.user;
			updateData.user_id = user.id;
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			return BaseResponse(HTTP_STATUS.success, await this.departmentService.updateDepartment(id, updateData), '', 'Updated successfully!');
		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteDepartment(@Param('id') id: number) {
		try {
			await this.departmentService.deleteDepartment(id);
			return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			name: req.query.name || null,
			status: req.query.status || null,
			code: req.query.code || null,
			user_name: req.query.user_name || null,
			user_id: req.user?.role == 2 && req.user.id || null
		};
		return filters;
	}

	@Get('/:id')
	@UseGuards(new RoleGuard([1,2,3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDepartmentById(@Param('id') id: number) {
		try {
			return BaseResponse(HTTP_STATUS.success, await this.departmentService.getOneById(id), '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
