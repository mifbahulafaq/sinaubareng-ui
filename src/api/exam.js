import fetch from './fetch';

export function getSingle(id_exm){
	
	return fetch.get(`/api/exams/${id_exm}`);
	
}
export function getAll(code_class, params){
	
	return fetch.get(`/api/exams/by-class/${code_class}`,{ params });
	
}
export function add(payload){
	
	return fetch.post('/api/exams',payload);
	
}