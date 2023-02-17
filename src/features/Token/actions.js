import { REQ_ERROR, ADD, REMOVE, COBA } from './constants';

export function remove(user_id){
	
	return {
		type: REMOVE
	}
	
}
export function reqError(){
	return {
		type: REQ_ERROR
	}
}
export function add(token){
	return {
		type: ADD,
		token
	}
}
export function coba(){
	return {
		type: COBA
	}
}