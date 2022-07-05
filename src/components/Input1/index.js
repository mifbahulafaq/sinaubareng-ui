import React from 'react';
import style from './Input1.module.css';

export default React.forwardRef((props, ref)=>{
	return <input className={style.input} ref={ref} {...props} />
})