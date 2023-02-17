import { ADD, REQ_ERROR, REMOVE, COBA } from './constants';
import reqStatus from '../../utils/req-status'

const initialState = {
	status: reqStatus.idle,
	value: JSON.parse(localStorage.getItem('token'))
};

export default function reducer (state = initialState, actions){
	
	switch(actions.type){
		
		case REQ_ERROR:
			return { ...state, status: reqStatus.error};
			
		case ADD:
			return { ...state, status: reqStatus.success, value: actions.token};
			
		case REMOVE:
			return { ...state, value: null};
			
		case COBA:
			return { ...state, coba: 'coba'};
			
		default:
			return state;
	}
}