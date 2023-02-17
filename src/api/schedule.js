import axios from 'axios';
import config from '../config';

export function getSchedules(code_class){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/schedules/${code_class}`,{
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