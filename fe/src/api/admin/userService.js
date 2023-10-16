import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";
import { timeDelay } from "api/common";

const userApi = {

	async getUsers(params) {
		let filters = buildFilter(params);
		return await axiosClient.get(`user`, {params: filters});
	},

	async getUserById(id) {
		return await axiosClient.get(`user/${id}`);
	},

	async createUser(data) {
		return await axiosClient.post(`user`, data);
	},

	async updateUser(id, data) {
		return await axiosClient.put(`user/${id}`, data);
	},

	async deleteUser(id) {
		return await axiosClient.delete(`user/${id}`);
	}


}

export default userApi;