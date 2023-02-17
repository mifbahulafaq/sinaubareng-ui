import axios from 'axios';
import config from '../config';

export function getAll(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/class-discussions/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.post(`${config.api_host}/api/class-discussions`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}