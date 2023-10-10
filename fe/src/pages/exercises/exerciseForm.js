import userApi from "api/admin/userService";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Pagination, Typography, message, Form, Input, Select, Upload, Button } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { onFieldsChange } from "api/common";
import { validateMessages } from "api/common";
import { useForm } from "antd/lib/form/Form";
import { resetForm } from "api/common";
import departmentApi from "api/admin/departmentService";
import { UploadOutlined } from "@ant-design/icons";
import uploadApi from "api/upload/uploadService";
import moment from "moment";

export const ExercisesForm = ( props ) =>
{
	const [ form ] = useForm();


	const dispatch = useDispatch();

	const [ files, setFiles ] = useState( [] );
	const [ mes, setMes ] = useState( '' );
	const [ isChange, setIsChange ] = useState( false );
	const [ data, setData ] = useState(null);
	const [ classConfig, setClassConfig ] = useState( [] );

	useEffect( () =>
	{
		getClassroomList()
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
		const rs = await departmentApi.getExerciseById( id );
		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{
				let classes = data.classrooms.map( item => { return item.id});
				let formValue = {
					title: data.title,
					content: data.content,
					deadline: data.deadline ? moment( data.deadline ).format( 'yyyy-MM-DD' ) : null,
					status: data.status,
					class_id: classes || []
				}
				if ( data.file )
				{
					setFiles()
				}
				setData(data);
				form.setFieldsValue( formValue )
			}
		}
		dispatch( toggleShowLoading( false ) )
	}
	const getClassroomList = async () =>
	{
		const rs = await departmentApi.getClassList( { page: 1, page_size: 1000 } );
		if ( rs?.status === 'success' && rs.data.result )
		{
			let classData = rs.data.result.reduce( ( newItem, e ) =>
			{
				newItem.push( {
					value: e.id,
					label: e.name
				} );
				return newItem;
			}, [] );
			setClassConfig( classData );
		}
	}

	const submitForm = async ( e ) =>
	{
		let formData = { ...e };
		if ( isChange )
		{
			if ( !files || files?.length == 0 )
			{
				setMes( 'You must choose a file' );
				return;
			}
			let file = await uploadApi.uploadFile( [
				{
					originFileObj: files[ 0 ]
				}
			] );
			if ( !file || file == '' )
			{
				setMes( 'Upload file error' );
				return;
			}
			formData.file = file;
		}
		let res;

		if ( props.id )
		{
			res = await departmentApi.updateExercise( props.id, formData );
		} else
		{
			res = await departmentApi.createExercise( formData );
		}
		if ( res.status === 'success' )
		{
			
			reset();
			message.success( 'Successfully' )
			props.getExerciseList( { ...props.paging, page: 1 } );
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

	const fileUpload = {
		onRemove: ( file ) =>
		{
			setFiles( [] );
		},
		beforeUpload: ( file ) =>
		{
			if ( file )
			{
				setIsChange( true );
			}
			setFiles( [ file ] );
			return false;
		},
		files,
	};

	const reset = () =>
	{
		resetForm( form )
		props.setShowModal( false );
		setMes( '' );
		setIsChange( false );
		props.setId( null )
	}


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div style={ { fontSize: 21 } }>{ props.id ? 'Update Exercise' : 'Create Exercise' }</div>
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
						<div className="col-md-12">
							<Form.Item name="title" label="Title"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter title' />
							</Form.Item>
						</div>

						<div className="col-md-12">
							<Form.Item name="content" label="Description"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.TextArea rows={ 5 } placeholder='Enter description' />
							</Form.Item>
						</div>

						<div className="col-md-12">
							<Form.Item name="file" label="File exercise"
								className=' d-block'>
								
								<Upload { ...fileUpload } maxCount={ 1 } accept=".xlsx,.xls,.doc, .docx,.txt,.pdf">
									<Button icon={ <UploadOutlined /> }>Select File</Button>
								</Upload>
								{!isChange && data?.file && <span>{data.file}</span>}
							</Form.Item>
						</div>
						<div className="col-md-12">
							<Form.Item name="class_id" label="Classrooms"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Select class"
									mode="multiple"
									showSearch
									filterOption={ ( input, option ) =>
										( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }
									style={ { width: '100%' } }
									options={ classConfig }
								/>
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
							<Form.Item name="deadline" label="Deadline"
								className=' d-block'>
								<Input type="date" placeholder='Enter deadline' />
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
							onClick={ () => reset }>
							Cancel
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
