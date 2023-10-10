import * as _ from 'lodash'
export const newArrayError = (arr: any, message: string) => {
	if (!_.isEmpty(arr)) {
		return arr.push(message);
	}
	return [message];
}

export function getSecond() {
	let currentTime = new Date();
	return Math.floor(currentTime.getTime() / 1000);
}