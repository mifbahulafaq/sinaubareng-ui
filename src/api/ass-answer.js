import fetch from './fetch';

export function getByAss(id_matt_ass){
	
	return fetch.get(`/api/assignment-answers/by-matt-ass/${id_matt_ass}`)
}
export function add(payload){
	
	return fetch.put('/api/assignment-answers', payload)
}