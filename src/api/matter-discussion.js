import axios from 'axios';
import config from '../config';

export function getAll(id_matter){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/matter-discussions/${id_matter}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.post(`${config.api_host}/api/matter-discussions`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}