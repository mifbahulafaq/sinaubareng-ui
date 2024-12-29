import React from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const ModalContainer = React.memo(function ({ overflow, children, displayed, hideModal }){
	
	return (
		<div
			style={{display: displayed?'flex':'none', overflowY: overflow }}
			id="ModalContainer"
			className={style.container}
			onClick={e=>{
				if(e.target.id === 'ModalContainer') hideModal(false);
			}}
		>
			{children}
		</div>
	)
})

ModalContainer.propTypes = {
	overflow: PropTypes.string
}
ModalContainer.defaultProps = {
	overflow: 'visible'
}

const ModalChild = React.memo(function({ comp, compOfObjs }){
	
	if(!comp) return "";
	
	const { Comp, props } = compOfObjs[comp];
	return <Comp {...props} />
})

ModalChild.propTypes = {
	comp: PropTypes.string,
	compOfObjs: PropTypes.object
}

export {
	ModalContainer,
	ModalChild
}