import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
// react-bootstrap components
import
{
	Container,
} from "react-bootstrap";
import { TotalDasboardCpn } from "components/dashboard/total";
import { LineGraphCpn } from "components/dashboard/lineGrap";
import { useState } from "react";
import { useEffect } from "react";
import { toggleShowLoading } from "redux/actions/common-action";
import { useDispatch } from "react-redux";
import { apiDashboard } from "../api/admin/dasboard";

function Dashboard ()
{

	const [ countNumber, setCountNumber ] = useState( null );

	const dispatch = useDispatch();
	
	useEffect( () =>
	{
		// apiDashboard.count_total( null, setCountNumber, dispatch );
	}, [] );
	return (
		<Container fluid>
			<h2 className="dashboard-style mb-5">Chào mừng!</h2>
			{
				countNumber && <TotalDasboardCpn countNumber={countNumber}/>
			}
			{/* <LineGraphCpn /> */}
		</Container>
	);
}

export default Dashboard;
