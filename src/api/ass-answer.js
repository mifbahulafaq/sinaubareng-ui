import axios from 'axios'
import config from '../config'

export function getByAss(id_matt_ass){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.get(`${config.api_host}/api/assignment-answers/by-matt-ass/${id_matt_ass}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function add(payload){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return axios.put(`${config.api_host}/api/assignment-answers`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}