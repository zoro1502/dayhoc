import React, { useState } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";
export const LineGraphCpn = ( props ) => 
{


	return (
		<Row>
			<Col md="8">
				<Card>
					<Card.Header>
						<Card.Title as="h4">Users Behavior</Card.Title>
						<p className="card-category">24 Hours performance</p>
					</Card.Header>
					<Card.Body>
						<div className="ct-chart" id="chartHours">
							<ChartistGraph
								data={ {
									labels: [
										"9:00AM",
										"12:00AM",
										"3:00PM",
										"6:00PM",
										"9:00PM",
										"12:00PM",
										"3:00AM",
										"6:00AM",
									],
									series: [
										[ 287, 385, 490, 492, 554, 586, 698, 695 ],
										[ 67, 152, 143, 240, 287, 335, 435, 437 ],
										[ 23, 113, 67, 108, 190, 239, 307, 308 ],
									],
								} }
								type="Line"
								options={ {
									low: 0,
									high: 800,
									showArea: false,
									height: "245px",
									axisX: {
										showGrid: false,
									},
									lineSmooth: true,
									showLine: true,
									showPoint: true,
									fullWidth: true,
									chartPadding: {
										right: 50,
									},
								} }
								responsiveOptions={ [
									[
										"screen and (max-width: 640px)",
										{
											axisX: {
												labelInterpolationFnc: function ( value )
												{
													return value[ 0 ];
												},
											},
										},
									],
								] }
							/>
						</div>
					</Card.Body>
					<Card.Footer>
						<div className="legend">
							<i className="fas fa-circle text-info"></i>
							Open <i className="fas fa-circle text-danger"></i>
							Click <i className="fas fa-circle text-warning"></i>
							Click Second Time
						</div>
						<hr></hr>
						<div className="stats">
							<i className="fas fa-history"></i>
							Updated 3 minutes ago
						</div>
					</Card.Footer>
				</Card>
			</Col>
			<Col md="4">
				<Card>
					<Card.Header>
						<Card.Title as="h4">Email Statistics</Card.Title>
						<p className="card-category">Last Campaign Performance</p>
					</Card.Header>
					<Card.Body>
						<div
							className="ct-chart ct-perfect-fourth"
							id="chartPreferences"
						>
							<ChartistGraph
								data={ {
									labels: [ "40%", "20%", "40%" ],
									series: [ 40, 20, 40 ],
								} }
								type="Pie"
							/>
						</div>
						<div className="legend">
							<i className="fas fa-circle text-info"></i>
							Open <i className="fas fa-circle text-danger"></i>
							Bounce <i className="fas fa-circle text-warning"></i>
							Unsubscribe
						</div>
						<hr></hr>
						<div className="stats">
							<i className="far fa-clock"></i>
							Campaign sent 2 days ago
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}
