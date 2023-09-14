import axios from 'axios';
import store from '../app/store'
import * as tokenActions from '../features/Token/actions'
import config from '../config';

import getCookie from '../utils/getCookie';

const baseURL = config.api_host;

const fetch = axios.create({ baseURL , withCredentials: true });



fetch.interceptors.response.use(

	async function(res){
		
		//get response data and config
		const { 
			data: responseData, 
			config :{
				url,
				method,
				data: configData,
				withCredentials,
				params
			}
		} = res;
		
		//set new request configs
		const sentData = JSON.parse(configData || '{}');
		
		let formData = new FormData();
		
		for(let key in sentData){
		
			formData.append(key, sentData[key])

		}
		
		const newConfig = {
			method,
			url: baseURL + url,
			data: formData,
			params,
			withCredentials
		}
		
		//validate response
		if(
			responseData?.message === 'jwt expired'
			||
			responseData?.message === "You aren't logged in"
		){
			
			try{
				//refresh token
				await store.dispatch(tokenActions.refresh());
				
				//get token
				const { value: token } = store.getState().token;
				
				if(!token){
					
					window.location.href = '/';
					return res;
				}
					
				return await axios(newConfig);
					
			}catch(err){
				
			}
			
		}else{
			return res;
		}
		
	}

)

export default fetch