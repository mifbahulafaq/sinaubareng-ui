import fetch from './fetch';

export function get(path){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/${path}`,{ responseType: 'blob' });
	
}