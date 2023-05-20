import axios from 'axios';
import config from '../config';

export function getSingle(user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/users/${user_id}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}
export function update(payload, user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.put(`${config.api_host}/api/users/${user_id}`,payload, {
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}
export function updatePwd(payload, user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.put(`${config.api_host}/api/users/${user_id}/password`,payload, {
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}