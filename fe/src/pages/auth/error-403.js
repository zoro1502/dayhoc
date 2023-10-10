import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './style.scss';
export const Error403 = () => 
{

	return <div className="error-box">
		<div className="error-body text-center">
			<h1 className="error-title text-danger">403</h1>
			<h3 className="text-uppercase error-subtitle">PERMISSION DENIED !</h3>
			<p className="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
			
	</div>
	</div >
}
