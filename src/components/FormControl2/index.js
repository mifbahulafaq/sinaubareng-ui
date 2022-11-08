import React from 'react';
import style from './FormControl2.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default React.memo(function FormControl2({error,children, width, margin}){
	
	return <div style={{width: width?width:0, margin: margin? margin: 0}} className={style.container}>
		{children}
		<div style={{display:error?"block":"none"}} className={style.err} >
			<FontAwesomeIcon icon="warning" />
			<span>{error}</span>
		</div>
	</div>
})