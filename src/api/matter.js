import fetch from './fetch';
// import axios from 'axios';
// import config from '../config';

export function getAll(codeCLass, params){
	
	return fetch.get(`/api/matters/by-class/${codeCLass}`,{
		params
	});
	
}
export function add(payload){
	
	return fetch.post('/api/matters',payload);
	
}
export function edit(id_matter, payload){
	
	return fetch.put(`/api/matters/${id_matter}`,payload);
	
}
export function getSingle(id_matt){
	
	return fetch.get(`/api/matters/${id_matt}`)
}
export function getaDocument(id_matt, filename){
	
	return fetch.get(`/api/matters/${id_matt}/${filename}`)
}