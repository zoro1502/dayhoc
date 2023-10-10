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
		getCourses()
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
		const rs = await departmentApi.getClassById( id );
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
					course_id: data.course_id,
					slot: data.slot,
					student_max_number: data.student_max_number,
					slot_date: data.slot_date ? data.slot_date.split(',').map(item => Number(item)) : null
				}
				form.setFieldsValue( formValue )
			}
		}
		dispatch( toggleShowLoading( false ) )
	}

	const getCourses = async () =>
	{
		const response = await departmentApi.getDepartments(
			{ page: 1, page_size: 1000, status: 1 } );
		if ( response.status === 'success' && response.data.result.length > 0 )
		{
			let user = response.data.result.reduce( ( arr, e ) =>
			{
				arr.push( {
					value: e.id,
					label: e.name
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
		formData.student_max_number = Number(formData.student_max_number);
		formData.slot_dates = e.slot_date;

		if ( props.id )
		{
			res = await departmentApi.updateClass( props.id, formData );
		} else
		{
			res = await departmentApi.createClass( formData );
		}
		if ( res.status === 'success' )
		{
			props.setShowModal( false );
			setMes( '' )
			resetForm( form )
			message.success( 'Successfully' )
			props.getClassList( { ...props.paging, page: 1 } );
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

	const slotConfig = [
		{ value: 'MORNING', label: 'Morning' },
		{ value: 'AFTERNOON', label: 'Afternoon' }
	]

	const slotDates = [
		{ value: 2, label: 'Monday' },
		{ value: 3, label: 'Tuesday' },
		{ value: 4, label: 'Wednesday' },
		{ value: 5, label: 'Thursday' },
		{ value: 6, label: 'Friday' },
		{ value: 7, label: 'Saturday' },
		{ value: 8, label: 'Sunday' },
	]


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div style={ { fontSize: 21 } }>{ props.id ? 'Update Classroom' : 'Create Classroom' }</div>
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
							<Form.Item name="name" label="Class name"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter class name' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="code" label="Class code"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input readOnly={ true } placeholder='Enter class code' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="student_max_number" label="Max student number"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input type="number" placeholder='Enter ' />
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
						<div className="col-md-6">
							<Form.Item name="course_id" label="Course"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select course"
									style={ { width: '100%' } }
									options={ users }
								/>
							</Form.Item>
						</div>
						<div className="col-md-6">
							<Form.Item name="slot" label="Slot"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select slot"
									style={ { width: '100%' } }
									options={ slotConfig }
								/>
							</Form.Item>
						</div>
						<div className="col-md-12">
							<Form.Item name="slot_date" label="Days to learn"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
								mode="multiple"
									placeholder="Select day"
									style={ { width: '100%' } }
									options={ slotDates }
								/>
							</Form.Item>
						</div>
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
								props.setId( null )
							} }>
							Cancel
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
