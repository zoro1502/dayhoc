import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';

@Injectable()
export class RoleGuard implements CanActivate {
	public role = [];
	constructor(role?: any) {
		this.role = role;
	}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {

		const request = context.switchToHttp().getRequest();
		const user = request.user;
		
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'LG0401' });
		}
		if (this.role && !this.role.includes(user.role)) {
			throw new BadRequestException({ code: 'LG0403' });
		}
		return true;
	}
}
