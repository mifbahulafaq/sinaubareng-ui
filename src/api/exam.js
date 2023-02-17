import axios from 'axios';
import config from '../config';

export function getSingle(id_exm){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/exams/${id_exm}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getAll(code_class, params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/exams/by-class/${code_class}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.post(`${config.api_host}/api/exams`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}