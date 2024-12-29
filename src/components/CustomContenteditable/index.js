import React from 'react';
import style from './CustomContenteditable.module.css';
import PropTypes from 'prop-types';

const CustomContenteditable = function({ onInput, maxLength, placeholder }){
	
	const customInput = React.useRef(null);
	
	return(
		<div className={style.container}>
			<div 
				ref={customInput}
				// onInput={e=>customSetValue('text', e.currentTarget.innerText)}
				contentEditable="true"
				className={`${style.inputMargin} ${style.text}`} 
			/>
			<p>Isi (Opsional)</p>
		</div>
	)
}

export default CustomContenteditable;

CustomContenteditable.propTypes = { 
	onInput: PropTypes.func, 
	// style: PropTypes.object 
}