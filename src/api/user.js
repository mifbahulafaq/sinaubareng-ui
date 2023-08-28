import fetch from './fetch';

export function getSingle(user_id){
	
	return fetch.get(`/api/users/${user_id}`)
	
}
export function update(payload, user_id){
	
	return fetch.put(`/api/users/${user_id}`,payload)
	
}
export function updatePwd(payload, user_id){
	
	return fetch.put(`/api/users/${user_id}/password`,payload)
	
}