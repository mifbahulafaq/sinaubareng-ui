import React from 'react';
import { Outlet, useParams } from 'react-router-dom'
import { useContext } from '../../Context'

//API
import * as classes from '../../api/class';

export default function GetSingleClass(){
	
	const { setSingleClass } = useContext()
	const params = useParams()
	
	React.useEffect(()=>{
		
		classes.getSingle(params.code_class)
		.then( async ({data})=>{
			
			if(data.error){
				console.log(data)
				return ;
			}
			
			setSingleClass(data.data[0]);
			
		})
		
	},[params.code_class])
	
	return <Outlet />
}