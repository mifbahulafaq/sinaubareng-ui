import axios from 'axios'
import config from '../config'

export function getByAns(id_exm_ans){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/exm-ans-comments/by-exm-ans/${id_exm_ans}`,{
		
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	
}
export function add(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.post(`${config.api_host}/api/exm-ans-comments`,payload,{
		
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	
}