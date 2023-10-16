import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'antd/dist/antd.css'

import AdminLayout from "./layouts/Admin.js";
import LoginPage from "./pages/auth/LoginPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loading from "components/loading/loading";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );


root.render(
	<Provider store={ store }>
		<BrowserRouter>
			<Loading />
			<Switch>
				<Route
					path="/login"
					component={ LoginPage } />
				<Route path="/admin" render={ ( props ) => <AdminLayout { ...props } /> } />
				<Redirect from="/" to="/admin/dashboard" />
			</Switch>
		</BrowserRouter>
	</Provider>
);
