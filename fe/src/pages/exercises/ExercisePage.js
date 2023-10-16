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
import { FilterExercise } from "./filterExercise";
import { ExercisesForm } from "./exerciseForm";
import { genStatusClass } from "api/common";
import { buildImage } from "api/common";

function ExercisesPage ()
{

	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );
	const [ params, setParams ] = useState( {
		title: null,
		status: null,
		class_id: null,
		user_id: null,
	} );

	const [ exercises, setExercises ] = useState( [] );

	const [ idDel, setIdDel ] = useState();
	const [ id, setId ] = useState();

	const [ showModal, setShowModal ] = useState( false );

	const role = Number( localStorage.getItem( 'role' ) );


	const dispatch = useDispatch()

	useEffect( () =>
	{
		paging.page = 1;
		getExerciseList( { ...paging } );
	}, [] );

	const getExerciseList = async ( filters ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await departmentApi.getExercises( filters );
		await timeDelay( 1000 );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setExercises( response?.data|| [] );
			if ( response?.meta )
			{
				setPaging( { ...response?.meta } );
			}
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
			const response = await departmentApi.deleteExercise( id );
			dispatch( toggleShowLoading( true ) );
			await timeDelay( 1000 );
			if ( response?.status === 200 || response?.status === 'success' )
			{
				getExerciseList( { page: 1, ...params } );
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

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header >
								<Card.Title className={ 'd-flex justify-content-between' } as="h4">Exercise List
									{ 
									// (role === 2 ) && 
									<button onClick={ () => setShowModal( true ) }
										type="button" className="btn btn-info" style={ { padding: '6px 14px', fontSize: 14 } }>
										<span>Create</span>
									</button> }
								</Card.Title>

								<div className="my-4">
									<FilterExercise
										paging={ paging }
										setPaging={ setPaging }
										getExerciseList={ getExerciseList }
										setParams={ setParams }
									/>
								</div>
							</Card.Header>
							<Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
								<Table className="table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0">ID</th>
											<th className="border-0">title</th>
											<th className="border-0">file</th>
											<th className="border-0">Status</th>
											<th className="border-0">Deadline</th>
											<th className="border-0">Created at</th>
											{/* { role === 2 ?  */}
												<th className="border-0">action</th> 
												{/* :  */}
												<th className="border-0">Teacher</th>
											{/* } */}
										</tr>
									</thead>

									<tbody>
										{
											exercises?.length > 0 ? (
												exercises.map( ( item, index ) => (
													<tr key={ index }>
														<td>{ ( paging.page - 1 ) * paging.page_size + ( index + 1 ) }</td>
														<td className="text-break" style={ { minWidth: 100 } }>{ item?.exercise?.title || 'N/A' }</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{
																item?.exercise?.file && <a type="download" href={ item?.exercise?.file && buildImage( item?.exercise?.file ) } target="_blank">{ item?.exercise?.file }</a> || 'N/A'
															}
														</td>
														<td>
															{ genStatusClass( item?.exercise?.status ) }
														</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{ item?.exercise?.deadline && moment( item?.exercise?.deadline ).format( "DD/MM/yyyy" ) || 'N/A' }
														</td>
														<td>{ moment( item?.exercise?.created_at ).format( "DD/MM/yyyy" ) }</td>
														{/* { role === 2 ? */}
															
															<td className="d-flex justify-between align-items-center">
																<button className={ 'btn btn-sm btn-info text-nowrap' }
																	style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () => { setShowModal( true ); setId( item?.exercise?.id ) } }>Edit</button>
																<button className={ 'btn btn-sm btn-danger text-nowrap ml-2' } style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () => { setIdDel( item?.exercise?.id ) } }>Remove</button>
															</td>
															{/* : */}
															<td>
																{ item?.teacher?.full_name || 'N/A' }
															</td>
														{/* } */}
													</tr>
												) )
											) : (
												<></>
											)
										}
									</tbody>
								</Table>
								{
									( paging.total === 0 ) &&
									<>
										<div className="text-center">
											<img alt='empty' src={ require( '../../assets/img/logo-empty.png' ) } />
											<div style={ { color: "#9A9A9A" } }>Data empty</div>
										</div>
									</>
								}
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

				<ExercisesForm showModal={ showModal }
					id={ id }
					setShowModal={ setShowModal }
					getExerciseList={ getExerciseList }
					params={ params }
					paging={ paging }
					setId={ setId }
				/>
			</Container >
		</>
	);
}

export default ExercisesPage;
