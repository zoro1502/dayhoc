import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

const departmentApi = {

	async getDepartments ( params )
	{
		let filters = buildFilter( params );
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
		return await axiosClient.post( `classrooms/join/${ id }`, {} );
	},


	
	// Exercise
	async getExercises ( params )
	{
		let filters = buildFilter( params );
		return await axiosClient.get( `exercise`, { params: filters } );
	},

	async getExercisesStudent ( params )
	{
		let filters = buildFilter( params );
		return await axiosClient.get( `exercise/student`, { params: filters } );
	},

	async getExerciseById ( id )
	{
		return await axiosClient.get( `exercise/${ id }` );
	},

	async createExercise ( data )
	{
		return await axiosClient.post( `exercise`, data );
	},

	async updateExercise ( id, data )
	{
		return await axiosClient.put( `exercise/${ id }`, data );
	},

	async updateExerciseStudent ( id, data )
	{
		return await axiosClient.put( `exercise/submit/${ id }`, data );
	},

	async deleteExercise ( id, data )
	{
		return await axiosClient.delete( `exercise/${ id }`, data );
	},

}

export default departmentApi;