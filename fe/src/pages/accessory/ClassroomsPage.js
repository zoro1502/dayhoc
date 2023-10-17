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
import moment from "moment";
import { Pagination, message } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { timeDelay } from "api/common";
import { FilterAccessory } from "./filter";
import { CourseForm } from "./classesForm";

function ClassroomsPage ()
{

	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );
	const [ params, setParams ] = useState( { department_name: null } );

	const [ classes, setClasses ] = useState( [] );

	const [ idDel, setIdDel ] = useState()
	const [ id, setId ] = useState()

	const [ showModal, setShowModal ] = useState( false );

	const role = Number( localStorage.getItem( 'role' ) );


	const dispatch = useDispatch()

	useEffect( () =>
	{
		paging.page = 1;
		getClassList( { ...paging } );
	}, [] );

	const getClassList = async ( filters ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await departmentApi.getClassList( filters );
		await timeDelay( 1000 );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setClasses( response?.data );
			setPaging( { ...response?.meta } );
		} else
		{
			message.error( response?.message || 'Error! Please try again' )
		}
		dispatch( toggleShowLoading( false ) );
	};

	const handleDelete = async ( id ) =>
	{
		try
		{
			const response = await departmentApi.deleteClass( id );
			dispatch( toggleShowLoading( true ) );
			await timeDelay( 1000 );
			if ( response?.status === 200 || response?.status === 'success' )
			{
				getClassList( { page: 1 } );
				setShowModal( false );
				setIdDel( null );
				message.success( 'Delete successfully!' );
			} else
			{
				message.error( response?.message || 'Error! Please try again' );
				dispatch( toggleShowLoading( false ) );

			}
		} catch ( e )
		{

			console.log( e );
			message.error( e.message || 'Error! Please try again' )
			dispatch( toggleShowLoading( false ) );
		}
	};

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

	const statusConfig = [
		{ id: 0, value: 'Inactive' },
		{ id: 1, value: 'Active' }
	];

	const genStatusClass = ( status ) =>
	{
		if ( status )
		{
			let nameStatus =
				statusConfig.find( ( item ) => item.id === status );
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

	const genTimeLine = ( item ) =>
	{

		const dates = item.slot_date ? item.slot_date.split( ',' ) : [];
		if ( dates.length > 0 )
		{
			return dates.map( ( e, index ) =>
			{
				let find = slotDates.find( ii => ii.value === Number( e ) );
				return ( <p className="mb-1 text-nowrap" key={ index }>{ item.slot } - { find?.label || '' }</p> )
			} );
		}
		return item.slot;
	}

	const joinData = async ( id ) =>
	{
		dispatch( toggleShowLoading( true ) )
		const res = await departmentApi.joinClass( id );
		if ( res?.status === 'success' )
		{
			dispatch( toggleShowLoading( false ) )
			message.success( 'You have joined successfully!' );
			getClassList( { page: 1 } );
		} else
		{
			message.error( res.message );
			dispatch( toggleShowLoading( false ) )
		}
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header >
								<Card.Title className={ 'd-flex justify-content-between' } as="h4">Classroom List
									{ ( role !== 3 ) && <button onClick={ () => setShowModal( true ) }
										type="button" className="btn btn-info" style={ { padding: '6px 14px', fontSize: 14 } }>
										<span>Create</span>
									</button> }
								</Card.Title>

								<div className="my-4">
									{/* <FilterAccessory
										paging={ paging }
										setPaging={ setPaging }
										getClassList={ getClassList }
										setParams={ setParams }
									/> */}
								</div>
							</Card.Header>
							<Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
								<Table className="table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0">ID</th>
											<th className="border-0">Classroom Name</th>
											<th className="border-0">Classroom code</th>
											<th className="border-0">Course name</th>
											{/* <th className="border-0">Time table</th> */ }
											<th className="border-0">Status</th>
											{/* <th className="border-0">Students</th> */ }
											<th className="border-0">Created at</th>
											<th className="border-0">action</th>
											

										</tr>
									</thead>
									{/* {loading === true &&
                                        <tbody>
                                            <tr>
                                                <td colSpan={4} style={{ backgroundColor: '#ffff' }}>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ height: 500 }}>
                                                        <MDBSpinner role='status'></MDBSpinner>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    } */}

									<tbody>
										{
											classes.length > 0 ? (
												classes.map( ( item, index ) => (
													<tr key={ index }>
														<td>{ ( paging.page - 1 ) * paging.page_size + ( index + 1 ) }</td>
														<td className="text-break" style={ { minWidth: 100 } }>{ item.classroom?.name || 'N/A' }</td>
														<td className="text-break" style={ { minWidth: 100 } }>{ item.classroom?.code || 'N/A' }</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{ item.course?.name || 'N/A' }
														</td>
														{/* <td className="text-break" style={ { minWidth: 100 } }>
															{ genTimeLine( item ) }
														</td> */}
														<td className="text-nowrap">{ genStatusClass( item?.classroom?.status ) }</td>
														{/* <td className="text-break">{ item.total + '/' + item.student_max_number }</td> */ }
														<td>{ moment( item?.classroom?.created_at ).format( "DD/MM/yyyy" ) }</td>

														<td >
															<div className="d-flex justify-between align-items-center align-middle">


																{ role !== 3 &&
																	<>
																		<button className={ 'btn btn-sm btn-info text-nowrap' }
																			style={ { padding: '3px 8px', width: 65 } }
																			onClick={ () => { setShowModal( true ); setId( item?.classroom?.id ) } }>Edit</button>
																		<button className={ 'btn btn-sm btn-danger text-nowrap ml-2' } style={ { padding: '3px 8px', width: 65 } }
																			onClick={ () => { setIdDel( item?.classroom?.id ) } }>Remove</button>
																	</>
																	||
																	!item.student &&

																	<button className={ 'btn btn-sm btn-warning text-nowrap' }
																		style={ { padding: '3px 8px', width: 65 } }
																		onClick={ () => joinData( item?.classroom?.id ) }>Join</button>
																}

															</div>

														</td>
													</tr>
												) )
											) : (
												<>
													<tr>
														<td colSpan={ 4 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
															<img alt='empty' src={ require( '../../assets/img/logo-empty.png' ) } />
															<div style={ { color: "#9A9A9A" } }>Data empty</div>
														</td>
													</tr>
												</>

											)
										}
									</tbody>

								</Table>
							</Card.Body>
							{
								paging.total > 0 &&
								<div className="mx-auto my-4">
									<Pagination
										onChange={ e =>
											getProviderList( { ...paging, page: e, ...params } )
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

				<Modal show={ idDel ? true : false } dialogClassName="dialog-confirm">
					<Modal.Body className="d-flex justify-content-center">
						Are you sure to remove it?
					</Modal.Body>
					<Modal.Footer className="d-flex justify-content-center">
						<button className="btn btn-primary" style={ { padding: '5px 20px', marginRight: 5 } } onClick={ () => handleDelete( idDel ) }>Yes</button>
						<button className="btn btn-secondary" style={ { padding: '5px 20px', marginLeft: 5 } } onClick={ () => setIdDel( null ) }>No</button>
					</Modal.Footer>
				</Modal>

				<CourseForm showModal={ showModal }
					id={ id }
					setShowModal={ setShowModal }
					getClassList={ getClassList }
					params={ params }
					paging={ paging }
					setId={ setId }
				/>
			</Container >
		</>
	);
}

export default ClassroomsPage;
