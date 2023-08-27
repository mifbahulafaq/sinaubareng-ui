import axios from 'axios';
import config from '../config';

const baseURL = config.api_host;
const fetch = axios.create({ baseURL });

fetch.interceptors.response.use(
	async function(res){
		
		
		
		const url = res.config.baseURL + res.config.url
		console.dir(res.request)
		//const result = await fetch('trying')
		//console.log(result)
		return res
	},
	function(err){
		return Promise.reject(err)
	}

)

export default fetch