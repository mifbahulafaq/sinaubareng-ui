import { ADD, REMOVE, COBA, REQ_ERROR, REQ_SUCCESS } from './constants';
import reqStatus from '../../utils/req-status';
import getCookie from '../../utils/getCookie';

const initialState = {
	status: reqStatus.idle,
	value: getCookie('logged_in') === "true"
};

export default function reducer (state = initialState, actions){
	
	switch(actions.type){
			
		case REMOVE:
			
			const expires = new Date();
			expires.setDate(expires.getDate() - 1);
			
			document.cookie = `logged_in=; expires=${expires}; path=/;`;
			
			return { ...state, value: false, status: reqStatus.idle};
			
		case REQ_ERROR:
		
			return { ...state, value: false, status: reqStatus.error};
		case REQ_SUCCESS:
		
			return { value: actions.value, status: reqStatus.success};
			
		case COBA:
			return { ...state, coba: 'coba'};
			
		default:
			return state;
	}
}