import fetch from './fetch';

export function getByAss(id_matt_ass){
	
	return fetch.get(`/api/assignment-answers/by-matt-ass/${id_matt_ass}`)
}
export function add(payload){
	
	return fetch.put('/api/assignment-answers', payload)
}
export function getSingle(id_ass_ans){
	
	return fetch.get(`/api/assignment-answers/${id_ass_ans}`)
}
export function getaDocument(id_ass_ans, filename){
	
	return fetch.get(`/api/assignment-answers/${id_ass_ans}/${filename}`)
}