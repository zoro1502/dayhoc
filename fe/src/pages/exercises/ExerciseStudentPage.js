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
import { Button, Input, Pagination, message } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { timeDelay } from "api/common";
import { FilterExercise } from "./filterExercise";
import { genStatusClass } from "api/common";
import { formUpdateStudent } from "./formUpdateStudent";

function ExercisesStudentPage ()
{

	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );
	const [ params, setParams ] = useState( {
		title: null,
		status: null,
		class_id: null,
		user_id: null,
	} );

	const [ exercises, setExercises ] = useState( [] );

	const [ exercise, setExercise ] = useState();

	const [ showModal, setShowModal ] = useState( false );

	const role = Number( localStorage.getItem( 'role' ) );

	const dispatch = useDispatch();

	useEffect( () =>
	{
		paging.page = 1;
		getExerciseList( { ...paging } );
	}, [] );

	const getExerciseList = async ( filters ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await departmentApi.getExercisesStudent( filters );
		await timeDelay( 1000 );
		if ( response.status === 'success' || response.status === 200 )
		{
			setExercises( response.data.result || [] );
			if ( response.data.meta )
			{
				setPaging( { ...response.data.meta } );
			}
		} else
		{
			message.error( response.message || 'Error! Please try again' )
		}
		dispatch( toggleShowLoading( false ) );
	};


	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header >
								<Card.Title className={ 'd-flex justify-content-between' } as="h4">Student's Exercise List
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
											<th className="border-0 text-nowrap">ID</th>
											<th className="border-0 text-nowrap">Title</th>
											<th className="border-0 text-nowrap">File question</th>
											<th className="border-0 text-nowrap">File answer</th>
											<th className="border-0 text-nowrap">Classroom</th>
											<th className="border-0 text-nowrap">Mark</th>
											<th className="border-0 text-nowrap">Status exercise</th>
											<th className="border-0 text-nowrap">Deadline</th>
											{ role !== 2 && <th className="border-0 text-nowrap">Teacher</th> }
											{ role !== 3 && <th className="border-0 text-nowrap">Student</th> }
											<th className="border-0 text-nowrap">Created at</th>

											{ role !== 1 &&
												<th className="border-0 text-nowrap">action</th>
											}
										</tr>
									</thead>

									<tbody>
										{
											exercises?.length > 0 ? (
												exercises.map( ( item, index ) => (
													<tr key={ index }>
														<td>{ ( paging.page - 1 ) * paging.page_size + ( index + 1 ) }</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{ item.exercise && item.exercise.title || 'N/A' }
														</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{
																item.exercise && item.exercise.file && <a type="download" href={ item.exercise.file } target="_blank">{ item.exercise.file }</a> || 'N/A'
															}
														</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{
																item.file && <a type="download" href={ item.file } target="_blank">{ item.file }</a> || 'N/A'
															}
														</td>
														<td className="text-break" style={ { minWidth: 80 } }>
															{ item.classroom && item.classroom.name || 'N/A' }
														</td>

														<td className="tex">
															{ item.mark }
														</td>

														<td>
															{ genStatusClass( item.status ) }
														</td>

														<td className="text-break" style={ { minWidth: 100 } }>
															{ item.exercise && item.exercise.deadline && moment( item.exercise.deadline ).format( "DD/MM/yyyy" ) || 'N/A' }
														</td>
														{ role !== 2 &&
															<td className="text-break" style={ { minWidth: 100 } }>
																{ item.exercise && item.exercise.user && item.exercise.user.full_name || 'N/A' }
															</td>
														}
														{ role !== 3 &&
															<td className="text-break" style={ { minWidth: 100 } }>
																{ item.student && item.student.full_name || 'N/A' }
															</td>
														}
														<td>{ moment( item.created_at ).format( "DD/MM/yyyy" ) }</td>
														{ role !== 1 &&
															<td className="d-flex justify-between align-items-center">
																<button className={ 'btn btn-sm btn-info text-nowrap' }
																	style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () =>
																	{
																		setExercise( item ); setShowModal( true );
																	} }>Edit</button>
															</td>
														}
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
							<formUpdateStudent
								showModal={ showModal }
								exercise={ exercise }
								setShowModal={ setShowModal }
								getExerciseList={ getExerciseList }
								params={ params }
								paging={ paging }
								role={role}
								setExercise={ setExercise }
							/>
						</Card>
					</Col>
				</Row>
			</Container >
		</>
	);
}

export default ExercisesStudentPage;
