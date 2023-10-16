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
import { FormUpdateStudent } from "./formUpdateStudent";
import { buildImage } from "api/common";

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
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setExercises( response?.data || [] );
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
															{ item.title || 'N/A' }
														</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{
																item.question && <a type="download" href={ item.question && buildImage(item.question) } target="_blank">{ item.question }</a> || 'N/A'
															}
														</td>
														<td className="text-break" style={ { minWidth: 100 } }>
															{
																item.answer && <a type="download" href={ item.answer && buildImage(item.answer) } target="_blank">{ item.answer }</a> || 'N/A'
															}
														</td>
														<td className="text-break" style={ { minWidth: 80 } }>
															{ item.class_name || 'N/A' }
														</td>

														<td className="tex">
															{ item.mark }
														</td>

														<td>
															{ genStatusClass( item.status ) }
														</td>

														<td className="text-break" style={ { minWidth: 100 } }>
															{ item.deadline && moment( item.deadline ).format( "DD/MM/yyyy" ) || 'N/A' }
														</td>
														{ role !== 2 &&
															<td className="text-break" style={ { minWidth: 100 } }>
																{ item.teacher_name || 'N/A' }
															</td>
														}
														{ role !== 3 &&
															<td className="text-break" style={ { minWidth: 100 } }>
																{ item.student_name || 'N/A' }
															</td>
														}
														<td>{ moment( item.created_at ).format( "DD/MM/yyyy" ) }</td>
														{ role !== 1 &&
															<td className="d-flex justify-between align-items-center">
																<button className={ 'btn btn-sm btn-info text-nowrap' }
																	style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () =>
																	{
																		setExercise( item );
																		 setShowModal( true );
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
											getExerciseList( { page: e, page_size: paging.page_size,  ...params } )
										}
										pageSize={ paging.page_size }
										defaultCurrent={ paging.page }
										total={ paging.total }
									/>
								</div>
							}
							<FormUpdateStudent
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
