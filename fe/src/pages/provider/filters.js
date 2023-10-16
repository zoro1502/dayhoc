import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterProvider = ( props ) =>
{
	const [ form, setForm ] = useState( {
		provider_name: null,
		email: null,
		mobile: null
	} );


	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.provider_name )
			{
				form.provider_name = form.provider_name.trim();
				setForm( { ...form, provider_name: form.provider_name.trim() } )
			}
			if ( form.email )
			{
				form.email = form.email.trim();
				setForm( { ...form, email: form.email.trim() } )
			}
			if ( form.mobile )
			{
				form.mobile = form.mobile.trim();
				setForm( { ...form, mobile: form.mobile.trim() } )
			}
			props.getProviderList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm( {
				provider_name: null,
				email: null,
				mobile: null
			} )
			props.getProviderList( { ...props.paging } );
			props.setParams(
				{
					provider_name: null,
					email: null,
					mobile: null
				}
			);
			props.setPaging( paging );

		}

	}
	return (
		<>
			<div className="row mb-4">
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Provider Name: </Form.Label>
						<Input className="form-control" value={ form.provider_name } placeholder="Enter accessory name" onChange={ ( e ) => setField( form, 'provider_name', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Email: </Form.Label>
						<Input className="form-control" value={ form.email } placeholder="Enter email" onChange={ ( e ) => setField( form, 'email', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Phone: </Form.Label>
						<Input className="form-control" value={ form.mobile } placeholder="Enter mobile" onChange={ ( e ) => setField( form, 'mobile', e.target.value, setForm ) } />

					</Form.Group>
				</div>
			</div>


			<button type="button" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 1 ) }>
				<i className="nc-icon nc-zoom-split mr-2"></i>Search
			</button>

			<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 0 ) }>
				<i className="nc-icon nc-refresh-02 mr-2"></i>Reset
			</button>
		</>
	);
}