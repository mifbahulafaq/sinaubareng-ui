import axios from 'axios';
import config from '../config';

export function getAll(){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/classes`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function createClass(payload){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/classes`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}export function getSingle(code_class){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}