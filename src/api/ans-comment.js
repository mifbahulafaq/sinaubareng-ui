import fetch from './fetch';

export function getByAns(id_exm_ans){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get(`/api/exm-ans-comments/by-exm-ans/${id_exm_ans}`,{
		
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	
}
export function add(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.post('/api/exm-ans-comments',payload,{
		
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	
}