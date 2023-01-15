import axios from 'axios';
import config from '../config';

export function getSingle(id_exm){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/exams/${id_exm}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getAll(code_class, params){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/exams/by-class/${code_class}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.post(`${config.api_host}/api/exams`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}