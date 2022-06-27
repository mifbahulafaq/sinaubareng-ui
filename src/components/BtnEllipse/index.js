import React from 'react';
import style from './BtnEllipse.module.css';

export default function BtnEllipse({ bgColor, height, width, text}){
	
	const inlineStyle = {
		backgroundColor: bgColor,
		height,
		width
	}
	
	return <div style={inlineStyle} className={style.container}>{text}</div>
}

BtnEllipse.defaultProps = {
	height: '10px',
	width: '100px'
}