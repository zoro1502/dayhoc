import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from './excercise.service';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';
import { CreateExerciseDto } from './dtos/create-accessory.dto';
import { UpdateExDto } from './dtos/update-accessory.dto';
import { UserHasExDto } from './dtos/user-has-ex.dto';

@Controller('exercise')
@UseGuards(JwtGuard)
@ApiTags('exercises')
export class ExerciseController {
	constructor(
		private exerciseService: ExerciseService
	) { }

	@Get('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDataList(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let departments: any = await this.exerciseService.getDataList(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, departments, '', 'Successful');

		} catch (e) {
			console.log('get department list ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}


	@Get('/student')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getExOfStudent(@Request() req: any) {
		try {
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let departments: any = await this.exerciseService.getListExOfStudent(paging, req);

			return BaseResponse(HTTP_STATUS.success, departments, '', 'Successful');

		} catch (e) {
			console.log('get department list ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}



	@Post('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async createDepartment(@Request() req: any, @Body() createData: CreateExerciseDto) {
		try {
			if (_.isEmpty(createData)) throw new BadRequestException({ code: 'F0001' });
			return BaseResponse(
				HTTP_STATUS.success,
				await this.exerciseService.createDepartment(createData, req.user.id),
				'',
				'Created successfully!'
			);
		} catch (e) {
			console.log('create department -------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('/submit/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1, 2, 3]))
	@ApiResponse({ status: 200, description: 'success' })
	async submitEx(@Param('id') id: number, @Request() req: any, @Body() updateData: UserHasExDto) {
		try {
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			return BaseResponse(HTTP_STATUS.success, await this.exerciseService
				.submitEx(id, updateData, req.user), '', 'Updated successfully!');
		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1, 2, 3]))
	@ApiResponse({ status: 200, description: 'success' })
	async updateEx(@Param('id') id: number, @Request() req: any, @Body() updateData: UpdateExDto) {
		try {
			const check = await this.exerciseService.getDepartmentById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'exercise does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			return BaseResponse(HTTP_STATUS.success, await this.exerciseService.updateEx(id, updateData, req.user.id), '', 'Updated successfully!');
		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}



	@Delete(':id')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteDepartment(@Param('id') id: number) {
		try {
			let department = await this.exerciseService.getDepartmentById(id);

			if (!department) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'exercise does not exist!');
			} else {
				await this.exerciseService.deleteDepartment(id);
				return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
			}
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			class_id: req.query.class_id || null,
			title: req.query.title || null,
			status: req.query.status || null
		};
		return filters;
	}

	@Get('/:id')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDepartmentById(@Param('id') id: number) {
		try {
			const res = await this.exerciseService.getDepartmentById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'exercise does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
