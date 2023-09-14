import { ADD, REMOVE, COBA } from './constants';
import reqStatus from '../../utils/req-status';
import getCookie from '../../utils/getCookie';

const initialState = {
	status: reqStatus.idle,
	value: getCookie('logged_in') === "true"
};

export default function reducer (state = initialState, actions){
	
	switch(actions.type){
			
		case ADD:
		
			return { value: actions.value};
			
		case REMOVE:
			
			const expires = new Date();
			expires.setDate(expires.getDate() - 1);
			
			document.cookie = `logged_in=; expires=${expires}; path=/;`;
			return { ...state, value: false};
			
		case COBA:
			return { ...state, coba: 'coba'};
			
		default:
			return state;
	}
}