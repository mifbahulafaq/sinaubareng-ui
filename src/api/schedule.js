import fetch from './fetch';

export function getSchedules(code_class, params){
	
	return fetch.get(`/api/schedules/by-class/${code_class}`,{
		params
	});
	
}
export function insertSchedules(payload){
	
	return fetch.post('/api/schedules',payload);
	
}