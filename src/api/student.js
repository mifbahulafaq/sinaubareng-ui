import axios from 'axios';
import config from '../config';

export function getAll(){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/students`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}