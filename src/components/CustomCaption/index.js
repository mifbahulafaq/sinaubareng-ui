import React from 'react';
import style from './CustomCaption.module.css';
import { useDayRender, Months, useFocusContext } from 'react-day-picker';

export default function CustomCaption(props){
	const { focusDayAfter } = useFocusContext();
	
	React.useEffect(()=>{
		focusDayAfter(new Date)
	}, [])
	
	return <div className={style.wrapper} >
		<p>2-8 Januari 2022</p>
	</div>
}