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
import providerApi from "api/admin/providerService";
import departmentApi from "api/admin/departmentService";
import deviceApi from "api/admin/deviceService";
import uploadApi from "api/upload/uploadService";
import userApi from "api/admin/userService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { Pagination, Select, message, Typography } from "antd";
import { timeDelay } from "api/common";
import { FilterDevice } from "./filter";
import defaultImg from '../../assets/img/image_faildoad.png';
import moment from "moment";
function DevicePage ()
{

	const [ loading, setLoading ] = useState( false );
	const [ loadingForm, setLoadingForm ] = useState( false );
	const [ loadingButton, setLoadingButton ] = useState( false );
	const [ isShowDetail, setIsShowDetail ] = useState( false );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );

	const [ devices, setDevices ] = useState( [] );

	const [ device_name, setDeviceName ] = useState();
	const [ code, setCode ] = useState();
	const [ model, setModel ] = useState();
	const [ serial, setSerial ] = useState();
	const [ status, setStatus ] = useState();
	const [ avatar, setAvatar ] = useState();
	const [ provider_id, setProviderId ] = useState();
	const [ department_id, setDepartmentId ] = useState();
	const [ user, setUser ] = useState();



	const [ providerConfig, setProviderConfig ] = useState( [] );
	const [ departmentConfig, setDepartmentConfig ] = useState( [] );
	const [ userConfig, setUserConfig ] = useState( [] );

	const [ idDel, setIdDel ] = useState()
	const [ idEdit, setIdEdit ] = useState();

	const [ showModal, setShowModal ] = useState( false );
	const [ showCre, setShowCre ] = useState( false );
	const [ showEdit, setShowEdit ] = useState( false );

	const [ isChangeFile, setIsChangeFile ] = useState( false );
	const [ file, setFile ] = useState( null );
	const [ params, setParams ] = useState( {
		id: null,
		device_name: null,
		code: null,
		status: null,
		provider_id: null,
		department_id: null,
		manufacture: null
	} );

	const dispatch = useDispatch();



	const clearDeviceEdit = () =>
	{
		setDeviceName( null );
		setCode( null );
		setModel( null );
		setSerial( null );
		setStatus( null );
		setAvatar( null );
		setProviderId( null );
		setDepartmentId( null );
	}

	const handleClose = () =>
	{
		setShowCre( false );
		setErrors( {} );
		setForm( {} );
		setLoadingButton( false );
	}

	const handleEditOn = ( id ) =>
	{
		getDeviceById( id );
		setShowEdit( true );
		setForm( {} );
		setErrors( {} );
	}

	const handleEditOff = () =>
	{
		setShowEdit( false );
		setErrors( {} );
		setForm( {} );
		setLoadingButton( false );
		clearDeviceEdit();
		setIsShowDetail( false );
	}

	const [ form, setForm ] = useState( {} );
	const [ errors, setErrors ] = useState( {} );

	const role = Number( localStorage.getItem( 'role' ) );


	useEffect( () =>
	{
		getUserList( { page: 1, page_size: 200 } );
		getProviderList( { page: 1, page_size: 200 } );
		if ( role !== 3 )
		{
			getDepartmentList( { page: 1, page_size: 200 } );
		}
	}, [] );


	useEffect( () =>
	{
		paging.page = currentPage;
		getDeviceList( { ...paging } );
	}, [ currentPage ] );

	const getDeviceList = async ( filters ) =>
	{
		try
		{
			setLoading( true );
			dispatch( toggleShowLoading( true ) );
			const response = await deviceApi.getDevices( filters );
			await timeDelay( 1000 );
			if ( response.status === 'success' )
			{
				setDevices( response.data.devices );
				setPaging( { ...response.data.meta } );
				setLoading( false );
			} else
			{
				message.error( response.message );
			}
			dispatch( toggleShowLoading( false ) );
		} catch ( e )
		{
			setLoading( false );
			message.error( e.message )
			dispatch( toggleShowLoading( false ) );
		}
	};

	const getProviderList = async ( filters ) =>
	{
		try
		{
			const response = await providerApi.getProviders( filters );
			if ( response.status === 'success' )
			{
				let providers = response.data.providers.reduce( ( newData, item ) =>
				{
					newData.push( {
						value: item.id,
						label: item.provider_name
					} );
					return newData
				}, [] )
				setProviderConfig( providers );
			}
		} catch ( e )
		{
		}
	};

	const getDepartmentList = async ( filters ) =>
	{
		try
		{
			const response = await departmentApi.getDepartments( filters );
			if ( response.status === 'success' )
			{
				let departments = response.data.departments.reduce( ( newData, item ) =>
				{
					newData.push( {
						value: item.id,
						label: item.department_name
					} );
					return newData
				}, [] )
				setDepartmentConfig( departments );
			}
		} catch ( e )
		{
			console.log( e );
		}
	};

	const getUserList = async ( filters ) =>
	{
		try
		{
			const response = await userApi.getUsers( filters );
			if ( response.status === 'success' && response.data.users )
			{
				let user = response.data.users.reduce( ( newData, item ) =>
				{
					newData.push( {
						value: item.id,
						label: item.full_name
					} );
					return newData
				}, [] )
				setUserConfig( user );
			}
		} catch ( e )
		{
			console.log( e );
		}
	}

	const getDeviceById = async ( id ) =>
	{
		try
		{
			setLoadingForm( true );
			dispatch( toggleShowLoading( true ) );
			const response = await deviceApi.getDeviceById( id );
			await timeDelay( 1000 )
			if ( response.status === 'success' )
			{
				setIsChangeFile( false );
				setIdEdit( response.data.id )
				setDeviceName( response.data.device_name );
				setCode( response.data.code );
				setModel( response.data.model );
				setSerial( response.data.serial );
				setStatus( response.data.status );
				setAvatar( response.data.avatar );
				setProviderId( response.data.provider_id );
				setDepartmentId( response.data.department_id );
				setUser( response.data.user_id );
				setForm( {
					device_name: response.data.device_name,
					code: response.data.code,
					model: response.data.model,
					serial: response.data.serial,
					status: response.data.status,
					avatar: response.data.avatar,
					user_id: response.data.user_id,
					provider_id: response.data.provider_id,
					department_id: response.data.department_id,
					manufacture: response.data.manufacture,
					device_group: response.data.device_group,
					device_type: response.data.device_type,
					import_date: moment( response.data.import_date ).format( 'yyyy-MM-DD' ),
					handover_date: moment( response.data.handover_date ).format( 'yyyy-MM-DD' ),
					expire_date: moment( response.data.expire_date ).format( 'yyyy-MM-DD' ),
				} );
				setLoadingForm( false );
			} else
			{
				message.error( response.message );
			}
			dispatch( toggleShowLoading( false ) );
		} catch ( e )
		{
			console.log( e );
			setLoadingForm( false );
			dispatch( toggleShowLoading( false ) );
			message.error( e.message )
		}
	};

	const handleSubmit = async () =>
	{
		try
		{
			setLoadingButton( true );
			const newErrors = findFormErrors( 1 );
			if ( Object.keys( newErrors ).length > 0 )
			{
				setErrors( newErrors );
				setLoadingButton( false );
			} else
			{
				dispatch( toggleShowLoading( true ) );

				const responseFile = await uploadApi.uploadFile( file );
				if ( responseFile.data.status == 'success' )
				{
					form.avatar = responseFile.data.data.destination;
				} else
				{
					setErrors( { avatar: 'Upload image error!' } )
					setLoadingButton( false );
					dispatch( toggleShowLoading( false ) );
					return;
				}
				if ( form.status ) form.status = parseInt( form.status );
				if ( form.provider_id ) form.provider_id = parseInt( form.provider_id );
				if ( form.user_id ) form.user_id = parseInt( form.user_id );
				if ( form.department_id ) form.department_id = parseInt( form.department_id );
				// form.user_id = 1;
				const response = await deviceApi.createDevice( form );
				await timeDelay( 1000 )
				if ( response.status === 201 || response.status === 'success' )
				{
					getDeviceList( { page: 1 } );
					handleClose();
					message.success( 'Created successfully!' );
				} else if ( response.status === 'fail' && response.data )
				{
					let error = Object.entries( response.data ) || [];
					if ( error.length > 0 )
					{
						let messageError = error.reduce( ( newMessage, item ) =>
						{
							newMessage[ `${ item[ 0 ] }` ] = item[ 1 ][ 0 ];
							return newMessage
						}, {} );
						setErrors( messageError )
					}
					dispatch( toggleShowLoading( false ) );
				} else
				{
					message.error( response.message )
				}
				dispatch( toggleShowLoading( false ) );
			}
		} catch ( e )
		{
			console.log( e );
			dispatch( toggleShowLoading( false ) );
			setLoadingButton( false );
			message.error( e.message )
		}
	};

	const handleUpdate = async ( id ) =>
	{
		try
		{
			setLoadingButton( true );
			const newErrors = findFormErrors( 2 );
			if ( Object.keys( newErrors ).length > 0 )
			{
				setErrors( newErrors );
				setLoadingButton( false );
			} else
			{
				dispatch( toggleShowLoading( true ) );
				if ( isChangeFile )
				{
					const responseFile = await uploadApi.uploadFile( file );
					if ( responseFile.data.status == 'success' )
					{
						form.avatar = responseFile.data.data.destination;
						setErrors( {} );
					} else
					{
						setLoadingButton( false );
						setErrors( { avatar: 'Upload image error!' } )
						dispatch( toggleShowLoading( false ) );
						return;
					}
				}
				if ( form.status ) form.status = parseInt( form.status );
				if ( form.provider_id ) form.provider_id = parseInt( form.provider_id );
				if ( form.user_id ) form.user_id = parseInt( form.user_id );
				if ( form.department_id ) form.department_id = parseInt( form.department_id );
				// form.user_id = 1;
				const response = await deviceApi.updateDevice( id, form );
				await timeDelay( 1000 )
				await timeDelay( 1000 );
				if ( response.status === 'success' )
				{
					getDeviceList( { page: 1 } );
					handleEditOff();
					message.success( 'Updated successfully!' );
					setLoadingButton( false );
				} else if ( response.status === 'fail' && response.data )
				{
					let error = Object.entries( response.data ) || [];
					if ( error.length > 0 )
					{
						let messageError = error.reduce( ( newMessage, item ) =>
						{
							newMessage[ `${ item[ 0 ] }` ] = item[ 1 ][ 0 ];
							return newMessage
						}, {} );
						setErrors( messageError )
					}
					dispatch( toggleShowLoading( false ) );
					setLoadingButton( false );
				} else
				{
					message.error( response.message );
					setLoadingButton( false );
				}
				dispatch( toggleShowLoading( false ) );
			}
		} catch ( e )
		{
			console.log( e );
			message.error( e.message )
			setLoadingButton( false );
			dispatch( toggleShowLoading( false ) );
		}
	};

	const handleDelete = async ( id ) =>
	{
		try
		{
			dispatch( toggleShowLoading( true ) );
			const response = await deviceApi.deleteDevice( id );
			if ( response.status === 'success' )
			{
				getDeviceList( { page: 1 } );
				setShowModal( false );
				setIdDel( null );
				message.success( 'Removed successfully!' );
			} else
			{
				message.error( response.message )
			}
			dispatch( toggleShowLoading( false ) );
		} catch ( e )
		{
			message.error( e.message )
			console.log( e );
			dispatch( toggleShowLoading( false ) );
		}
	};

	const setField = ( field, value ) =>
	{
		setForm( {
			...form,
			[ field ]: value
		} );

		if ( !!errors[ field ] )
		{
			setErrors( {
				...errors,
				[ field ]: null
			} );
		}
	};

	const findFormErrors = ( type ) =>
	{
		const newErrors = {}
		if ( type == 1 )
		{
			if ( !form.device_name || form.device_name === '' ) newErrors.device_name = 'Device name cannot be blank!';
			if ( !form.code || form.code === '' ) newErrors.code = 'Device code cannot be blank!';
			if ( !form.model || form.model === '' ) newErrors.model = 'Model cannot be blank!';
			if ( !form.serial || form.serial === '' ) newErrors.serial = 'Serial cannot be blank!';
			if ( !form.user_id || form.user_id === '' ) newErrors.user_id = 'User cannot be blank!';
			// if ( !form.manufacture || form.manufacture === '' ) newErrors.manufacture = 'Manufacture cannot be blank!';
			// if (!form.avatar || form.avatar === '') newErrors.avatar = 'Avatar cannot be blank!';
			if ( !form.status || form.status === '' ) newErrors.status = 'Status cannot be blank!';
			if ( !form.provider_id || form.provider_id === '' ) newErrors.provider_id = 'Provider cannot be blank!';
			if ( !form.department_id || form.department_id === '' ) newErrors.department_id = 'Department cannot be blank!';
		}
		if ( type == 2 )
		{
			if ( !device_name || device_name === '' ) newErrors.device_name = 'Device name cannot be blank!';
			if ( !code || code === '' ) newErrors.code = 'Device code cannot be blank!';
			if ( !model || model === '' ) newErrors.model = 'Model cannot be blank!';
			if ( !serial || serial === '' ) newErrors.serial = 'Serial cannot be blank!';
			// if (!avatar || avatar === '') newErrors.avatar = 'Avatar cannot be blank!';
			// if ( !status || status === '' ) newErrors.status = 'Status cannot be blank!';
			// if ( !provider_id || provider_id === '' ) newErrors.provider_id = 'Provider cannot be blank!';
			// if ( !department_id || department_id === '' ) newErrors.department_id = 'Department cannot be blank!';
		}

		return newErrors;
	};

	const statusConfig = [
		{ value: 1, label: "Đang sử dụng" },
		{ value: 2, label: "Đang báo hỏng" },
		{ value: 3, label: "Đang sửa chữa" },
		{ value: 4, label: "Đang bảo hành" },
	];

	const handleUpload = async ( e ) =>
	{
		if ( e && e.target.files[ 0 ] && !isShowDetail )
		{
			setFile( e.target.files[ 0 ] );
			setIsChangeFile( true )
		}
	}

	const genStatusClass = ( status ) =>
	{
		if ( status )
		{
			let nameStatus = statusConfig.find( ( item ) => item.value === status );
			switch ( status )
			{
				case 1:
					return <span className="text-success">{ nameStatus?.label || 'N/A' }</span>;
				case 2:
					return <span className="text-danger">{ nameStatus?.label || 'N/A' }</span>;
				case 3:
					return <span className="text-warning">{ nameStatus?.label || 'N/A' }</span>;
				default:
					return <span className="text-primary"> { nameStatus?.label || 'N/A' } </span>;
			}
		}

	}

	const errorImg = ( e ) =>
	{
		e.currentTarget.src = defaultImg;
	}


	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title className={ 'd-flex justify-content-between' } as="h4">Device List
									{ role !== 3 &&
										<button onClick={ () => setShowCre( true ) } type="button" className="btn btn-info" style={ { padding: '6px 14px', fontSize: 14 } }><span>Create</span></button>
									}
								</Card.Title>
								<div className="my-4">
									<FilterDevice
										paging={ paging }
										setPaging={ setPaging }
										getDeviceList={ getDeviceList }
										setParams={ setParams }
										providerConfig={ providerConfig }
										departmentConfig={ departmentConfig }
										role={ role }
									/>
								</div>
							</Card.Header>
							<Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
								<Table className="table table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0 text-nowrap">ID</th>
											<th className="border-0 text-nowrap text-center">Avatar</th>
											<th className="border-0 text-nowrap">Code</th>
											<th className="border-0 text-nowrap">Name</th>
											<th className="border-0 text-nowrap">Model</th>
											<th className="border-0 text-nowrap">Seri</th>
											<th className="border-0 text-nowrap">Manufacture</th>
											<th className="border-0 text-nowrap">Department</th>
											<th className="border-0 text-nowrap">Provider</th>
											<th className="border-0 text-nowrap">Status</th>

											{
												role !== 3 && <th className="border-0">action</th>
											}
										</tr>
									</thead>
									<tbody>
										{ devices.length > 0 ? (
											devices.map( ( item, index ) => (
												<tr key={ index }>
													<td>{ ( props.paging.page - 1 ) * propspaging.page_size + ( index + 1 ) }</td>
													<td className="text-nowrap" style={ { minWidth: 200 } }>
														<img src={ item.avatar } alt='avatar'
															style={ { border: '0.5px solid', borderRadius: '5px' } }
															height="70" width="70"
															onError={ errorImg }
														/>
													</td>
													<td className="text-break" style={ { minWidth: 100 } }>{ item.code || 'N/A' }</td>

													<td className="text-break" style={ { minWidth: 250 } }>
														<a href="javascript:void(0)" className="device-name" onClick={ () => { handleEditOn( item.id ); setIsShowDetail( true ) } }>
															{ item.device_name || 'N/A' }
														</a>
													</td>
													<td className="text-break" style={ { minWidth: 250 } }>{ item.model || 'N/A' }</td>
													<td className="text-break" style={ { minWidth: 250 } }>{ item.serial || 'N/A' }</td>
													<td className="text-break" style={ { minWidth: 250 } }>{ item.manufacture || 'N/A' }</td>
													<td className="text-break" style={ { minWidth: 250 } }>{ item.department?.department_name || 'N/A' }</td>
													<td className="text-break" style={ { minWidth: 250 } }>{ item.provider?.provider_name || 'N/A' }</td>
													<td className=' text-nowrap' style={ { minWidth: 100 } }>
														{ genStatusClass( item.status ) }
													</td>
													{
														role !== 3 && <td className="tex-nowrap">
															<div className="d-flex justify-between align-items-center">
																<button className={ 'btn btn-sm btn-info text-nowrap' }
																	style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () => handleEditOn( item.id ) }>Edit</button>
																<button className={ 'btn btn-sm btn-danger ml-2 text-nowrap' }
																	style={ { padding: '3px 8px', width: 65 } }
																	onClick={ () => { setShowModal( true ); setIdDel( item.id ) } }>Remove</button>
															</div>

														</td>
													}
												</tr>
											) )
										) : (
											<>
												<tr>
													<td colSpan={ 9 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
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
								<div className="mx-auto d-flex align-content-end mt-4">
									<Pagination
										onChange={ e =>{
											console.log(e);
											getUserList( { ...paging, page: e, ...params } )
										}
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
			</Container>

			<Modal show={ showModal } dialogClassName="dialog-confirm">
				<Modal.Body className="d-flex justify-content-center">
					Are you sure to remove it?
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<button className="btn btn-primary" style={ { padding: '5px 20px', marginRight: 5 } } onClick={ () => handleDelete( idDel ) }>Yes</button>
					<button className="btn btn-secondary" style={ { padding: '5px 20px', marginLeft: 5 } } onClick={ () => setShowModal( false ) }>No</button>
				</Modal.Footer>
			</Modal>

			<Modal show={ showCre } size="xl" dialogClassName="dialog-style">
				<Modal.Header style={ { justifyContent: 'center' } }>
					<Modal.Title className="mt-0" style={ { fontSize: 21 } }>Create Device</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form encType="multipart/form-data">
						<Form.Group>
							<Form.Label>Device name: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter device name"
								onChange={ ( e ) => setField( 'device_name', e.target.value ) }
								isInvalid={ !!errors.device_name }
							/>
							{ errors.device_name && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_name }</span> }
						</Form.Group>
						<div className="row">
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Device code:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter device code"
										onChange={ ( e ) => setField( 'code', e.target.value ) }
										isInvalid={ !!errors.code }
									/>
									{ errors.code && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.code }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Model:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter model"
										onChange={ ( e ) => setField( 'model', e.target.value ) }
										isInvalid={ !!errors.model }
									/>
									{ errors.model && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.model }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>User:</Form.Label>
									<Select
										placeholder="Please select user"
										value={ form.user_id }
										onChange={ ( e ) => setField( 'user_id', e ) }
										style={ { width: '100%' } }
										options={ userConfig }
										isInvalid={ !!errors.user_id }

									/>
									{ errors.user_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.user_id }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Serial:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter serial"
										onChange={ ( e ) => setField( 'serial', e.target.value ) }
										isInvalid={ !!errors.serial }
									/>
									{ errors.serial && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.serial }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Status:</Form.Label>
									<Select
										placeholder="Select status"
										value={ form.status }
										onChange={ ( e ) => setField( 'status', e ) }
										style={ { width: '100%' } }
										options={ statusConfig }
										isInvalid={ !!errors.status }

									/>
									{ errors.status && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.status }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Manufacture:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Manufacture"
										onChange={ ( e ) => setField( 'manufacture', e.target.value ) }
										isInvalid={ !!errors.manufacture }
									/>
									{ errors.manufacture && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.manufacture }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Device group:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter group"
										onChange={ ( e ) => setField( 'device_group', e.target.value ) }
										isInvalid={ !!errors.device_group }
									/>
									{ errors.device_group && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_group }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Device type:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter type"
										onChange={ ( e ) => setField( 'device_type', e.target.value ) }
										isInvalid={ !!errors.device_type }
									/>
									{ errors.device_type && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_type }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Import date:</Form.Label>
									<Form.Control
										type="date"
										placeholder="Enter import date"
										onChange={ ( e ) => setField( 'import_date', e.target.value ) }
										isInvalid={ !!errors.import_date }
									/>
									{ errors.import_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.import_date }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Handover date:</Form.Label>
									<Form.Control
										type="date"
										placeholder="Enter handover date"
										onChange={ ( e ) => setField( 'handover_date', e.target.value ) }
										isInvalid={ !!errors.handover_date }
									/>
									{ errors.handover_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.handover_date }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Expire date:</Form.Label>
									<Form.Control
										type="date"
										placeholder="Enter expire date"
										onChange={ ( e ) => setField( 'expire_date', e.target.value ) }
										isInvalid={ !!errors.expire_date }
									/>
									{ errors.expire_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.expire_date }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Provider:</Form.Label>
									<Select
										placeholder="Select provider"
										value={ form.provider_id }
										onChange={ ( e ) => setField( 'provider_id', e ) }
										style={ { width: '100%' } }
										options={ providerConfig }
										isInvalid={ !!errors.provider_id }

									/>
									{ errors.provider_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.provider_id }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Department:</Form.Label>
									<Select
										placeholder="Select department"
										value={ form.department_id }
										onChange={ ( e ) => setField( 'department_id', e ) }
										style={ { width: '100%' } }
										options={ departmentConfig }
										isInvalid={ !!errors.department_id }

									/>
									{ errors.department_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.department_id }</span> }
								</Form.Group>
							</div>
							<div className="col-md-4 mb-2">
								<Form.Group style={ { marginTop: 10 } }>
									<Form.Label>Avatar:</Form.Label>
									<Form.Control
										style={ { padding: '4px 12px' } }
										type="file"
										accept="image/*"
										onChange={ ( e ) => { handleUpload( e ) } }
										isInvalid={ !!errors.avatar }
									/>
									{ errors.avatar && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.avatar }</span> }
								</Form.Group>
							</div>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer style={ { justifyContent: 'center', marginTop: 10 } }>
					<button type="submit" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ handleSubmit } disabled={ loadingButton == true }>
						{ loadingButton === true &&
							<div style={ { width: 100.010, padding: 0 } }>
								<MDBSpinner color='primary' role='status' size='sm'></MDBSpinner>
							</div>
						}
						{ loadingButton === false && <>Submit</> }
					</button>

					<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ handleClose }>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>

			<Modal show={ showEdit } size="xl" dialogClassName="dialog-style">
				<Modal.Header style={ { justifyContent: 'center' } }>
					<Modal.Title className="mt-0 text-center" style={ { fontSize: 21 } }>Edit Device</Modal.Title>
				</Modal.Header>
				{ loadingForm === true &&
					<div className='d-flex justify-content-center' style={ { height: 200, alignItems: 'center' } }>
						<MDBSpinner role='status'>
						</MDBSpinner>
					</div>
				}
				{ loadingForm === false &&
					<>
						<Modal.Body>
							<Form>
								<Form.Group>
									<Form.Label>Device name: </Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter device name"
										value={ form.device_name }
										readOnly={ true }
									// onChange={ ( e ) => setField( 'device_name', e.target.value ) }
									// isInvalid={ !!errors.device_name }
									/>
									{/* { errors.device_name && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_name }</span> } */ }
								</Form.Group>
								<div className="row">
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Device code:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter device code"
												readOnly={ true }
												value={ form.code }
											// onChange={ ( e ) => setField( 'code', e.target.value ) }
											// isInvalid={ !!errors.code }
											/>
											{/* { errors.code && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.code }</span> } */ }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Model:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter model"
												value={ form.model }
												readOnly={ true }
											// onChange={ ( e ) => setField( 'model', e.target.value ) }
											// isInvalid={ !!errors.model }
											/>
											{/* { errors.model && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.model }</span> } */ }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Serial:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter serial"
												value={ form.serial }
												readOnly={ true }
											// onChange={ ( e ) => setField( 'serial', e.target.value ) }
											// isInvalid={ !!errors.serial }
											/>
											{/* { errors.serial && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.serial }</span> } */ }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>User:</Form.Label>
											<Select
												placeholder="Please select user"
												value={ form.user_id }
												disabled={ isShowDetail }
												onChange={ ( e ) =>
												{
													if ( !isShowDetail )
													{
														setField( 'user_id', e )
													}
												} }
												style={ { width: '100%' } }
												options={ userConfig }
												isInvalid={ !!errors.user_id }

											/>
											{ errors.user_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.user_id }</span> }
										</Form.Group>
									</div>

									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Status:</Form.Label>
											<Select
												placeholder="Select status"
												value={ form.status }
												disabled={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'status', e ) } }
												style={ { width: '100%' } }
												options={ statusConfig }
												isInvalid={ !!errors.status }

											/>
											{ errors.status && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.status }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Manufacture:</Form.Label>
											<Form.Control
												type="text"
												value={ form.manufacture }
												placeholder="Enter Manufacture"
												readOnly={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'manufacture', e.target.value ) } }
												isInvalid={ !!errors.manufacture }
											/>
											{ errors.manufacture && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.manufacture }</span> }
										</Form.Group>
									</div>

									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Device group:</Form.Label>
											<Form.Control
												type="text"
												value={ form.device_group }
												readOnly={ isShowDetail }
												placeholder="Enter group"
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'device_group', e.target.value ) } }
												isInvalid={ !!errors.device_group }
											/>
											{ errors.device_group && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_group }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Device type:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter type"
												value={ form.device_type }
												readOnly={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'device_type', e.target.value ) } }
												isInvalid={ !!errors.device_type }
											/>
											{ errors.device_type && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_type }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Import date:</Form.Label>
											<Form.Control
												type="date"
												placeholder="Enter import date"
												value={ form.import_date }
												readOnly={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'import_date', e.target.value ) } }
												isInvalid={ !!errors.import_date }
											/>
											{ errors.import_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.import_date }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Handover date:</Form.Label>
											<Form.Control
												type="date"
												placeholder="Enter handover date"
												value={ form.handover_date }
												readOnly={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'handover_date', e.target.value ) } }
												isInvalid={ !!errors.handover_date }
											/>
											{ errors.handover_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.handover_date }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Expire date:</Form.Label>
											<Form.Control
												type="date"
												placeholder="Enter expire date"
												readOnly={ isShowDetail }
												value={ form.expire_date }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'expire_date', e.target.value ) } }
												isInvalid={ !!errors.expire_date }
											/>
											{ errors.expire_date && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.expire_date }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Provider:</Form.Label>
											<Select
												placeholder="Select provider"
												value={ form.provider_id }
												disabled={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'provider_id', e ) } }
												style={ { width: '100%' } }
												options={ providerConfig }
												isInvalid={ !!errors.provider_id }

											/>
											{ errors.provider_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.provider_id }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Department:</Form.Label>
											<Select
												placeholder="Select department"
												value={ form.department_id }
												disabled={ isShowDetail }
												onChange={ ( e ) => { if ( !isShowDetail ) setField( 'department_id', e ) } }
												style={ { width: '100%' } }
												options={ departmentConfig }
												isInvalid={ !!errors.department_id }

											/>
											{ errors.department_id && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.department_id }</span> }
										</Form.Group>
									</div>
									<div className="col-md-4 mb-2">
										<Form.Group style={ { marginTop: 10 } }>
											<Form.Label>Avatar:</Form.Label>
											{
												!isShowDetail &&
												<>
													<Form.Control
														style={ { padding: '4px 12px' } }
														type="file"
														accept="image/*"

														readOnly={ isShowDetail }
														disabled={ isShowDetail }
														onChange={ ( e ) => { handleUpload( e ) } }
														isInvalid={ !!errors.avatar }
													/>
													{ errors.avatar && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.avatar }</span> }
												</>
											}
											{
												isShowDetail &&
												<div>
													<img
														src={ form.avatar } style={ { border: '0.5px solid', borderRadius: '5px', width: '120px', height: '120px' } }
														onError={ errorImg }
													/>
												</div>
											}
										</Form.Group>
									</div>
								</div>
							</Form>
						</Modal.Body>
					</>
				}

				<Modal.Footer style={ { justifyContent: 'center', marginTop: 10 } }>
					{
						!isShowDetail && <button type="submit" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ () => handleUpdate( idEdit ) } disabled={ loadingButton == true }>
							{ loadingButton === true &&
								<div style={ { width: 100.010, padding: 0 } }>
									<MDBSpinner color='primary' role='status' size='sm'></MDBSpinner>
								</div>
							}
							{ loadingButton === false && <>Submit</> }
						</button>
					}

					<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ handleEditOff }>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DevicePage;
