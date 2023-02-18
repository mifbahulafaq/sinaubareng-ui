import React from 'react'
import { Navigate } from 'react-router-dom';

export default function GuardGuest({children}){
	
	const token = React.useMemo(()=>JSON.parse(localStorage.getItem('token')), [])
	
	return !token? children : <Navigate to='/' replace />
}