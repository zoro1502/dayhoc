import React from "react";
import './style.scss';
import
{
	MDBContainer,
	MDBCol,
	MDBRow,
}
	from 'mdb-react-ui-kit';
import { FormLogin } from "./formLogin";

function LoginPage ()
{
	return (
		<>
			<MDBContainer className="p-10 my-5">

				<MDBRow>

					<MDBCol col='10' md='6'>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
					</MDBCol>

					<MDBCol col='4' md='6'>
						<FormLogin />
					</MDBCol>

				</MDBRow>

			</MDBContainer>
		</>
	);
}

export default LoginPage;
