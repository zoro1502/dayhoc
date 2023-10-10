import { IHttpStatus } from "../interface/httpStatus.interface";
import { IUser } from "../interface/user.interface";

export const HTTP_STATUS: IHttpStatus = {
	error: 'error',
	success: 'success',
	fail: 'fail',
}

export const USER_CONST: any = {
	USER_STATUS_ACTIVE : 1,
	USER_STATUS_LOCK: -1,
	USER_ADM: 1,
	USER_PUB: 2
}

export const USER_STATUS_ACTIVE: number = 1;

export const ROLES = {
	admin: 1,
	supplier: 2,
	department: 3
}