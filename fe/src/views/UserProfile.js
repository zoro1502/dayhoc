import { message } from "antd";
import { timeDelay } from "api/common";
import profileApi from "api/profile/profileService";
import { MDBSpinner } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";

import
	{
		Button,
		Card,
		Form,
		Container,
		Row,
		Col
	} from "react-bootstrap";
import { connect } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";

function User ({dispatch, showLoading})
{

	const [ loading, setLoading ] = useState( false );
	const [ loadingButton, setLoadingButton ] = useState( false );

	const [ nameShow, setNameShow ] = useState();
	const [ emailShow, setEmailShow ] = useState();
	const [ phoneShow, setPhoneShow ] = useState();
	const [ addressShow, setAddressShow ] = useState();

	const [ full_name, setFullName ] = useState();
	const [ email, setEmail ] = useState();
	const [ phone, setPhone ] = useState();
	const [ address, setAddress ] = useState();
	const [avatar, setAvatar] = useState();

	const [ form, setForm ] = useState( {} );
	const [ errors, setErrors ] = useState( {} );

	useEffect( () =>
	{
		getProfile();
	}, [] )

	const getProfile = async () =>
	{
		try
		{
			setLoading( true );
			dispatch(toggleShowLoading(true));
			const response = await profileApi.getProfile();
			await timeDelay(1000)
			if ( response?.status === 'success' )
			{
				setNameShow( response?.data?.user?.full_name );
				setEmailShow( response?.data?.user?.email );
				setPhoneShow( response?.data?.user?.phone );
				setAddressShow( response?.data?.user?.address );
				setFullName( response?.data?.user?.full_name );
				setEmail( response?.data?.user?.email );
				setPhone( response?.data?.user?.phone );
				setAddress( response?.data?.user?.address );
			} else {
				message.error( response?.message || 'Error! Please try again' );
			}
			setLoading( false );
			dispatch(toggleShowLoading(false));
		} catch ( e )
		{
			setLoading( false );
			dispatch(toggleShowLoading(false));
		}
	};

	const updateProfile = async () =>
	{
		try
		{
			setLoadingButton( true );
			
			const newErrors = findFormErrors();
			if ( Object.keys( newErrors ).length > 0 )
			{
				setErrors( newErrors );
				setLoadingButton( false );
			} else
			{
				dispatch(toggleShowLoading(true));
				const response = await profileApi.updateProfile( form );
				await timeDelay(1000);
				if ( response?.status === 'success' )
				{
					await getProfile();
					message.success('Update profile successfully!');
					setLoadingButton( false );
				} else {
					message.error(response?.message);
					setLoadingButton( false );
				}
			}
			dispatch(toggleShowLoading(false));
		} catch ( e )
		{
			console.log( e );
			message.error(e.message);
			setLoadingButton( false );
			dispatch(toggleShowLoading(false));
		}
	}

	const setField = ( field, value ) =>
	{
		console.log( field, value );
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

	const findFormErrors = () =>
	{
		const newErrors = {}
		if ( !full_name || full_name === '' ) newErrors.full_name = 'Full name cannot be blank!';
		if ( !address || address === '' ) newErrors.address = 'Address cannot be blank!';
		if ( !phone || phone === '' ) newErrors.phone = 'phone cannot be blank!';
		else if ( !/((09|03|07|08|05|04|\+84|84)+([0-9]{8,9})\b)/g.test( phone ) ) newErrors.phone = 'Phone number invalid!';
		if ( !email || email === '' ) newErrors.email = 'Email cannot be blank!';
		else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( email ) ) newErrors.email = 'Email invalid!';

		return newErrors;
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="8">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Edit Profile</Card.Title>
							</Card.Header>
							<Card.Body>
								<Form>
									<Form.Group>
										<Form.Label>Full Name: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter full name"
											value={ full_name || '' }
											onChange={ ( e ) => { setFullName( e.target.value ); setField( 'full_name', e.target.value ) } }
											isInvalid={ !!errors.full_name }
										/>
										{ errors.full_name && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.full_name }</span> }
									</Form.Group>

									<Form.Group>
										<Form.Label>Email: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter email"
											value={ email || '' }
											onChange={ ( e ) => { setEmail( e.target.value ); setField( 'email', e.target.value ) } }
											isInvalid={ !!errors.email }
										/>
										{ errors.email && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.email }</span> }
									</Form.Group>

									<Form.Group>
										<Form.Label>Phone: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter phone"
											value={ phone || '' }
											onChange={ ( e ) => { setPhone( e.target.value ); setField( 'phone', e.target.value ) } }
											isInvalid={ !!errors.phone }
										/>
										{ errors.phone && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.phone }</span> }
									</Form.Group>

									<Form.Group>
										<Form.Label>Address: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter address"
											value={ address || '' }
											onChange={ ( e ) => { setAddress( e.target.value ); setField( 'address', e.target.value ) } }
											isInvalid={ !!errors.address }
										/>
										{ errors.address && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.address }</span> }
									</Form.Group>

									<div className="d-flex justify-content-center">
										{ loadingButton === true &&
											<Button
												className="btn-fill pull-right mt-3"
												type="button"
												variant="info"
											>
												<div style={ { width: 101.16, padding: 0 } }>
													<MDBSpinner color='primary' role='status' size='sm'></MDBSpinner>
												</div>
											</Button>

										}
										{ loadingButton === false &&
											<Button
												className="btn-fill pull-right mt-3"
												type="button"
												variant="info"
												onClick={ updateProfile }
											>
												Update Profile
											</Button>
										}

									</div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col md="4">

						<Card className="card-user">
							{ showLoading &&
								<div className='d-flex justify-content-center' style={ { height: 400, alignItems: 'center' } }>
									<MDBSpinner role='status'>
									</MDBSpinner>
								</div>
							}
							{ !showLoading &&
								<>
									<div className="card-image">
										<img
											alt="..."
											src={ require( "assets/img/photo-1431578500526-4d9613015464.jpeg" ) }
										></img>
									</div>
									<Card.Body>
										<div className="author">
											<a href="#pablo" onClick={ ( e ) => e.preventDefault() }>
												<img
													alt="..."
													className="avatar border-gray"
													src={ avatar ? avatar : require( "assets/img/default-avatar.png" ) }
													onError={ ( e ) =>
														{
															e.currentTarget.src = require( "assets/img/default-avatar.png" )
														} }
												></img>
												<h5 className="title">{ nameShow }</h5>
											</a>
											<p className="description">{ emailShow }</p>
										</div>
										<p className="description text-center">
											{ phoneShow }
										</p>
										<p className="description text-center">
											{ addressShow }
										</p>
									</Card.Body>
									<hr></hr>
									<div className="button-container mr-auto ml-auto">
										<Button
											className="btn-simple btn-icon"
											href="#pablo"
											onClick={ ( e ) => e.preventDefault() }
											variant="link"
										>
											<i className="fab fa-facebook-square"></i>
										</Button>
										<Button
											className="btn-simple btn-icon"
											href="#pablo"
											onClick={ ( e ) => e.preventDefault() }
											variant="link"
										>
											<i className="fab fa-twitter"></i>
										</Button>
										<Button
											className="btn-simple btn-icon"
											href="#pablo"
											onClick={ ( e ) => e.preventDefault() }
											variant="link"
										>
											<i className="fab fa-google-plus-square"></i>
										</Button>
									</div>
								</>
							}
						</Card>
					</Col>
				</Row>
			</Container >
		</>
	);
}
const mapStateToProps = function (state) {
    return {
        showLoading: state.commonReducer.showLoading,
    }
}
export default connect(mapStateToProps)(User);
