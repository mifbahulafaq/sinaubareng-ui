import axios from 'axios';
import config from '../config';

export function get(path){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}${path}`,{
		headers: {
			authorization: `Bearer ${token}`,
		},
		responseType: 'blob'
	});
	
}