import fetch from './fetch';

export function getSingle(user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get(`/api/users/${user_id}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}
export function update(payload, user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.put(`/api/users/${user_id}`,payload, {
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}
export function updatePwd(payload, user_id){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.put(`/api/users/${user_id}/password`,payload, {
		headers: {
			authorization: `Bearer ${token}`,
		}
	})
	
}