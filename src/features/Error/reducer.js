import { ADD, REMOVE } from './constants';

export default function (state = false, actions){
	
	switch(actions.type){
		
		case ADD:
			return true;
			
		case REMOVE:
			return false;
			
		default:
			return state;
	}
}