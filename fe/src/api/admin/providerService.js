import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

const providerApi = {

	async getProviders(params) {
		let filters = buildFilter(params);
		return await axiosClient.get(`providers`, {params: filters});
	},

	async getProviderById(id) {
		return await axiosClient.get(`providers/show/${id}`);
	},

	async createProvider(data) {
		return await axiosClient.post(`providers/create`, data);
	},

	async updateProvider(id, data) {
		return await axiosClient.put(`providers/update/${id}`, data);
	},

	async deleteProvider(id) {
		return await axiosClient.delete(`providers/${id}`);
	}


}

export default providerApi;