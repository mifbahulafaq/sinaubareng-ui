import store from './store'
import * as userActions from '../features/User/actions'
//api
import { me } from '../api/auth'

console.log('listen')
let currentToken;

function listener(){
	
	const { value: token } = store.getState().token
	
	const previousToken = currentToken
	
	currentToken = token
	
	if(previousToken !== currentToken){
		
		if(token){
			me()
			.then(({ data: meData })=>{
				
				if(meData.error) {
					store.dispatch(userActions.reqError())
				} 
					
				store.dispatch(userActions.add(meData.user_id))
			})
			.catch(err=>{
				store.dispatch(userActions.reqError())
			})
		}else{
			store.dispatch(userActions.remove())
		}
		
	}
	
}

export default function listen(){
	store.subscribe(listener)
}