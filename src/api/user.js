import axios from 'axios';
import config from '../config';

export function getSingle(user_id){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/users/${user_id}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}