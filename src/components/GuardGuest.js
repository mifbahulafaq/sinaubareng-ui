import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function GuardGuest({children}){
	
	const navigate = useNavigate()
	const { pathname } = useLocation()
	
	React.useEffect(()=>{
		if(pathname !== '/') return navigate('/?next='+pathname, {replace: true})
	}, [navigate, pathname])

	return children
}