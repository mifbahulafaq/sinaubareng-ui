import React from 'react';
import style from './WebTitle.module.css';
import { Link } from 'react-router-dom';

import { config } from '../../config';

export default function WebTitle({size}){
	return (
		<h1 style={{fontSize:size}} className={style.container}>
			<Link to="/">
				{config.site_tittle}
			</Link>
		</h1>
	)
}