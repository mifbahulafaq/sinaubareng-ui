import fetch from './fetch';

export function getByAns(id_exm_ans){
	
	return fetch.get(`/api/exm-ans-comments/by-exm-ans/${id_exm_ans}`)
	
}
export function add(payload){
	
	return fetch.post('/api/exm-ans-comments',payload)
	
}