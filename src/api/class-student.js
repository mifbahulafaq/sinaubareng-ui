import axios from 'axios';
import config from '../config';

export function getAll(){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/class-students`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getByClass(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/class-students/by-class/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function joinClass(codeCLass){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.post(`${config.api_host}/api/class-students/join-class`,{class:codeCLass},{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.post(`${config.api_host}/api/class-students/add`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}