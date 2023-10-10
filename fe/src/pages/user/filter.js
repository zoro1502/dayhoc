import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterUser = ( props ) =>
{
	const [ form, setForm ] = useState( {
		// id: null,
		email: null,
		status: null,
		phone: null,
	} );
	const [ status, setStatus ] = useState( [] );

	useEffect( () =>
	{
		setStatus( [
			{
				label: 'Inactive',
				value: -1
			},
			{
				label: 'Active',
				value: 1
			},
		] )
	}, [] )


	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.username )
			{
				form.username = form.username.trim();
				setForm( { ...form, username: form.username.trim() } )
			}
			if ( form.id )
			{
				form.id = form.id.trim();
				setForm( { ...form, id: form.id.trim() } )
			}
			if ( form.email )
			{
				form.email = form.email.trim();
				setForm( { ...form, email: form.email.trim() } )
			}
			if ( form.phone )
			{
				form.phone = form.phone.trim();
				setForm( { ...form, phone: form.phone.trim() } )
			}
			props.getUserList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm( {
				id: null,
				username: null,
				email: null,
				status: null,
				phone: null,
				department_id: null,
			} )
			props.getUserList( { ...props.paging } );
			props.setParams( {
				id: null,
				username: null,
				email: null,
				status: null,
				phone: null,
				department_id: null
			} );
			props.setPaging( paging );

		}

	}
	return (
		<div>
			<div className="row mb-4">
				{/* <div className="col-md-4 mb-2 form-group ">
					<Form.Group>
						<Form.Label>User ID: </Form.Label>
						<Input className="form-control" value={ form.id } placeholder="Enter user id" onChange={ ( e ) => setField( form, 'id', e.target.value, setForm ) } />

					</Form.Group>
				</div> */}

				<div className="col-md-4 mb-2 form-group ">
					<Form.Group>
						<Form.Label>Email: </Form.Label>
						<Input className="form-control" value={ form.email } placeholder="Enter email" onChange={ ( e ) => setField( form, 'email', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Phone number: </Form.Label>
						<Input className="form-control" value={ form.phone } placeholder="Enter phone number" onChange={ ( e ) => setField( form, 'phone', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Status: </Form.Label>

						<Select
							placeholder="Select status"
							value={ form.status }
							onChange={ ( e ) => setField( form, 'status', e, setForm ) }
							style={ { width: '100%' } }
							options={ status }
						/>
					</Form.Group>
				</div>
			</div>


			<button type="button" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 1 ) }>
				<i className="nc-icon nc-zoom-split mr-2"></i>Search
			</button>

			<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 0 ) }>
				<i className="nc-icon nc-refresh-02 mr-2"></i>Reset
			</button>
		</div>
	);
}