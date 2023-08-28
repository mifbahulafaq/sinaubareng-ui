import fetch from './fetch';

export function getAll(codeCLass, params){
	
	return fetch.get(`/api/matters/by-class/${codeCLass}`,{
		params
	});
	
}
export function add(payload){
	
	return fetch.post('/api/matters',payload);
	
}
export function getSingle(id_matt){
	
	return fetch.get(`/api/matters/${id_matt}`)
}
export function getaDocument(id_matt, filename){
	
	return fetch.get(`/api/matters/${id_matt}/${filename}`)
}