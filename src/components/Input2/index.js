import React from 'react';
import style from './Input2.module.css';
import PropTypes from 'prop-types';

const Input1 =  React.forwardRef(({error, ...rest}, ref)=>{
	return <input ref={ref} {...rest} className={style.container} />
})

Input1.defaultProps = {
	error: false
}
Input1.propTypes = {
	error: PropTypes.bool
}

export default Input1;