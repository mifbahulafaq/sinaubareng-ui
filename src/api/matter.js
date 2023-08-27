import fetch from './fetch';

//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export function getAll(codeCLass, params){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/matters/by-class/${codeCLass}`,{
		params,
		headers: {
			authorization: `Bearer ${token}`,
		}
	});
	
}
export function add(payload){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.post('/api/matters',payload,{
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}
	});
	
}
export function getSingle(id_matt){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/matters/${id_matt}`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}
export function getaDocument(id_matt, filename){
	
	const token = JSON.parse(localStorage.getItem('token'));
	
	return fetch.get(`/api/matters/${id_matt}/${filename}`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
}