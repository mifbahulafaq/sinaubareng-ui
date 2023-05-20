import React from 'react';
import { Outlet, useParams } from 'react-router-dom'
import { useContext } from '../../Context'

//API
import * as classes from '../../api/class';
//PAGES
import ServerError from '../../pages/ServerError'

export default function GetSingleClass(){
	
	const { setSingleClass } = useContext()
	const params = useParams()
	const [ error, setError ] = React.useState(false)
	
	React.useEffect(()=>{
		
		classes.getSingle(params.code_class)
		.then( async ({data})=>{
			
			if(data.error){
				setError(true)
				return ;
			}
			
			setSingleClass(data.data);
			
		})
		.catch(()=>setError(true))
		return ()=>{
			setSingleClass({})
		}
		
	},[params.code_class])
	
	return error? <ServerError />: <Outlet coba={'coba'} />
}