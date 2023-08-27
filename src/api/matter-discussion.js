import fetch from './fetch';

export function getAll(id_matter){
	
	return fetch.get(`/api/matter-discussions/${id_matter}`);
	
}
export function add(payload){
	
	return fetch.post('/api/matter-discussions',payload);
	
}