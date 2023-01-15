import axios from 'axios';
import config from '../config';

export function getAll(params){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/classes`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function createClass(payload){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.post(`${config.api_host}/api/classes`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}export function getSingle(code_class){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}