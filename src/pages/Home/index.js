import React, { useEffect } from 'react';
import style from './Home.module.css';
import { Outlet } from 'react-router-dom';
import { useContext } from '../../Context';

//components
import HomeHeader from '../../components/HomeHeader';
import HomeSidebar from '../../components/HomeSidebar';

//hooks
import useRefreshClass from '../../hooks/useRefreshClass';

export default function Home() {
	
	const { classData, iconBar, setIconBar } = useContext();
	const setClasses = useRefreshClass();
	
	useEffect(()=>{
		
		setClasses();
		
	},[setClasses])
	
	return (
		<div className={style.container}>
			<div onClick={()=>setIconBar(false)}  className={`${style.hideSidebar} ${iconBar?style.active:''}`} />
			<HomeSidebar iconBar={iconBar} classData={classData} />
			
			<div
				className={style.right}
			>
				<HomeHeader />
				<div className={style.content}>
					<Outlet />
				</div>
			</div>
			
		</div>
	)
}
