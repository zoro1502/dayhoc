import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

export const CourseService = {

	async getCourses(params) {
		let filters = buildFilter(params);
		return await axiosClient.get(`courses`, {params: filters});
	},

	async getCoursesById(id) {
		return await axiosClient.get(`courses/${id}`);
	},

	async createCourses(data) {
		return await axiosClient.post(`courses`, data);
	},

	async updateCourses(id, data) {
		return await axiosClient.put(`courses/${id}`, data);
	},

	async deleteCourses(id) {
		return await axiosClient.delete(`courses/${id}`);
	}
}
