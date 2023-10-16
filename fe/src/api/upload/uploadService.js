import axios from "axios";
import axiosClient from "../axiosClient";

const uploadApi = {

	async getFile ( path )
	{
		try
		{

		} catch ( error )
		{

		}
		return await axiosClient.get( `upload/${ path }` );
	},

	async uploadFile ( files )
	{
		try
		{
			let avatar = null;
			if ( files.length > 0 && files[ 0 ] )
			{
				if ( !files[ 0 ].default )
				{
					const formData = new FormData();
					formData.append( 'file', files[0].originFileObj );
					console.log(process.env.REACT_APP_URL_UPLOAD);
					const res = await axios.post( `${ process.env.REACT_APP_URL_UPLOAD }upload/image`,
						formData, { headers: { 'Accept': 'multipart/form-data' } } );
						let data = res.data;
					if ( data?.status === 'success' )
					{
						avatar = data?.data?.filename;
					}
				} else
				{
					avatar = files.url
				}
			}
			return avatar;

		} catch ( error )
		{

		}

	},


	
}

export default uploadApi;