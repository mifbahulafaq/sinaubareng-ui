import React from 'react';
import { Link } from 'react-router-dom';
import style from './PageNotFound.module.css';

export default function PageNotFound() {
	
	return (
		<div className={style.container}>
			<div className={style.content}>
			
				<h1>404</h1>
				<h3>Oops! This Page Could Not Be Found</h3>
				
				<p>sorry but the page you are looking for does not exist, have been removed. name changed or temporarily unavailable</p>
				
				<Link to="/">HOME</Link>
				
			</div>
		</div>
	)
	
	
}
