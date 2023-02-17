import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function GuardPage({children}){
	
	const { pathname } = useLocation()
	const token = React.useMemo(()=>JSON.parse(localStorage.getItem('token')), [])
	
	return token? children : <Navigate to={pathname === '/'? '/login': '/login/?next='+pathname} />
}