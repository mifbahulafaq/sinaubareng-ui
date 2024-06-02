import React from 'react';
import style from './FormSchedule.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import days from '../../utils/days'
import PropTypes from 'prop-types'

export default function FormSchedule({ 
		fontSize,
		register, 
		unregister, 
		schedule, 
		setValue, 
		iSchedule,  
		clearErrors
	}){
	
	function funcSetDay(e, index){
		setValue(`schedules.${index}.day`,e.currentTarget.textContent, { shouldValidate: true })
	}
	
	function removeSchedule(){
		unregister(`schedules.${iSchedule}`)
	}
	function changeDay(e){
		console.log(e.target.value)
	}
	React.useEffect(()=>{
		if(schedule.day || schedule.time){
			if(!schedule.day) {
				register(`schedules.${iSchedule}.day`, val.day)
			}
			if(!schedule.time) {
				register(`schedules.${iSchedule}.time`, val.time)
			}
		}
		
	}, [register, schedule.day, schedule.time])
	
	React.useEffect(()=>{
		register(`schedules.${iSchedule}.day`)
	}, [register, iSchedule])
	
	return <div className={style.container}>
									
				<div className={`toggle ${style.input} ${style.dropdown} setOption`}>
				
					<span className={style.value}>{schedule.day||'Pilih hari'}</span>
				
				</div>
				<input 
					type="time" 
					className={style.input} 
					{...register(`schedules.${iSchedule}.time`)} 
				/>
									
				<FontAwesomeIcon onClick={removeSchedule} className={style.removeTime} icon="xmark" />
									
				<ul className={`${style.select} option`}>
					{
						days.map((e,i)=>{
							return <li key={i} 
							className={schedule.day===e?style.active:''} 
							onClick={(e)=>funcSetDay(e,iSchedule)}
							>
								{e}
							</li>
						})
					}
				</ul>
									
			</div>
}

FormSchedule.propType = {
	fontSize: PropTypes.string
}
FormSchedule.defaultProps = {
	fontSize: "500px"
}