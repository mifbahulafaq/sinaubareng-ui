import axios from 'axios';
import config from '../config';

export function login(input){
	return axios.post(`${config.api_host}/auth/login`,input)
	.then(result=>{
		
		if(!result.data.error){
			localStorage.setItem('token',JSON.stringify(result.data.token));
		}
		return result;
	})
}
export function logout(){
	
	const token = JSON.parse(localStorage.getItem('token'))
	
	return axios.delete(`${config.api_host}/auth/logout`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	.then(result=>{
		
		if(!result.data.error){
			localStorage.removeItem('token');
		}
		return result;
	})
}
export function signup(input){
	return axios.post(`${config.api_host}/auth/register`,input);
}
export function me(){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/auth/me`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	}).then(result=>result)
	
}