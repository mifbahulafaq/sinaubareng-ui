import fetch from './fetch';

export function getAll(code_class){
	
	return fetch.get(`/api/class-discussions/${code_class}`);
	
}
export function add(payload){
	
	return fetch.post('/api/class-discussions',payload);
	
}