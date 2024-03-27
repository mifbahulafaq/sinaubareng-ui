import React from 'react';
import style from './CustomCaption.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDayPicker } from 'react-day-picker';
import { format } from 'date-fns';

import formatDate from '../../utils/id-format-date'

export default function CustomCaption(props){
	
	const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const { selected } = useDayPicker();
	const [ rangeOfDays, setRangeOfDays ] = React.useState([null, null]);
	
	React.useEffect(()=>{
		
		const currentDate = selected? new Date(selected): new Date();
		const currentMonth =currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		const nextMonth = new Date(currentYear, currentMonth + 1);
		
		//set the date to get last day
		 nextMonth.setDate( nextMonth.getDate() - 1);
		 
		// get numb of days
		const numOfDaysOfThisMonth = nextMonth.getDate();
		
		//make range of days
		const startOfDate = Math.max(currentDate.getDate() - days.indexOf(format(currentDate, 'EEEEEE')), 1);
		const endOfDate = Math.min(currentDate.getDate() + (days.length - (days.indexOf(format(currentDate, 'EEEEEE')) + 1)), numOfDaysOfThisMonth);
		
		if(startOfDate === endOfDate){
			setRangeOfDays([ startOfDate ])
		}else{
			setRangeOfDays([ startOfDate, endOfDate])
		}
		
	}, [selected])
	
	return <div className={style.wrapper} >
		<p>{rangeOfDays.join('-')} {formatDate(selected || new Date(), "id-ID",{month: "short", year: 'numeric'})}</p>
	</div>
}