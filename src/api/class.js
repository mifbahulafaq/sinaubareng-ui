import axios from 'axios';
import config from '../config';

export function getAll(){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/classes`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function createClass(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.post(`${config.api_host}/api/classes`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getSingle(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function deleteClass(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.delete(`${config.api_host}/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}