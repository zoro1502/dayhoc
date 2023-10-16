import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterCourses = ( props ) =>
{
	const [ form, setForm ] = useState( {
		name: null
	} );
	

	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.name )
			{
				form.name = form.name.trim();
				setForm( { ...form, name: form.name.trim() } )
			}
			props.getCourseList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm({name: null})
			props.getCourseList( { ...props.paging } );
			props.setParams( {name: null} );
			props.setPaging( paging );

		}

	}
	return (
		<>
			<div className="row mb-4">
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Course Name: </Form.Label>
						<Input className="form-control" value={form.name} placeholder="Enter course name" onChange={ ( e ) => setField( form, 'name', e.target.value, setForm ) }/>
						
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