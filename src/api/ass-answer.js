import axios from 'axios'
import config from '../config'

export function getByAss(id_matt_ass){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.get(`${config.api_host}/api/assignment-answers/by-matt-ass/${id_matt_ass}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function add(payload){
	
	const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')): {};
	
	return axios.put(`${config.api_host}/api/assignment-answers`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}