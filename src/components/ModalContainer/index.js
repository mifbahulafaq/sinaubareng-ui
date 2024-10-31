import React from 'react';
import style from './ModalContainer.module.css';
import PropTypes from 'prop-types';

function ModalContainer({ overflow, children, displayed, setDisplayed }){
	
	return (
		<div
			style={{display: displayed?'flex':'none', overflowY: overflow }}
			id="ModalContainer"
			className={style.container}
			onClick={e=>{
				if(e.target.id === 'ModalContainer') setDisplayed(false);
			}}
		>
			{children}
		</div>
	)
}

ModalContainer.propType = {
	overflow: PropTypes.string
}
ModalContainer.defaultProps = {
	overflow: 'visible'
}

export default React.memo(ModalContainer);