import { Injectable, NestMiddleware } from '@nestjs/common';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getSecond } from 'src/helpers/helper';
@Injectable()
export class AccountMiddleware implements NestMiddleware {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) { }
	async use(req: any, res: any, next: () => void) {
		// try {
		// 	let accessToken = req.headers.authorization && req.headers.authorization.replace(/bearer\s+/i, '') || null;
		// 	console.log('access-------> ', accessToken);
		// 	if (_.isEmpty(accessToken)) {
		// 		throw new BadRequestException({ code: 'LG0001' });
		// 	}
		// 	const payload: any = await this.jwtService.decode(accessToken);
		// 	if (_.isEmpty(payload)) {
		// 		throw new BadRequestException({ code: 'LG0401' });
		// 	}
		// 	let now = getSecond();
		// 	if (payload.expires_at - now <= 0) {
		// 		throw new BadRequestException({ code: 'LG0401' });
		// 	}

		// 	const user = await this.userService.findByUsername(payload.username);
		// 	if (_.isEmpty(user)) {
		// 		throw new BadRequestException({ code: 'U0002' });
		// 	}
		// 	req.headers['user_data'] = user;
		// 	next();


		// } catch (error) {
		// 	console.log('errror mid---------> ', error);
		// }
		next();
	}
}
