import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Input, Select } from "antd";
import { setField } from "api/common";
import departmentApi from "api/admin/departmentService";

export const FilterExercise = ( props ) =>
{
	const [ form, setForm ] = useState( {
		title: null,
		status: null,
		class_id: null,
		user_id: null,
	} );
	const [ status, setStatus ] = useState( [] );
	const [ classConfig, setClassConfig ] = useState( [] );

	useEffect( () =>
	{
		setStatus( [
			{
				label: 'Inactive',
				value: 0
			},
			{
				label: 'Active',
				value: 1
			},
		] )
		getClassroomList()
	}, [] );

	const getClassroomList = async () =>
	{
		const rs = await departmentApi.getClassList( { page: 1, page_size: 1000 } );
		if ( rs?.status === 'success' && rs.data )
		{
			let classData = rs.data.reduce( ( newItem, e ) =>
			{
				newItem.push( {
					value: e?.classroom?.id,
					label: e?.classroom?.name
				} );
				return newItem;
			}, [] );
			setClassConfig( classData );
		}
	}


	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.title )
			{
				form.title = form.title.trim();
				setForm( { ...form, title: form.title.trim() } )
			}
			props.getExerciseList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm( {
				title: null,
				status: null,
				class_id: null,
				user_id: null,
			} )
			props.getExerciseList( { ...props.paging } );
			props.setParams( {
				title: null,
				status: null,
				class_id: null,
				user_id: null,
			} );
			props.setPaging( paging );

		}

	}
	return (
		<div>
			<div className="row mb-4">

				<div className="col-md-4 mb-2 form-group ">
					<Form.Group>
						<Form.Label>Title: </Form.Label>
						<Input className="form-control"
							value={ form.title } placeholder="Enter title"
							onChange={ ( e ) => setField( form, 'title', e.target.value, setForm ) }
						/>

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
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Classroom: </Form.Label>

						<Select
							placeholder="Select classroom"
							value={ form.class_id }
							showSearch
							filterOption={ ( input, option ) => ( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }
							onChange={ ( e ) => setField( form, 'class_id', e, setForm ) }
							style={ { width: '100%' } }
							options={ classConfig }
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