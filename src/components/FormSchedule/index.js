import React from 'react';
import style from './FormSchedule.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default React.memo(function FormSchedule({ register, schedule, day, schedules, setValue, iSchedule }){
	
	const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
	
	function funcSetDay(e, index){
		setValue(`schedules.${index}.day`,e.currentTarget.textContent, { shouldValidate: true })
	}
	
	function removeSchedule(){
		setValue('schedules',schedules.filter((e,i)=>i!==iSchedule))
	}
	
	return <div className={style.container}>
									
				<div 
					className={`toggle ${style.input2} ${style.dropdown}`}
					onClick={(e)=>{
						e.currentTarget.classList.toggle(style.active);
						e.stopPropagation();
					}}
				>
				
				<span className={style.value}>{schedule.day||'Pilih hari'}</span>
				
				</div>
				<input 
					type="time" 
					className={style.input2} 
					{...register(`schedules.${iSchedule}.time`, val.time)} 
				/>
				<input 
					onChange={()=>console.log('change')}
					type="text"  
					style={{display:'none'}} 
					{...register(`schedules.${iSchedule}.day`, val.day)}
				/>
									
				<FontAwesomeIcon onClick={removeSchedule} className={style.removeTime} icon="xmark" />
									
				<ul style={{top:`${(iSchedule+1)*40}px`}} className={style.select}>
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
})