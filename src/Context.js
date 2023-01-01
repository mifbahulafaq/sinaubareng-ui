import { createContext, useContext as context, useReducer, useState } from 'react';
import { user as userReducer } from './reducers';

let ContextData = createContext();

export let useContext = ()=>context(ContextData);

export default function ContextProvider({children}){
	
	const [ iconBar, setIconBar ] = useState(false);
	const [ classData, setClassData ] = useState({})
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
			setIconBar}
		}>
		{children}
	</ContextData.Provider>
}
