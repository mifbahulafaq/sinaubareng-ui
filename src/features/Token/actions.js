import axios from 'axios'
import config from '../../config';

import { REQ_ERROR, ADD, REMOVE, COBA } from './constants';

import getCookie from '../../utils/getCookie';

export function remove(){
	
	return {
		type: REMOVE
	}
	
}
export function reqError(){
	return {
		type: REQ_ERROR
	}
}
export function add(){
	
	const login = getCookie('logged_in') === 'true';
	
	return {
		type: ADD,
		value: login
	}
}
export function refresh(){
	
	return async function(dispatch){
		
		try{
			
			const { data: dataRefresh } = await axios.get(`${config.api_host}/auth/refresh`, {withCredentials: true});
				
			if(dataRefresh.error){
				dispatch(remove());
			}else{
				dispatch(add());
			}
			
		}catch(err){
			//error server
			console.log(err)
		}
		
	}
}
export function coba(){
	return {
		type: COBA
	}
}