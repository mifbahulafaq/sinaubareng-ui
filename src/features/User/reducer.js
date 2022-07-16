import { ADD } from './constants';

const initialState = null;

export default function (state = initialState, actions){
	
	switch(actions.type){
		
		case ADD:
			return actions.user;
		default:
			return state;
	}
	return 
}