export function user(state, actions){
	
	switch(actions.type){
		
		case 'ADD':
			return actions.user;
			
		default:
			return state
			
	}
}

export function inputExamAnswer( state, actions){
	
	const tempState = [...state]
	
	switch(actions.type){
		case 'ADD':
			
			return actions.data.map((e,i)=>{
				return { ...e, inputScore: e.score, active: false}
			}) 
			
		case 'ACTIVATE':
		
			return tempState.map((e,i)=>{
				if(i === actions.index) return {...e, active: true}
				return {...e, inputScore: e.score, active: false}
			})
			
		case 'UPDATE':
		
			tempState[actions.index].inputScore = actions.inputScore
			return tempState
			
		case 'CANCEL':
		
			tempState[actions.index].inputScore = tempState[actions.index].score
			tempState[actions.index].active = false
			
			return tempState
			
		default:
			return state
	}
}
export function assignmentFilter(state, actions){
	
	let tempSkip = 0
	
	switch(actions.type){
		case 'status':
		
			return {...state, status: actions.value}
			
		case 'class':
		
			return {...state, class: actions.code_class}
			
		case 'change_page':
		
			return { ...state, skip: actions.page * state.limit - state.limit}
			
		case 'next_page':
			
			tempSkip = state.skip + state.limit
			return tempSkip >= actions.rowCount? state: { ...state, skip: tempSkip}
			
		case 'previous_page':
		
			tempSkip = state.skip - state.limit
			return tempSkip < 0? state: { ...state, skip: tempSkip}
	}
	
}