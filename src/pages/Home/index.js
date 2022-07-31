import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from '../../Context';

//APIs
import { getAll as getClass } from '../../api/class';
import { getAll as getStudent } from '../../api/student';

//components
import HomeHeader from '../../components/HomeHeader';
import HomeSidebar from '../../components/HomeSidebar';

export default function Home() {
	
	const { classData, setClassData, iconBar } = useContext();
	
	useEffect(()=>{
		
		Promise.all([getClass(), getStudent()])
		.then(([{data : dataClasses }, { data : dataStudents }])=>{
			
			if(dataClasses.error || dataStudents.error){
				return console.log(dataClasses.message || dataStudents.message)
			}
			
			setClassData({
				classes: dataClasses.data,
				students: dataStudents.data
			})
			
		})
		
	},[])
	
	return (
		<div className={style.container}>
			<HomeSidebar iconBar={iconBar} classData={classData} />
			
			<div
				style={{ width: iconBar? "calc(100% - 303px)": "100%" }}
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
