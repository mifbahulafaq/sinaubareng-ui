import fetch from './fetch';

export function getByMatter(id_matter, params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/matter-assignments/by-matter/${id_matter}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function getAll(params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get('/api/matter-assignments',{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.post('/api/matter-assignments',payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function readSingle(id_matt_ass){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/matter-assignments/${id_matt_ass}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}