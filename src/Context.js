import { createContext, useContext as context, useReducer } from 'react';
import { user as userReducer } from './reducers';

let ContextData = createContext();

export let useContext = ()=>context(ContextData);

export default function ContextProvider({children}){
	
	const [ user, dispatch ] = useReducer(userReducer, {});
	
	return <ContextData.Provider value={{user, dispatch}}>
		{children}
	</ContextData.Provider>
}
