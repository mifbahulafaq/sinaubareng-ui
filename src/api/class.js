import fetch from './fetch';

export function getAll(){
	
	return fetch.get('/api/classes');
	
}

export function createClass(payload){
	
	return fetch.post('/api/classes',payload);
	
}
export function getSingle(code_class){
	
	return fetch.get(`/api/classes/${code_class}`);
	
}
export function deleteClass(code_class){
	
	return fetch.delete(`/api/classes/${code_class}`);
	
}