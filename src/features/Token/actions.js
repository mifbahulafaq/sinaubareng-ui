import axios from 'axios'
import config from '../../config';
import { REQ_ERROR, REQ_SUCCESS, REMOVE, COBA } from './constants';
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
export function reqSuccess(){
	
	const login = getCookie('logged_in') === 'true';
	
	return {
		type: REQ_SUCCESS,
		value: login
	}
}
export function refresh(){
	
	return async function(dispatch){
		
		try{
			
			const { data: dataRefresh } = await axios.get(`${config.api_host}/auth/refresh`, {withCredentials: true});
				
			if(dataRefresh.error){
				dispatch(reqError());
			}else{
				dispatch(reqSuccess());
			}
			
		}catch(err){
			//error server
			dispatch(reqError());
		}
		
	}
}
export function coba(){
	return {
		type: COBA
	}
}