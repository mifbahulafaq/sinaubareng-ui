import fetch from './fetch'
import axios from 'axios'

export function login(input){
	return fetch.post('/auth/login',input)
}
export function logout(){
	
	return fetch.delete('/auth/logout')
	.then(result=>{
		if(!result.data.error){
			localStorage.removeItem('token');
		}
		return result;
	})
}
export function signup(input){
	return fetch.post('/auth/register',input);
}
export function me(){
	
	return fetch.get('/auth/me', { params: {ID: 12345}})
	
}