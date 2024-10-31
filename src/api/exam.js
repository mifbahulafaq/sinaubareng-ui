import fetch from './fetch';

export function getSingle(id_exm){
	
	return fetch.get(`/api/exams/${id_exm}`);
	
}
export function getaDocument(id_exm, filename){
	
	return fetch.get(`/api/exams/${id_exm}/${filename}`)
}
export function getAll(code_class, params){
	
	return fetch.get(`/api/exams/by-class/${code_class}`,{ params });
	
}
export function add(payload){
	
	return fetch.post('/api/exams',payload);
	
}
export function edit(id_exm, payload){
	
	return fetch.put(`/api/exams/${id_exm}`,payload);
}