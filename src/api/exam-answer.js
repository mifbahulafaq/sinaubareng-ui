import axios from 'axios'
import config from '../config'

export function add(payload){
	
	const { token } = JSON.parse(localStorage.getItem('auth'))
	
	return axios.put(`${config.api_host}/api/exam-answers`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function getByExm(id_exm){
	
	const { token } = JSON.parse(localStorage.getItem('auth'))
	
	return axios.get(`${config.api_host}/api/exam-answers/by-exam/${id_exm}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}