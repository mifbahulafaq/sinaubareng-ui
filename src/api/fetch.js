import axios from 'axios';
import store from '../app/store'
import * as tokenActions from '../features/Token/actions'
import * as errorActions from '../features/Error/actions'
import config from '../config';

const baseURL = config.api_host;

const fetch = axios.create({ 
	baseURL ,
	withCredentials: true
});


// fetch.interceptors.request.use(function(config){
	// console.log(config)
	// return config;
// }, function(err){
	// return Promise.reject(err);
// })
fetch.interceptors.response.use(

	async function(res){
		//get response data and config
		const { 
			data: responseData, 
			config :{
				url,
				method,
				data: dataBody,
				withCredentials,
				params
			}
		} = res;
		//set new request configs
		
		const newConfig = {
			method,
			url: baseURL + url,
			data: typeof(dataBody) === 'string'? JSON.parse(dataBody): dataBody,
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
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				store.dispatch(errorActions.add())
			}
			
		}else{
			return res;
		}
		
	}, function(error){
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		store.dispatch(errorActions.add())
		return Promise.reject(error)
	}

)

export default fetch