import { createContext, useContext as context, useReducer, useState } from 'react';
import { 
	user as userReducer,
	schedule as scheduleReducer
} from './reducers';
import statusList from './utils/req-status'

let ContextData = createContext();

export let useContext = ()=>context(ContextData);

export default function ContextProvider({children}){
	
	const [ iconBar, setIconBar ] = useState(false);
	const [ classData, setClassData ] = useState({
		data: {},
		count: 0,
		status: statusList.idle
	})
	const [ user, dispatch ] = useReducer(userReducer, {});
	const [ singleClass, setSingleClass ] = useState({});
	
	return <ContextData.Provider value={{
			singleClass,
			setSingleClass,
			user, 
			dispatch, 
			classData, 
			setClassData, 
			iconBar, 
			setIconBar,
		}}>
		{children}
	</ContextData.Provider>
}
