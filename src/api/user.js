import fetch from './fetch';

export function getSingle(user_id, params){
	
	return fetch.get(`/api/users/${user_id}`, {params})
	
}
export function update(payload, user_id){
	
	return fetch.put(`/api/users/${user_id}`,payload)
	
}
export function updatePwd(payload, user_id){
	
	return fetch.put(`/api/users/${user_id}/password`,payload)
	
}