import axios from 'axios';
import config from '../config';

export function getSchedules(code_class, params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/schedules/by-class/${code_class}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function insertSchedules(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.post(`${config.api_host}/api/schedules`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}