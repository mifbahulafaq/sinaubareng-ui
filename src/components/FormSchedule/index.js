import React from 'react';
import style from './FormSchedule.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import days from '../../utils/days'
import PropTypes from 'prop-types'

//get key by the value
function getKey(obj, value){
	
	for(const key in obj){
		if(obj[key] === value) return key;
	}
	
}

function FormSchedule({ 
		fontSize,
		register, 
		unregister,
		day,
		time,
		setValue, 
		iSchedule,  
		clearErrors,
		setError,
		error
	}){
		
	day = day || "";
	time = time || "";
	const schedules = { day, time };
	
	//schedule registration
	register(`schedules.${iSchedule}.time`);
	register(`schedules.${iSchedule}.day`);
	
	function setScheduleValue(value, index, name){
		
		//set schedule value
		setValue(`schedules.${index}.${name}`,value, { shouldValidate: true });
	}
	
	function removeSchedule(){
		
		clearErrors(`schedules2.${iSchedule}`);
		unregister(`schedules.${iSchedule}`)
	}
	
	//set and clear error
	React.useEffect(()=>{
		
		if(Boolean(day) == Boolean(time)){
			
			if(error){
				clearErrors(`schedules2.${iSchedule}`);
			}
			
		}else{
			
			const key = getKey(schedules, day && time);
			
			setError(`schedules2.${iSchedule}.${key}`, {type: 'required', message: 'required'});
			
		}
		
	}, [day, time])
	
	return <div className={style.container}>
									
				<div className={`toggle ${style.input} ${style.dropdown} setOption`}>
				
					<span className={style.value}>{day||'Pilih hari'}</span>
				
				</div>
				{
				<input 
					type="time" 
					className={style.input}
					value={time || ''}
					onChange={e=>{
						setScheduleValue(e.target.value, iSchedule, 'time')
					}}
				/>
				}
				{
				// <input 
					// type="time" 
					// className={style.input}
					// {...register(`schedules.${iSchedule}.time`)}
				// />
				}
									
				<FontAwesomeIcon onClick={removeSchedule} className={style.removeTime} icon="xmark" />
									
				<ul className={`${style.select} option`}>
					<li
						className={day===''?style.active:''} 
						onClick={(e)=>setScheduleValue(e.currentTarget.textContent, iSchedule, 'day')}
						>
						{""}
					</li>
					{
						days.map((e,i)=>{
							return <li key={i} 
							className={day===e?style.active:''} 
							onClick={(e)=>setScheduleValue(e.currentTarget.textContent, iSchedule, 'day')}
							>
								{e}
							</li>
						})
					}
				</ul>
									
			</div>
}

export default React.memo(FormSchedule) 

FormSchedule.propType = {
	fontSize: PropTypes.string
}
FormSchedule.defaultProps = {
	fontSize: "500px"
}