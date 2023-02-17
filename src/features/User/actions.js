import { REQ_ERROR, REQ_SUCCESS, REMOVE } from './constants';

//APIs
import { getSingle } from '../../api/user'

export function add(user_id){
	
	
	return async function(dispatch, getState){
		
		try{
			const { data } = await getSingle(user_id)
			
			if(data.error) return dispatch(reqError())
				
			dispatch(reqSuccess(data))
			
		}catch(err){
			
			dispatch(reqError())
		}
	}
	
}
export function remove(user_id){
	
	return {
		type: REMOVE
	}
	
}
export function reqError(){
	return {
		type: REQ_ERROR
	}
}
export function reqSuccess(data){
	return {
		type: REQ_SUCCESS,
		data
	}
}