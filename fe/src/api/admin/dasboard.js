import { message } from "antd";
import axiosClient from "api/axiosClient";
import { timeDelay } from "api/common";
import { buildFilter } from "api/common";
import { toggleShowLoading } from "redux/actions/common-action";


export const apiDashboard = {
	count_total: async (filters, setTotal, dispatch) => {
		try {
			dispatch(toggleShowLoading(true));
			let params = filters && buildFilter(filters) || {};
			const response = await axiosClient.get(`dashboard/total`, params);
			await timeDelay(1000);
			if(response.status === 'success') {
				setTotal(response.data);
			} else {
				message.error(res.message);
			}
			dispatch(toggleShowLoading(false));
		} catch (error) {
			console.log('dashboard GetTotal@error-------> ', error);
			dispatch(toggleShowLoading(false));
		}
	}
}