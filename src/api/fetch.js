import axios from 'axios';
import config from '../config';

const baseURL = config.api_host;

const fetch = axios.create({ baseURL , withCredentials: true });

fetch.interceptors.response.use(
	async function(res){
		
		
		console.log(res)
		
		//console.log(res.request)
		//const result = await fetch('trying')
		//console.log(result)
		return res
	},
	async function(err){
		
		const { response: res, config } = err;
		const previousFetchUrl = config.baseURL + config.url
		
		if(res.data.message === 'Token expired'){
			
			try{
			
				//const refreshResult = await axios.get(`${baseURL}/auth/refresh`, {withCredentials: true});
				//console.log('refres token', refreshResult)
				//return Promise.reject(err);
				
			}catch(err){
				console.log(err)//
				const { response: res } = err;
				
				if(res.data.status === 401) return window.location.href = '/'
			}
			
			
		}else{
		
			Promise.reject(err);
		}
	}

)

export default fetch