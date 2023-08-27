import fetch from './fetch'

export function login(input){
	return fetch.post('/auth/login',input, { withCredentials: true})
	.then(result=>{
		
		if(!result.data.error){
			localStorage.setItem('token',JSON.stringify(result.data.token));
		}
		return result;
	})
}
export function logout(){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.delete('/auth/logout',{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	.then(result=>{
		
		if(!result.data.error){
			localStorage.removeItem('token');
		}
		return result;
	})
}
export function signup(input){
	return fetch.post('/auth/register',input);
}
export function me(){
	
	const token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')): null;
	
	return fetch.get('/auth/me',{
		headers: {
			authorization: `Bearer ${token}`,
		}
	}).then(result=>result)
	
}