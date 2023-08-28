import fetch from './fetch';

export function get(path){
	
	return fetch.get(`/${path}`,{ responseType: 'blob' });
	
}