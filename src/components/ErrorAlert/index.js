import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ErrorAlert.module.css';

function ErrorAlert({ message }){
	return (
		<div className={style.container}>
			<div className={style.icon}>
				<FontAwesomeIcon icon="ban" />
			</div>
			<span>{message}</span>
		</div>
	)
}
export default ErrorAlert;