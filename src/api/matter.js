import axios from 'axios';
import config from '../config';

//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export function getAll(codeCLass, params){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/matters/by-class/${codeCLass}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.post(`${config.api_host}/api/matters`,payload,{
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}
	});
	
}
export function getSingle(id_matt){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/matters/${id_matt}`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function getaDocument(id_matt, filename){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/matters/${id_matt}/${filename}`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}