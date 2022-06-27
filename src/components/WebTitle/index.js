import React from 'react';
import style from './WebTitle.module.css';

import { config } from '../../config';

export default function WebTitle({size}){
	return (
		<h1 style={{fontSize:size}} className={style.container}>{config.site_tittle}</h1>
	)
}