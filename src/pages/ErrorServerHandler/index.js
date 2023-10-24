import React, { useEffect } from 'react';
import style from './ErrorServerHandler.module.css';
import { Link, useLocation } from 'react-router-dom';
import errorLogo from './error.jpg';
import { useSelector, useDispatch } from 'react-redux';
import * as errorActions from '../../features/Error/actions';

import Image from '../../components/Image';

export default function ErrorServerHandler({ children }) {
	
	const location = useLocation();
	const errorServer = useSelector(s=>s.errorServer);
	const dispatch = useDispatch();
	
	React.useEffect(()=>{

		dispatch(errorActions.remove());
		
	}, [location.pathname])
	
	if(errorServer){
		return (
			<div className={style.container}>
				<div className={style.img}>
					<Image src={errorLogo} />
				</div>
				<h3 className={style.title}><span>500</span> <br /> Internal Server Error</h3>
				<p className={style.info}>Oops something went wrong. <br /> <br /> Try to refresh this page or feel free to contact us if the problem persist.</p>
				<Link to="/" onClick={()=>dispatch(errorActions.remove())} className={style.btn}>Home</Link>
			</div>
		)
	}
	
	return children;
	
	
}
