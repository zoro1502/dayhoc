import { message } from "antd";
import axiosClient from "./axiosClient"
import { setItem } from "./common";

export const authLogin = async (dataLogin) => {
	try {
		// setLoading( true );
		const response = await axiosClient.post('auth/login', dataLogin);
		if (response && response?.status == 'success' && response?.data) {

			if (response?.data) {
				setItem('accessToken', response?.data.access_token);

			}
			if (response?.data?.user) {
				setItem('fullName', response?.data?.user?.full_name);
				setItem('email', response?.data?.user?.email);
				setItem('role', response?.data?.user?.role);
				setItem('user_id', response?.data?.user?.id);
			}
			return true;

		} else {
			message.error(response?.message);
		}
		// setLoading( false );
		return false;
	} catch (error) {
		message.error(error);
		return false;
	}
}

export const authRegister = async (dataRegister) => {
	return await axiosClient.post('auth/register/admin', dataRegister);
}