import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './SuccessAlert.module.css';

function SuccessAlert({ displayed, message }){
	return (
		<div style={{display: displayed?'block':'none'}} className={style.container}>
			<div className={style.icon}>
				<FontAwesomeIcon icon="check" />
			</div>	
			<span>{message}</span>
			<div
				onClick={
					e=>e.currentTarget.parentElement.style.display = 'none'
				}
			>x</div>
		</div>
	)
}

SuccessAlert.defaultProps = {
	displayed: true
}

export default SuccessAlert;