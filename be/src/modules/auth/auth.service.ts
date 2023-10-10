import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.dto';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as md5 from 'md5';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { USER_STATUS_ACTIVE, getSecond } from 'src/helpers/helper';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserService } from '../admin/user/user.service';
import { RegisterAdminDto } from './dtos/register-admin.dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {

	}

	async login(loginDto: LoginDto) {
		let user = await this.userRepo.findOne({
			where: {
				email: loginDto.email
			}
		});
		if (!_.isEmpty(user)) {
			const isPasswordMatching = await bcrypt.compare(
				loginDto.password.trim(),
				user.password
			);
			if (!isPasswordMatching) {
				throw new BadRequestException({ code: 'LG0003', message: 'Mật khẩu không đúng' });
			}
			if (user.status !== USER_STATUS_ACTIVE) {
				throw new BadRequestException({ code: 'LG0004', message: 'Tài khoản chưa được kích hoạt' });
			}
			const token = await this.genTokenByUser(user);
			delete user.password;
			return {
				token_info: token, user
			}
		}
		throw new BadRequestException({ code: 'LG0002' });
	}

	async refreshToken(refreshDto: RefreshTokenDto) {

	}

	async genTokenByUser(user: any) {
		const payload: any = {
			email: user.email,
			id: user.id,
			role: user.role
		};
		console.log(user);
		console.log(payload);
		const expIn = Number(process.env.JWT_EXPIRATION_TIME) || 86000;
		payload.expires_at = getSecond() + expIn;
		const accessToken = await this.jwtService.signAsync(payload, { expiresIn: expIn });
		const expires_time = new Date().setSeconds(new Date().getSeconds() + expIn);
		return {
			access_token: accessToken,
			expires_in: expIn,
			expires_time: new Date(expires_time),
		};
	}

	async updateProfile(userId: number, data: UpdateProfileDto) {
		let user = await this.userRepo.findOneBy({id: userId});
		if(_.isEmpty(user)) {
			throw new BadRequestException({code: 'U0002'});
		}
		return await this.userService.updateById(userId, data);

	}

	async findById(userId: number) {
		return await this.userService.getById(userId);
	}

	async registerAdmin(data: RegisterAdminDto) {
		let newData = {...data};
		newData.role = 1;
		newData.status = 1;
		return await this.userService.createData(newData);

	}
}
