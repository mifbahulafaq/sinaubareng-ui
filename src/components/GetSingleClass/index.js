import React from 'react';
import { Outlet, useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import { useContext } from '../../Context'

//API
import * as classes from '../../api/class';
//PAGES
import ServerError from '../../pages/ServerError'

export default function GetSingleClass(){
	
	const { setSingleClass, singleClass } = useContext()
	const params = useParams()
	const [ error, setError ] = React.useState(false)
	
	React.useEffect(()=>{
		
		classes.getSingle(params.code_class)
		.then( async ({data})=>{
			
			if(data.error){
				console.log(data)
				return ;
			}
			
			setSingleClass(data.data);
			
		})
		return ()=>{
			setSingleClass({})
		}
		
	},[params.code_class])
	
	return singleClass.code_class? <Outlet coba={'coba'} />: <LinearProgress />
}