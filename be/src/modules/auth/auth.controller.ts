import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { BaseResponse, HTTP_STATUS } from 'src/helpers/helper';
import * as _ from 'lodash';
import { RefreshTokenDto } from './dtos/refresh.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtGuard } from './guards/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('login')
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: LoginDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.login(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@LoginDto----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Put('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async updateProfile(
		@Request() req: any,
		@Body() formDto: UpdateProfileDto
	) {
		try {
			const user_id = req.user.id || null;
			console.log(req.user);
			if(!user_id) {
				throw new BadRequestException({ code: 'LG0001', message:'test' });
			}
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.updateProfile(user_id, formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async profile(
		@Request() req: any,
	) {
		try {
			const user_id = req.user.id || null;
			console.log(req.user);
			if(!user_id) {
				throw new BadRequestException({ code: 'LG0001' });
			}
			const result = await this.authService.findById(user_id);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('register/admin')
	@ApiResponse({ status: 200, description: 'success' })
	async registerAdmin(
		@Body() formDto: any
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.registerAdmin(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@LoginDto----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}
}
