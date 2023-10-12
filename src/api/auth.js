import fetch from './fetch';

import store from '../app/store';
import * as tokenActions from '../features/Token/actions'

import getCookie from '../utils/getCookie';

export function login(input){

	return fetch.post('/auth/login',input)
	.then(res=>{

		const login = getCookie('logged_in') === "true";
		
		if(login) store.dispatch(tokenActions.add(login))
		
		return res
	})
	
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
export function verify(params){
	return fetch.get('/auth/verify',{params});
}
export function me(){
	
	return fetch.get('/auth/me')
	
}