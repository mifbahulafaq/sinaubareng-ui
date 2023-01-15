import axios from 'axios';
import config from '../config';

export function getAll(id_matter){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/matter-discussions/${id_matter}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.post(`${config.api_host}/api/matter-discussions`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}