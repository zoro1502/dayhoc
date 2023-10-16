import axiosClient from "../axiosClient";

const profileApi = {

	async getProfile() {
		return await axiosClient.get(`auth/profile`);
	},

	async updateProfile(data) {
		return await axiosClient.put(`auth/profile`, data);
	},
}

export default profileApi;