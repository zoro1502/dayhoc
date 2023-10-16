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

export const UserForm = ( props ) =>
{



	const [ form ] = useForm();


	const dispatch = useDispatch();

	const [ files, setFiles ] = useState( [] );
	const [ isTeacher, setIsTeacher ] = useState( false );
	const [ coursesConfig, setCoursesConfig ] = useState( [] );
	const [ mes, setMes ] = useState('');

	useEffect( () =>
	{
		getCourses()
	}, [] );


	useEffect( () =>
	{
		if(props.id) {
			getDetail(props.id)
		}
	}, [props.id] );

	const getDetail = async ( id ) =>
	{
		dispatch(toggleShowLoading(true))
		const rs = await userApi.getUserById( id );
		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{
				let file = [];
				file.push( {
					uid: file.length,
					name: data.avatar,
					status: 'done',
					url: data.avatar || DEFAULT_IMG,
					default: true
				} );
				let formValue = {
					full_name: data.full_name,
					email: data.email,
					address: data.address,
					gender: data.gender,
					status: data.status,
					phone: data.phone,
					birth_day: data.birth_day ? moment(data.birth_day).format('yyyy-MM-DD') : null,
					role: data.role,
					image: file
				}
				setFiles( file )
				form.setFieldsValue( formValue )
			}
		}
		dispatch(toggleShowLoading(false))
	}

	const getCourses = async () =>
	{
		const response = await CourseService.getCourses(
			{ page: 1, page_size: 1000, status: 1 } );
		if ( response.status === 'success' && response.data.result.length > 0 )
		{
			let course = response.data.result.reduce( ( arr, e ) =>
			{
				arr.push( {
					value: e.id,
					label: e.name
				} )
				return arr;
			}, [] );
			setCoursesConfig( course );
		}
	}

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) )
		let avatar = await uploadApi.uploadFile( files );

		let formData = { ...e };
		let res;
		 
		delete formData.image;
		formData.avatar = avatar;
		if(props.id) {
			delete formData.email;
			res = await userApi.updateUser(props.id, formData );
		} else {
			res = await userApi.createUser( formData );
		}
		if ( res.status === 'success' )
		{
			props.setShowModal( false );
			setMes('')
			setFiles( [] )
			resetForm(form)
			message.success( 'Successfully' )
			props.getUserList( { ...props.paging, role: props.role, page: 1 } );
		} else
		{
			setMes( res.message );
			message.error( res.message )
		}
		dispatch( toggleShowLoading( false ) )
	}

	const roleConfig = [
		{ value: 1, label: 'Admin' },
		{ value: 2, label: 'Teacher' },
		{ value: 3, label: 'Student' }
	];

	const statusConfig = [
		{ value: 0, label: 'Inactive' },
		{ value: 1, label: 'Active' }
	];

	const gender = [
		{
			value: 'MALE',
			label: 'Male'
		},
		{
			value: 'FEMALE',
			label: 'Female'
		},
		{
			value: 'OTHER',
			label: 'Other'
		},
	]

	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div style={ { fontSize: 21 } }>{ props.id ? 'Update User' : 'Create User' }</div>
			</Modal.Header>
			<Modal.Body>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form, setIsTeacher ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					<div className='row'>
						<div className="col-md-6">
							<Form.Item name="full_name" label="Full name"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter full name' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="email" label="Email"
								rules={ [ { required: true } ] }
								
								className=' d-block'>
								<Input readOnly={props.id ? true : false} placeholder='Enter email' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="phone" label="Phone number"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter phone number' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="password" label="Password"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.Password placeholder='Enter password' />
							</Form.Item>
						</div>

						<div className="col-md-3">
							<Form.Item
								label="Images"
								name="image"
								accept="images/**"
								className='d-block'
								valuePropName="fileList"
								fileList={ files }
								getValueFromEvent={ ( e ) => normFile( e, setFiles ) }
							>
								<Upload action="/upload" listType="picture-card">
									{ files.length <= 0 && <div>
										<div style={ { marginTop: 8 } }>Upload</div>
									</div> }
								</Upload>
							</Form.Item>
						</div>

						<div className="col-md-9">
							<Form.Item name="address" label="Address"
								className=' d-block'>
								<Input placeholder='Enter address' />
							</Form.Item>
						</div>

						<div className="col-md-3">
							<Form.Item name="gender" label="Gender"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select gender"
									style={ { width: '100%' } }
									options={ gender }
								/>
							</Form.Item>
						</div>
						<div className="col-md-3">
							<Form.Item name="role" label="Role"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select role"
									style={ { width: '100%' } }
									options={ roleConfig }
								/>
							</Form.Item>
						</div>
						<div className="col-md-3">
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
						<div className="col-md-3">
							<Form.Item name="birth_day" label="Birthday"
								className=' d-block'>
								<Input type="date" placeholder='Enter birthday' />
							</Form.Item>
						</div>

						{ isTeacher &&
							<div className="col-md-12">
								<Form.Item name="courses" label="Courses"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Select
										placeholder="Select courses"
										showSearch
										mode="multiple"
										style={ { width: '100%' } }
										options={ coursesConfig }
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
								setFiles( [] )
								setMes('')
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
