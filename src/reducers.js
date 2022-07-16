export function user(state, actions){
	
	switch(actions.type){
		
		case 'ADD':
			return actions.user;
			
		default:
			return state
			
	}
}