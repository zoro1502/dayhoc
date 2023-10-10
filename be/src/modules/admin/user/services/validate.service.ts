import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { newArrayError } from 'src/helpers/helper';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Injectable()
export class ValidateService {

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

	async validateUser(userDto: any, isCreated = false, user_id = 0) {
		if (_.isEmpty(userDto)) {
			throw new BadRequestException({ code: 'F0001' });
		}
		let errorData: any = {};

		const regexGmail = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
		const regexEmail = /^[^\s@!#$%&'*+/=?^_`{|}~-]+@[^\s@!#$%&'*+/=?^_`{|}~-]+\.[^\s@!#$%&'*+/=?^_`{|}~-]+$/;
		const regexPass = /^[a-zA-Z0-9]{6,20}$/g;
		const regexUserName = /^[a-zA-Z0-9]{6,20}$/g;
		const regexPhone = /((09|03|07|08|05|04|\+84|84)+([0-9]{8,9})\b)/g;

		if (userDto.password && !regexPass.test(userDto.password)) {
			errorData.password = newArrayError(errorData.password, 'Password is invalid!');
		}

		if (userDto.email) {
			if ((userDto.email.includes('@gma') && !regexGmail.test(userDto.email)) || !regexEmail.test(userDto.email)) {
				errorData.email = newArrayError(errorData.email, 'Email is invalid');
			} else {
				let userEmail: any = await this.userRepository.findOne({ where: { email: userDto.email } });

				if (!_.isEmpty(userEmail)) {
					if(isCreated) {
						errorData.email =  newArrayError(errorData.email, 'Email is existed');
					}
					else if(userEmail.id === user_id) {
						errorData.email =  newArrayError(errorData.email, 'Email is existed');
					}
				}
			}
		}

		if (userDto.phone) {

			if (!regexPhone.test(userDto.phone)) {
				errorData.phone = newArrayError(errorData.phone, 'Phone is invalid');
			} else if(isCreated || user_id){
				let user: any = this.userRepository.findOne({
					where: {
						phone: Like(`%${userDto.phone}%`),
					}
				});
				if (!_.isEmpty(user)) {
					if(isCreated) {
						errorData.phone =  newArrayError(errorData.phone, 'Phone is existed');
					}
					else if(user.id === user_id) {
						errorData.phone =  newArrayError(errorData.phone, 'Phone is existed');
					}
				}
			}
		}

		if (!_.isEmpty(errorData)) {
			throw new BadRequestException({ code: 'F0002', message: null, data: errorData });
		}
	}

}
