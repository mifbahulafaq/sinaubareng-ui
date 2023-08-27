import fetch from './fetch';

export function getAll(){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get('/api/classes',{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}

export function createClass(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.post('/api/classes',payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function getSingle(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get(`/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function deleteClass(code_class){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.delete(`/api/classes/${code_class}`,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}