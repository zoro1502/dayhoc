import userApi from "api/admin/userService";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { message, Form, Input, Select, Upload, Button } from "antd";
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
import TextArea from "antd/lib/input/TextArea";

export const FormUpdateStudent = ( props ) =>
{
	const [ form ] = useForm();
	const [ files, setFiles ] = useState( [] );
	const [ mes, setMes ] = useState( '' );
	const [ isChange, setIsChange ] = useState( false );


	useEffect( () =>
	{
		if ( props.showModal && props.exercise )
		{
			form.setFieldValue( { title: props.exercise?.title } )
			if ( props.role === 2 )
			{
				form.setFieldsValue( { mark: props.exercise.mark } )
			} else
			{
				if ( props.exercise.answer )
				{
					form.setFieldsValue( { file: props.exercise.answer } )
				}
			}
		}

	}, [ props.showModal ] )

	const dispatch = useDispatch();


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
		if(props.role == 3) {
			formData.user_id = localStorage.getItem("user_id")
		}
		res = await departmentApi.updateExerciseStudent( props.exercise?.exercise_id, formData );
		if ( res?.status === 'success' )
		{
			reset();
			message.success( 'Successfully' )
			props.getExerciseList( { ...props.paging, page: 1 } );
		} else
		{
			setMes( res?.message );
			message.error( res?.message )
			dispatch( toggleShowLoading( false ) )

		}
	}

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
		props.setExercise( null )
	}

	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<h2 style={ { fontSize: 21 } }>{ props.role === 2 ? 'Update Mark' : 'Update File Answer' }</h2>
			</Modal.Header>
			<Modal.Body>
				<div className="row p-3">
					<h4 className="col-3 col-sm-2 mb-0 fw-bold">
						Bài tập:
					</h4>
					<h4 className="col-9 col-sm-10">
						{ props.exercise?.title }
					</h4>
				</div>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					{
						props.role === 2 ?
							<Form.Item name="mark" label="Mark"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Enter title' />
							</Form.Item>
							:
							<Form.Item name="file" label="File answer"
								className=' d-block'>

								<Upload { ...fileUpload } maxCount={ 1 } accept=".xlsx,.xls,.doc, .docx,.txt,.pdf">
									<Button icon={ <UploadOutlined /> }>Select File</Button>
								</Upload>
								
							</Form.Item>
					}{ !isChange && props.exercise?.answer && <span className="text-secondary my-5">File Answer: { props.exercise?.answer }</span> }
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
							onClick={ () => reset() }>
							Cancel
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
