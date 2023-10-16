import React, { useEffect, useState } from "react";
import './style.scss';
import { authLogin, authRegister } from "../../api/auth";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { message, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { onFieldsChange } from "api/common";
import { validateMessages } from "api/common";

export const FormLogin = () =>
{

	const dispatch = useDispatch();
	const [ form ] = useForm();

	useEffect( () =>
	{
		document.title = 'Login';
	}, [] );



	const submitForm = async ( e ) =>
	{
		try
		{
			const response = await authLogin( e, dispatch );
			dispatch( toggleShowLoading( false ) );
			if ( response )
			{
				window.location.href = '/';
			} else
			{
				setLoadingButton( false );
			}
		} catch ( e )
		{
			dispatch( toggleShowLoading( false ) );
		}
	}

	return (
		<>
			<Form
				className='p-3'
				name='nest-messages form'
				form={ form }
				onFinish={ submitForm }
				onFieldsChange={ e => onFieldsChange( e, form ) }
				validateMessages={ e => validateMessages( e, form ) }
			>
				<div className='mb-3'>
					<Form.Item name="email" label="Email"
						rules={ [ { required: true } ] }
						className=' d-block'>
						<Input placeholder='Enter email' />
					</Form.Item>

					<Form.Item name="password" label="Password"
						rules={ [ { required: true } ] }
						className=' d-block'>
						<Input.Password placeholder='Enter password' />
					</Form.Item>

				</div>

				<div className='d-flex justify-content-center'>
					<button type="submit" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
						Sign in
					</button>
				</div>
			</Form>
		</>
	);
}

