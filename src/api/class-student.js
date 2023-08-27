import fetch from './fetch';

export function getAll(){
	
	return fetch.get('/api/class-students');
	
}
export function getByClass(code_class){
	
	return fetch.get(`/api/class-students/by-class/${code_class}`);
	
}
export function joinClass(codeCLass){
	
	return fetch.post('/api/class-students/join-class',{class:codeCLass});
	
}
export function add(payload){
	
	return fetch.post('/api/class-students/add', payload)
}
export function unenrol(id_class_student){
	
	return fetch.delete(`/api/class-students/${id_class_student}`)
}