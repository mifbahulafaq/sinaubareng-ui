import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import style from './Account.module.css'

export default function Account() {
	
	function classActive({ isActive }){
		
		return isActive? `${style.label} ${style.active}`: style.label
	}
	
	
	return (
		<div className={style.container}>
			<NavLink to="profile" className={classActive}>
				Profil
			</NavLink>
			<NavLink to="password" className={classActive}>
				Change Password
			</NavLink>
			<div className={style.contain}>
				<Outlet />
			</div>
		</div>
	)
}
