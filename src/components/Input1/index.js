import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Input1.module.css';
import PropTypes from 'prop-types';

const Input1 =  React.forwardRef(({error, ...rest}, ref)=>{
	return (
		<div className={style.container}>
			<input ref={ref} {...rest} />
			{error?<FontAwesomeIcon icon='circle-exclamation'/>:''}
		</div>
	)
})

Input1.defaultProps = {
	error: false
}
Input1.propTypes = {
	error: PropTypes.bool
}

export default Input1;