import fetch from './fetch';

export function add(payload){
	
	return fetch.put('/api/exam-answers', payload)
}
export function rate(id_exm_ans, payload){
	
	return fetch.put(`/api/exam-answers/${id_exm_ans}/rate`, payload)
}
export function getByExm(id_exm){
	
	return fetch.get(`/api/exam-answers/by-exam/${id_exm}`)
}