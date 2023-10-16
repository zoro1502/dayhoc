import React, { useState } from "react";
// react-bootstrap components
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";
export const TotalDasboardCpn = (props) => 
{
	let role = localStorage.getItem('role');
	return (
		<Row>
			<Col lg="4" sm="6">
				<Card className="card-stats">
					<Card.Body>
						<Row>
							<Col xs="5">
								<div className="icon-big text-center icon-warning">
									<i className="nc-icon nc-bullet-list-67 text-warning"></i>
								</div>
							</Col>
							<Col xs="7">
								<div className="numbers">
									<p className="card-category">Class</p>
									<Card.Title as="h4">{props.countNumber?.devices}</Card.Title>
								</div>
							</Col>
						</Row>
					</Card.Body>
					
				</Card>
			</Col>
			{
				role === '1' && <Col lg="4" sm="6">
				<Card className="card-stats">
					<Card.Body>
						<Row>
							<Col xs="5">
								<div className="icon-big text-center icon-warning">
									<i className="nc-icon nc-circle-09 text-success"></i>
								</div>
							</Col>
							<Col xs="7">
								<div className="numbers">
									<p className="card-category">Users</p>
									<Card.Title as="h4">{props.countNumber.users}</Card.Title>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
			}
			{/* <Col lg="4" sm="6">
				<Card className="card-stats">
					<Card.Body>
						<Row>
							<Col xs="5">
								<div className="icon-big text-center icon-warning">
									<i className="nc-icon nc-app text-danger"></i>
								</div>
							</Col>
							<Col xs="7">
								<div className="numbers">
									<p className="card-category">Providers</p>
									<Card.Title as="h4">{props.countNumber.providers}</Card.Title>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col> */}
			
		</Row>
	);
}
