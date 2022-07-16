import React from 'react';
import style from './Home.module.css';
import { Link, Outlet } from 'react-router-dom';
import { useContext } from '../../Context';



export default function Home() {
	const { user } = useContext();
	
	  return (
		<div className={style.container}>
			<Link to='/'>{user.name}</Link>
			<Outlet />
		</div>
	  )
}
