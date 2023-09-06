import axios from 'axios';
import config from '../config';

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
		if(responseData?.message === 'Token expired'){
			
			try{
			
				const { data: dataRefresh } = await axios.get(`${baseURL}/auth/refresh`, {withCredentials: true});
				
				if(dataRefresh.error){

					window.location.href = '/error'
					return res;
					
				}
				
				//repeat request
				return await axios(newConfig)
				
				
			}catch(err){
				
				//set redux state server error 
				return res;
			}
			
			
		}else{
			return res;
		}
		
	}

)

export default fetch