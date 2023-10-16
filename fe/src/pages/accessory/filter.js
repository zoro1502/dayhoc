import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterAccessory = ( props ) =>
{
	const [ form, setForm ] = useState( {
		provider_id: null,
		accessory_name: null
	} );
	const [providers, setProviders] = useState([]);
	useEffect(() => {
		if(props.providerConfig) {
			let provider = props.providerConfig.reduce((newArr, item) => {
				let obj = {
					value: item.id,
					label: item.department_name
				}
				newArr.push(obj);
				return newArr;
			}, []);
			setProviders(provider);
		}
	}, [props.providerConfig]);


	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.accessory_name )
			{
				form.accessory_name = form.accessory_name.trim();
				setForm( { ...form, accessory_name: form.accessory_name.trim() } )
			}
			props.getAccessoryList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm({provider_id: null, accessory_name: null})
			props.getAccessoryList( { ...props.paging } );
			props.setParams( {provider_id: null, accessory_name: ''} );
			props.setPaging( paging );

		}

	}
	return (
		<>
			<div className="row mb-4">
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Class Name: </Form.Label>
						<Input className="form-control" value={form.accessory_name} placeholder="Enter class name" onChange={ ( e ) => setField( form, 'accessory_name', e.target.value, setForm ) }/>
						
					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Course:</Form.Label>
						<Select
							placeholder="Select course"
							value={form.provider_id}
							onChange={ ( e ) => setField( form, 'provider_id', e, setForm ) }
							style={ { width: '100%' } }
							options={ providers }
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
		</>
	);
}