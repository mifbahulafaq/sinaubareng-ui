import React from 'react';
import style from './CustomMonths.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDayPicker, useNavigation } from 'react-day-picker';
import { format } from 'date-fns';

export default function CustomMonths({ children }){
	
	const { selected, onDayClick } = useDayPicker();
	const { goToMonth, nextMonth, previousMonth } = useNavigation();
	
	
	
	function nextDate(){
		
		let selectedDate = selected? new Date(selected): new Date(format(new Date(), 'MM/dd/yyyy'));
		
		//set selectedDate to be a start date of next month
		const startDateOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
		
		//get the last date
		startDateOfNextMonth.setDate( startDateOfNextMonth.getDate() - 1);
		const lastDate = startDateOfNextMonth;
		
		if(selectedDate.getTime() == lastDate.getTime()) goToMonth(nextMonth);
		
		// set a date selection
		selectedDate.setDate(selectedDate.getDate() + 1);
		onDayClick(selectedDate);
	}
	
	function previousDate(){
		
		let selectedDate = selected? new Date(selected): new Date(format(new Date(), 'MM/dd/yyyy'));
		
		//get the start date
		const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth());
		
		if(selectedDate.getTime() == startDate.getTime()) goToMonth(previousMonth);
		
		// set a date selection
		selectedDate.setDate(selectedDate.getDate() + -1);
		onDayClick(selectedDate);
	}
	
	const prevDayEl = <div onClick={()=>previousDate()} className={style.previousDay}>
		<FontAwesomeIcon icon="angle-left" />
	</div>
	const nextDayEl = <div onClick={()=>nextDate()} className={style.nextDay}>
		<FontAwesomeIcon icon="angle-left" />
	</div>
	
	return <>
		{
			children.map((month, i)=>{
				return <div key={i} className={style.monthWrapper} >
					{prevDayEl}
					{month}
					{nextDayEl}
				</div>
			})
		}
	</>
}

// InputDate.propTypes = {
	// margin: PropTypes.string,
	// fontSize: PropTypes.string,
	// initialText:PropTypes.string,
	// width: PropTypes.string,
	// minDate: PropTypes.string,
	// dateInput: PropTypes.string,
	// timeInput: PropTypes.string,
	// dateRegistration: PropTypes.object.isRequired,
	// timeRegistration: PropTypes.object.isRequired,
	// active: PropTypes.bool,
// }
// InputDate.defaultProps = {
	// margin: "0",
	// fontSize: "1rem",
	// initialText: "-",
	// width: "100%",
	// minDate: "",
	// active: PropTypes.bool,
// }