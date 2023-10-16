import userApi from "api/admin/userService";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Pagination, Typography, message, Form, Input, Select, Upload } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { onFieldsChange } from "api/common";
import { validateMessages } from "api/common";
import { useForm } from "antd/lib/form/Form";
import { normFile } from "api/common";
import { resetForm } from "api/common";
import { CourseService } from "api/admin/courseService";
import uploadApi from "api/upload/uploadService";
import { DEFAULT_IMG } from "api/common";
import moment from "moment";
import departmentApi from "api/admin/departmentService";

export const CourseForm = ( props ) =>
{



	const [ form ] = useForm();


	const dispatch = useDispatch();

	const [ users, setUsers ] = useState( [] );
	const [ mes, setMes ] = useState( '' );

	useEffect( () =>
	{
		getUsers()
	}, [] );


	useEffect( () =>
	{
		if ( props.id )
		{
			getDetail( props.id )
		}
	}, [ props.id ] );

	const getDetail = async ( id ) =>
	{
		dispatch( toggleShowLoading( true ) )
		const rs = await departmentApi.getDepartmentById( id );
		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{

				let formValue = {
					name: data.name,
					content: data.content,
					code: data.code,
					status: data.status,
					user_id: data.user_id,
				}
				form.setFieldsValue( formValue )
			}
		}
		dispatch( toggleShowLoading( false ) )
	}

	const getUsers = async () =>
	{
		const response = await userApi.getUsers(
			{ page: 1, page_size: 1000, status: 1, role: 1 } );
		if ( response.status === 'success' && response.data.length > 0 )
		{
			let user = response.data.reduce( ( arr, e ) =>
			{
				arr.push( {
					value: e.id,
					label: e.full_name
				} )
				return arr;
			}, [] );
			setUsers( user );
		}
	}

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) )

		let formData = { ...e };
		let res;

		if ( props.id )
		{
			res = await departmentApi.updateDepartment( props.id, formData );
		} else
		{
			res = await departmentApi.createDepartment( formData );
		}
		if ( res.status === 'success' )
		{
			props.setShowModal( false );
			setMes( '' )
			resetForm( form )
			message.success( 'Successfully' )
			props.getCourseList( { ...props.paging, page: 1 } );
		} else
		{
			setMes( res.message );
			message.error( res.message )
			dispatch( toggleShowLoading( false ) )

		}
	}


	const statusConfig = [
		{ value: 0, label: 'Inactive' },
		{ value: 1, label: 'Active' }
	];


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div style={ { fontSize: 21 } }>{ props.id ? 'Update Course' : 'Create Course' }</div>
			</Modal.Header>
			<Modal.Body>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					<div className='row'>
						<div className="col-md-6">
							<Form.Item name="name" label="Course name"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter course name' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="code" label="Course code"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input readOnly={ true } placeholder='Enter course code' />
							</Form.Item>
						</div>

						<div className="col-md-12">
							<Form.Item name="content" label="Description"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.TextArea rows={ 5 } placeholder='Enter description' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="status" label="Status"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select status"
									style={ { width: '100%' } }
									options={ statusConfig }
								/>
							</Form.Item>
						</div>
						{ localStorage.getItem( 'role' ) === '1' &&
							<div className="col-md-6">
								<Form.Item name="user_id" label="Teacher"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Select
										placeholder="Select teacher"
										style={ { width: '100%' } }
										options={ users }
									/>
								</Form.Item>
							</div>
						}
					</div>
					<span className="text-danger">{ mes }</span>
					<div className='d-flex justify-content-center'>
						<button type="submit"
							className="btn btn-primary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-secondary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }
							onClick={ () =>
							{
								resetForm( form )
								props.setShowModal( false );
								setMes( '' );
								props.setId(null)
							} }>
							Cancel
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
