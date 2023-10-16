import userApi from "api/admin/userService";
import departmentApi from "api/admin/departmentService";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from 'mdb-react-ui-kit';
import
{
	Card,
	Table,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { Pagination, Typography, message } from "antd";
import { FilterUser } from "./filter";
import { timeDelay } from "api/common";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { UserForm } from "./UserForm";
import { useSearchParams } from "react-router-dom";

function UserPage ()
{

	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );

	const [ users, setUsers ] = useState( [] );

	const [ id, setId ] = useState();

	const [ showModal, setShowModal ] = useState( false );
	const [ params, setParams ] = useState( {
		id: null,
		email: null,
		status: null,
		phone: null,
	} );

	const roles = useParams();

	const dispatch = useDispatch();

	useEffect( () =>
	{
		paging.page = 1;
		getUserList( { ...paging } );
	}, [ roles ] );

	const {localtion} = useLocation();

	// const [searchParams, setSearchParams] = useSearchParams({})

	const getUserList = async ( filters ) =>
	{
		dispatch( toggleShowLoading( true ) );
		// setSearchParams(filters)
		if ( roles.role === 'teacher' )
		{
			filters = { ...filters, role: 2 };
		} else
		{
			filters = { ...filters, role: 3 };
		}
		const response = await userApi.getUsers( filters );

		if ( response?.status === 200 || response?.status === 'success' )
		{
			setUsers( response?.data);
			setPaging( { ...response?.meta } );
		} else
		{
			message.error( response?.message || 'Error! Please try again' );

		}
		dispatch( toggleShowLoading( false ) );
	};

	const roleConfig = [
		{ id: 1, value: 'Admin' },
		{ id: 2, value: 'Teacher' },
		{ id: 3, value: 'Student' }
	];

	const statusConfig = [
		{ id: 0, value: 'Inactive' },
		{ id: 1, value: 'Active' }
	];

	const genStatusClass = ( status ) =>
	{
		if ( status )
		{
			let nameStatus = statusConfig.find( ( item ) => item.id === status );
			switch ( status )
			{
				case 1:
					return (
						<span className='text-success'>
							{ nameStatus?.value || 'N/A' }
						</span>
					);
				default: return (
					<span className='text-danger'>
						{ nameStatus?.value || 'N/A' }
					</span>
				);
			}
		}
		return (
			<span className='text-danger'>
				{ 'Inactive' }
			</span>
		);
	}

	const genClassOrCourse = ( item ) =>
	{
		if ( roles?.role === 'teacher' )
		{
			if ( item.courses?.length > 0 )
			{
				return item.courses.map( ( e, index ) =>
				{
					return <span key={ index } className="mr-1">{ e.name }</span>;
				} );
			}
			return 'N/A';
		}
		if ( item.classrooms?.length > 0 )
		{
			return item.classrooms.map( ( e, index ) =>
			{
				return <span key={ index } className="mr-1">{ e.name }</span>
			} )
		}
		return 'N/A'
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title className={ 'd-flex justify-content-between' }
									as="h4">{ roles.role == 'teacher' ? 'Teacher list' : 'Student list' }
									{ localStorage.getItem( 'role' ) === '1' &&
										<button onClick={ () => setShowModal( true ) }
											type="button" className="btn btn-info" style={ { padding: '6px 14px', fontSize: 14 } }>
											<span>Create</span></button>
									}
								</Card.Title>
								<div className="my-4">
									<FilterUser
										paging={ paging }
										setPaging={ setPaging }
										getUserList={ getUserList }
										setParams={ setParams }
									/>
								</div>
							</Card.Header>
							<Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
								<Table className="table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0 text-nowrap">ID</th>
											{/* <th className="border-0 text-nowrap">Avatar</th> */ }
											<th className="border-0 text-nowrap">Full name</th>
											<th className="border-0 text-nowrap">Email</th>
											<th className="border-0 text-nowrap">Phone number</th>

											<th className="border-0 text-nowrap">Status</th>
											<th className="border-0">Address</th>
											{ localStorage.getItem( 'role' ) === '1' && <th className="border-0 text-nowrap">action</th> }

										</tr>
									</thead>
									<tbody>
										{ users.length > 0 ? (
											users.map( ( item, index ) => (
												<tr key={ index }>
													<td>{ ( paging.page - 1 ) * paging.page_size + ( index + 1 ) }</td>
													<td className="text-break" style={ { minWidth: 150 } }>{ item.full_name || 'N/A' }</td>
													<td className="text-nowrap">{ item.email || 'N/A' }</td>
													<td className="text-nowrap">{ item.phone || 'N/A' }</td>

													<td className="text-nowrap">{ genStatusClass( item.status ) }</td>
													<td className="text break" style={ { minWidth: 150 } }>
														{ item.address || 'N/A' }
													</td>
													{
														localStorage.getItem( 'role' ) === '1' && <td className="d-flex justify-between align-items-center">
															<button className={ 'btn btn-sm btn-info text-nowrap' } style={ { padding: '3px 8px', width: 65 } } onClick={ () => { setId( item.id ); setShowModal( true ) } }>Edit</button>
															{/* <button className={ 'btn btn-sm btn-danger ml-2 text-nowrap' } style={ { padding: '3px 8px', width: 65 } } onClick={ () => { setShowModal( true ); setId( item.id ) } }></button> */ }
														</td>
													}
												</tr>
											) )
										) : (
											<>
												<tr>
													<td colSpan={ 8 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
														<img alt='empty' src={ require( '../../assets/img/logo-empty.png' ) } />
														<div style={ { color: "#9A9A9A" } }>Data empty</div>
													</td>
												</tr>
											</>
										) }
									</tbody>
								</Table>
							</Card.Body>
							{
								paging.total > 0 &&
								<div className="mx-auto my-4">
									<Pagination
										onChange={ e =>
											getUserList( { ...paging, page: e, ...params } )
										}
										pageSize={ paging.page_size }
										defaultCurrent={ paging.page }
										total={ paging.total }
									/>
								</div>
							}
						</Card>
					</Col>
				</Row>

				<UserForm showModal={ showModal }
					id={ id }
					setShowModal={ setShowModal }
					getUserList={ getUserList }
					params={ params }
					paging={ paging }
					setId={setId}
				/>

			</Container >
		</>
	);
}

export default UserPage;
