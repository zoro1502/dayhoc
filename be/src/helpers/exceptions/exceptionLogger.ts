import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost } from "@nestjs/common";
import * as _ from 'lodash';

export class ExceptionsLoggerFilter extends BaseExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
		let message = exception.response.message;
		if(Array.isArray(exception.response.message)) {
			message = exception.response.message[0];
		}
		let responseError = {
			status: exception.statusCode == 400 && 'fail' ||'error' ,
			message: exception.response == 404 && 'Not found api' || message,
			code: exception.response?.code || ''
		};
        exception.response = responseError;
        super.catch(exception, host);
    }
}
