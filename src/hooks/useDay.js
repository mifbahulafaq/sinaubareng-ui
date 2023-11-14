import React from 'react';

//this hook is to get the index of ["Kemarin", "Hari ini", "Besok"]
export default function useDay(tempSchedule){

	return React.useMemo(()=>{
		
		if(!tempSchedule) return null
		
		//theDate
		const fullSchedule = new Date(tempSchedule)
		const date = fullSchedule.getDate()
		const month = fullSchedule.getMonth()
		const year = fullSchedule.getFullYear()
		
		//current date
		const currentFullDate = new Date()
		const currentDate = currentFullDate.getDate()
		const currentMonth = currentFullDate.getMonth()
		const currentYear = currentFullDate.getFullYear()
		
		if(month !== currentMonth && year !== currentYear) return -1
		
		const calculatDate = date - currentDate
		
		if(calculatDate < 2 && calculatDate > -1) return calculatDate + 1
		return -1
		
	},[tempSchedule])
	
}