import React from 'react';
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as userActions from '../../features/User/actions'
import * as tokenActions from '../../features/Token/actions'
import reqStatus from '../../utils/req-status'

//api
import { logout } from '../../api/auth'
//pages
import ErrorPage from '../../pages/ServerError'

export default function User() {
	
	const [ logoutStatus, setLogoutStatus ] = React.useState(reqStatus.idle)
	const dispatch = useDispatch()
	
	React.useEffect(()=>{
		logout().then(({ data: logoutResult})=>{
			if(logoutResult.error) return setLogoutStatus(reqStatus.error)
				
			dispatch(tokenActions.remove())
			dispatch(userActions.remove())
		})
		.catch(err=>{
			setLogoutStatus(reqStatus.error)
		})
		
	}, [dispatch])
	
	if(logoutStatus === reqStatus.error) return <ErrorPage />
	return <Navigate to="/" replace={true} />
}
