import axios from 'axios';
import config from '../config';

export function getSingle(id_exm){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/exams/${id_exm}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getAll(code_class, params){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/exams/by-class/${code_class}`,{
		params,
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