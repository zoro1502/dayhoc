import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

const departmentApi = {

	async getDepartments ( params )
	{
		let filters = buildFilter( params );
		if(localStorage.getItem("role") === "2") {
			filters.user_id = localStorage.getItem("user_id");
		}
		return await axiosClient.get( `courses`, { params: filters } );
	},

	async getDepartmentById ( id )
	{
		return await axiosClient.get( `courses/${ id }` );
	},

	async createDepartment ( data )
	{
		return await axiosClient.post( `courses`, data );
	},

	async updateDepartment ( id, data )
	{
		return await axiosClient.put( `courses/${ id }`, data );
	},

	async deleteDepartment ( id )
	{
		return await axiosClient.delete( `courses/${ id }` );
	},

	async getClassList ( params )
	{
		let filters = buildFilter( params );
		if(localStorage.getItem("role") === "2") {
			filters.user_id = localStorage.getItem("user_id");
		}
		if(localStorage.getItem("role") === "3") {
			filters.student_id = localStorage.getItem("user_id");
		}
		return await axiosClient.get( `classrooms`, { params: filters } );
	},

	async getClassById ( id )
	{
		return await axiosClient.get( `classrooms/${ id }` );
	},

	async createClass ( data )
	{
		return await axiosClient.post( `classrooms`, data );
	},

	async updateClass ( id, data )
	{
		return await axiosClient.put( `classrooms/${ id }`, data );
	},

	async deleteClass ( id )
	{
		return await axiosClient.delete( `classrooms/${ id }` );
	},

	async joinClass ( id )
	{
		let data = {};
		console.log(localStorage.getItem("role") == "3");
		if(localStorage.getItem("role") === "3") {
			data.user_id = localStorage.getItem("user_id");
		} else {
			return {
				status: "error",
				message: "Permission denied!"
			}
		}
		return await axiosClient.post( `classrooms/join/${ id }`, data );
	},


	
	// Exercise
	async getExercises ( params )
	{
		let filters = buildFilter( params );
		if(localStorage.getItem("role") === "2") {
			filters.user_id = localStorage.getItem("user_id")
		}
		if(localStorage.getItem("role") === "3") {
			filters.student_id = localStorage.getItem("student_id")
		}
		return await axiosClient.get( `exercises`, { params: filters } );
	},

	async getExercisesStudent ( params )
	{
		let filters = buildFilter( params );
		if(localStorage.getItem("role") === "2") {
			filters.teacher_id = localStorage.getItem("user_id")
		}
		if(localStorage.getItem("role") === "3") {
			filters.user_id = localStorage.getItem("user_id")
		}
		return await axiosClient.get( `exercises/student`, { params: filters } );
	},

	async getExerciseById ( id )
	{
		return await axiosClient.get( `exercises/${ id }` );
	},

	async createExercise ( data )
	{
		return await axiosClient.post( `exercises`, data );
	},

	async updateExercise ( id, data )
	{
		return await axiosClient.put( `exercises/${ id }`, data );
	},

	async updateExerciseStudent ( id, data )
	{
		return await axiosClient.post( `exercises/submit/${ id }`, data );
	},

	async deleteExercise ( id, data )
	{
		return await axiosClient.delete( `exercises/${ id }`, data );
	},

}

export default departmentApi;