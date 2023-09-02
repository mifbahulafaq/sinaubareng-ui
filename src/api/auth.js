import fetch from './fetch'

export function login(input){
	return fetch.post('/auth/login',input)
	.then(result=>{
		
		if(!result.data.error){
			localStorage.setItem('token',JSON.stringify(result.data.token));
		}
		return result;
	})
}
export function logout(){
	
	return fetch.delete('/auth/logout')
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
	
	return fetch.get('/auth/me')
	
}