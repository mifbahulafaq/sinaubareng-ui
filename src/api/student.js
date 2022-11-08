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
export function joinClass(codeCLass){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/students/join-class`,{class:codeCLass},{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}