import axiosClient from "../axiosClient";

const profileApi = {

	async getProfile() {
		let id = localStorage.getItem("user_id");
		if(id) {
			return await axiosClient.get(`auth/profile/` + id);
		}
	},

	async updateProfile(data) {
		let id = localStorage.getItem("user_id");
		return await axiosClient.put(`auth/profile/` + id, data);
	},
}

export default profileApi;