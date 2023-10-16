import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";
import { timeDelay } from "api/common";

const userApi = {

	async getUsers(params) {
		let filters = buildFilter(params);
		return await axiosClient.get(`users`, {params: filters});
	},

	async getUserById(id) {
		return await axiosClient.get(`users/${id}`);
	},

	async createUser(data) {
		return await axiosClient.post(`users`, data);
	},

	async updateUser(id, data) {
		return await axiosClient.put(`users/${id}`, data);
	},

	async deleteUser(id) {
		return await axiosClient.delete(`users/${id}`);
	}


}

export default userApi;