import axios from 'axios';
import config from '../config';

export function getAll(id_matter, params){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/matter-assignments/by-matter/${id_matter}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function add(payload){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/matter-assignments`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function readSingle(id_matt_ass){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/matter-assignments/${id_matt_ass}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}