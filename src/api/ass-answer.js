import fetch from './fetch';

export function getByAss(id_matt_ass){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get(`/api/assignment-answers/by-matt-ass/${id_matt_ass}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function add(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.put('/api/assignment-answers', payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}