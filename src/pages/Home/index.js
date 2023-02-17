import React, { useEffect } from 'react';
import style from './Home.module.css';
import headerStyle from '../../components/HomeHeader/HomeHeader.module.css';
import { Outlet } from 'react-router-dom';
import { useContext } from '../../Context';
import { useDispatch } from 'react-redux'
import * as userActions from '../../features/User/actions'

//components
import HomeHeader from '../../components/HomeHeader';
import HomeSidebar from '../../components/HomeSidebar';
//pages
import ErrorPage from '../ServerError'
//utils
import statusList from '../../utils/req-status'
//hooks
import useRefreshClass from '../../hooks/useRefreshClass';
//APIs
import { me } from '../../api/auth'

export default function Home() {
	
	const { classData, iconBar, setIconBar } = useContext();
	const setClasses = useRefreshClass();
	const dispatch = useDispatch()
	const [ reqStatus, setReqStatus ] = React.useState(statusList.idle)
	
	useEffect(()=>{
		
		me()
		.then(({ data: meData })=>{
			
			if(meData.error) {
				return setReqStatus(statusList.error)
			} 
				
			dispatch(userActions.add(meData.user_id))
			setReqStatus(statusList.success)
		})
		.catch(err=>{
			setReqStatus(statusList.error)
		})
	}, [])
	
	useEffect(()=>{
		
		setClasses();
		
	},[])
	
	function scrollOn(e){
		const homeHeader = document.getElementById('home-header');
		const classList = Array.from(homeHeader.classList);
		const scrollValue = e.currentTarget.scrollTop;
		
		if(scrollValue > 0 ){
			
			if(!classList.includes(headerStyle.scroll)){
				homeHeader.classList.add(headerStyle.scroll);
			}
			
			return;
		}
		
		if(classList.includes(headerStyle.scroll)){
			homeHeader.classList.remove(headerStyle.scroll);
		}
	}
	
	if(reqStatus === statusList.error || classData.status === statusList.error) return <ErrorPage />
	return (
		<div className={style.container}>
			<div onClick={()=>setIconBar(false)}  className={`${style.hideSidebar} ${iconBar?style.active:''}`} />
			<HomeSidebar iconBar={iconBar} classData={classData.data} />
			
			<div
				className={style.right}
			>
				<HomeHeader />
				<div onScroll={scrollOn} className={style.content}>
					<Outlet />
				</div>
			</div>
			
		</div>
	)
}
