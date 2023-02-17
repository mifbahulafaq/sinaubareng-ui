import axios from 'axios'
import config from '../config'

export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.put(`${config.api_host}/api/exam-answers`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function rate(id_exm_ans, payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.put(`${config.api_host}/api/exam-answers/${id_exm_ans}/rate`, payload, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function getByExm(id_exm){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return axios.get(`${config.api_host}/api/exam-answers/by-exam/${id_exm}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}