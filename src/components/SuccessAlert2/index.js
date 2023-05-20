import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './SuccessAlert2.module.css';

function SuccessAlert2({ msg }){
	return (
		<div className={style.container}>
			<div className={style.icon}>
				<FontAwesomeIcon icon="check" />
			</div>	
			<span>{msg}</span>
		</div>
	)
}

export default SuccessAlert2;