import React from 'react';
import style from './CustomDay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDayRender, Button } from 'react-day-picker';

export default function CustomDay({ date, displayMonth}){
	
	const buttonRef = React.useRef(null);
	const dayRender = useDayRender(date, displayMonth, buttonRef );
	
	if(!dayRender.isButton || dayRender.activeModifiers.outside) return <div {...dayRender.divProps} />
	
	return <Button ref={buttonRef} {...dayRender.buttonProps} />
}