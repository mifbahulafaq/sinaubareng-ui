import { ADD, REQ_ERROR, REQ_SUCCESS, REMOVE } from './constants';
import reqStatus from '../../utils/req-status'

const initialState = {
	status: reqStatus.idle,
	data: {}
};

export default function (state = initialState, actions){
	
	switch(actions.type){
		
		case REQ_ERROR:
			return { ...state, status: reqStatus.error};
			
		case REQ_SUCCESS:
		
			return { ...state, status: reqStatus.success, data: actions.data};
			
		case REMOVE:
			return { ...state, data: {}, status: reqStatus.idle};
			
		default:
			return state;
	}
}