import fetch from './fetch';

export function getSchedules(code_class, params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/schedules/by-class/${code_class}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function insertSchedules(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.post('/api/schedules',payload,{
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}