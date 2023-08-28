import fetch from './fetch';

export function getByMatter(id_matter, params){
	
	return fetch.get(`/api/matter-assignments/by-matter/${id_matter}`,{
		params
	});
	
}

export function getAll(params){
	
	return fetch.get('/api/matter-assignments',{
		params
	});
	
}

export function add(payload){
	
	return fetch.post('/api/matter-assignments',payload);
	
}
export function readSingle(id_matt_ass){
	
	return fetch.get(`/api/matter-assignments/${id_matt_ass}`);
	
}