import React from 'react';
import style from './ModalContainer.module.css';

export default React.memo(function ModalContainer({ children, displayed, setDisplayed }){
	
	return (
		<div
			style={{display: displayed?'flex':'none'}}
			id="ModalContainer"
			className={style.container}
			onClick={e=>{
				if(e.target.id === 'ModalContainer') setDisplayed(false);
			}}
		>
			{children}
		</div>
	)
})