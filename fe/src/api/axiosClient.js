import axios from 'axios';
import { timeDelay } from './common';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(),
})

if (localStorage.getItem('accessToken')) {
	axiosClient.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('accessToken');
}

axiosClient.interceptors.response.use(
     async (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
		let data = response.data;
        if ((data && data.code === 'LG0401')) {
            localStorage.clear();
            window.location.href = `/login`;
        } else if(data.code === 'LG0403') {
			window.location.href = `/admin/error/403`;
		}
		await timeDelay( 1000 );
        return response.data;
    },
     async (error) => {
		console.log('error--------> ', error);
		await timeDelay( 1000 );

        if (error?.response?.status === 401 && error?.response?.data?.statusCode === 401) {
            localStorage.clear();
            window.location.href = `/login`;
        }

		let dataError = error.response?.data || null;
		if ((dataError && dataError.code === 'LG0401')) {
            localStorage.clear();
            window.location.href = `/login`;
        } else if(dataError.code === 'LG0403') {
			window.location.href = `/admin/error/403`;
		}
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return dataError
    }
)

export default axiosClient;