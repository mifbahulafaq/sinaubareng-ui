import React from 'react';
import style from './CustomHeadRow.module.css';
import { useDayPicker, HeadRow } from 'react-day-picker';
import { format } from 'date-fns';

export default function CustomHeadRow(){
	
	const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const { selected } = useDayPicker();
	const selected2 = React.useMemo(()=>{
		
		if(selected) return format(selected, 'EEEEEE');
		
	},[selected])
	
	return <tr className={style.wrapper} >
		{
			days.map((e,i)=><th key={i} className={selected2 == e? style.active: ""}>{e}</th>)
		}
	</tr>
	// return <HeadRow />
}