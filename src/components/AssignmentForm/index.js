import { useState, useRef, useEffect, memo } from 'react';
import style from './AssignmentForm.module.css';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'

//components
import Image from '../Image'

//apis
import * as apiMatter from '../../api/matter';
//utils
import formatDate from '../../utils/id-format-date';

 const AssignmentForm = memo(function ({displayMatters, display}){
	 
	const customInput = useRef(null)
	const { register, setValue, watch, formState: { isSubmitSuccessful, isValid} } = useForm({
		mode: "onChange"
	})
	
	function funcInputDate(e, field){
		
		const value = e.target.value;
		
		if(!value.length) {
			setValue("schedule.time", "00:00", {shouldValidate: true});
		}
			
		setValue("schedule.date", value, {shouldValidate: true});
		
	}
	
	console.log(watch())
	console.log(isValid)
	
	return (
		<div className={style.formContainer}>
			<div className={style.header}>
				<div className={style.icon}>
					<FontAwesomeIcon icon={["far","file-lines"]} />
				</div>
				<span>Tugas</span>
			</div>
			<form>
				<div className={style.formSection1}>
				
					<input className={`${style.inputMargin} ${style.text}`} placeholder="Judul" {...register('title', val.title)}/>
					
					<div className={style.customInputContainer}>
						<input style={{display: "none"}} {...register('text')} />
						<div 
							ref={customInput}
							onInput={e=>setValue('text', e.currentTarget.textContent)}
							contentEditable="true" 
							className={`${style.inputMargin} ${style.text}`} 
						/>
						<p>Isi (Opsional)</p>
					</div>
					
					<div className={`${style.inputDateContainer} ${style.inputMargin}`}>
						<h4>Tenggat</h4>
						<div className={style.inputDate}>
						
							<p>-</p>
							<div className={style.triangle} />
							
							<div onClick={e=>e.stopPropagation()} className={`${style.selectContainer} option`}>
								<div className={style.desc} > Tanggal & Waktu</div>
								<div className={style.formOpt}>
									<div className={style.date}>
										<FontAwesomeIcon icon={['far','calendar-alt']} />
										<div className={style.content} >
											{/* dateOfSchedule && dateOfSchedule.length ? formatDate(dateOfSchedule,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"*/}
										</div>
										<input style={{display:"none"}} {...register('schedule.date')} />
										<input type="date" onChange={funcInputDate}  />
									</div>
									<div className={`${style.time}`}>
										<FontAwesomeIcon icon={['far','clock']} />
										<div className={style.content} >
											{/* timeOfSchedule && timeOfSchedule.length ? formatDate(dateOfSchedule+" "+timeOfSchedule,"id-ID", {timeStyle:"short"}) : ""*/}
										</div>
										<input type="time" {...register('schedule.time')} />
									</div>
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
				<div className={style.formSection2}>
					<input type="file" className={style.inputMargin} />
				</div>
			</form>
		</div>
	)
})

AssignmentForm.propTypes = {
	display: PropTypes.func,
	displayMatters: PropTypes.func
}

export default AssignmentForm;