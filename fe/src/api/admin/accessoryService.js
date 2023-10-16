import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

const accessoryApi = {

	async getAccessories(params) {
		let filters = buildFilter(params);
		return await axiosClient.get(`accessory`, {params: filters});
	},

	async getAccessoryById(id) {
		return await axiosClient.get(`accessory/show/${id}`);
	},

	async createAccessory(data) {
		return await axiosClient.post(`accessory/create`, data);
	},

	async updateAccessory(id, data) {
		return await axiosClient.put(`accessory/update/${id}`, data);
	},

	async deleteAccessory(id) {
		return await axiosClient.delete(`accessory/${id}`);
	}
}

export default accessoryApi;