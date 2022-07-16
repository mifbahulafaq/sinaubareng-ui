import axios from 'axios';
import config from '../config';

export function login(input){
	return axios.post(`${config.api_host}/auth/login`,input)
	.then(result=>{
		
		if(!result.data.error){
			localStorage.setItem('auth',JSON.stringify(result.data.data));
		}
		return result;
	})
}
export function signup(input){
	return axios.post(`${config.api_host}/auth/register`,input);
}
export function me(){
	
	const { token } = JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/auth/me`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}