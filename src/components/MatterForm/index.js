import { useState, useRef, useEffect, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom'
import style from './MatterForm.module.css';
import { useForm, useFieldArray } from 'react-hook-form';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
//components
import Image from '../Image'
//apis
import * as apiMatter from '../../api/matter';
//utils
import formatDate from '../../utils/id-format-date';
import days from '../../utils/days';

 const MatterForm = memo(function ({displayMatters, display, codeClass}){
	 
	const customInput = useRef(null);
	const defaultValues = {
		code_class: codeClass,
		status: "active",
		schedule: {
			date: "",
			time : '00:00:00'
		},
		duration: {
			date:"",
			time : '00:00:00'
		}
	}
	const { reset, control, setValue, watch, register, setError, handleSubmit, formState, getValues } = useForm({
		mode: "onChange",
		defaultValues
	});
	const { update, remove } = useFieldArray({ control, name: 'attachment' })
	const { isSubmitSuccessful, isValid, isSubmitted, isSubmitting, errors } = formState
	const errorAttachment = errors.attachment?.length
	const { state: locState } = useLocation()
	const [ inputSchedule, setInputSchedule ] = useState(null)
	
	useEffect(()=>{
		
		if(!locState?.schedule) return
		
		setInputSchedule(new Date(locState.schedule))
		
	},[locState])
	//Reset Form
	useEffect(()=>{
		reset(defaultValues)
		customInput.current.innerText = ""
		
	},[isSubmitSuccessful, display, reset])
	
	useEffect(()=>{
		
		register("attachment", { value: undefined}) 
		
	},[register])
	
	async function submit(input){
		
		if(inputSchedule){
			input.schedule = formatDate(inputSchedule, "sv-SE")
		}else{
			input.schedule = input.schedule.date + " " + input.schedule.time;
		}
		
		if(!input.description.length) delete input.description;
		
		if(input.duration?.date?.length){
			
			const fullScheduleDate = new Date(input.schedule)
			const fullDurationDate = new Date(input.duration.date+" "+input.duration.time)
			
			if(fullDurationDate <= fullScheduleDate){
				delete input.duration
			}else{
				input.duration = fullDurationDate.getTime() - fullScheduleDate.getTime()
			}
			
		}else{
			delete input.duration;
		}
		
		let payload = new FormData();
		
		for(let key in input){
			
			if(key === 'attachment'){
				
				input.attachment.forEach(e=>{
					payload.append('attachment',e)
				})
				
			}else{
				payload.append(key, input[key]);
			}
		}
		
		try{
			
			const { data } = await apiMatter.add(payload);
			
			if(data.error){
				
				if(data.field){
					
					const key = Object.keys(data.field)[0];
					setError(key, {type: "manual"});
					return;
					
				}
				
				setError('adding', {type:'manual'});
				return;
				
			}
			
			displayMatters()
			display(false)
			
		}catch(err){
			console.log(err)
		}
	}
	
	function inputDesc(e){
		setValue('description', e.currentTarget.innerText, { shouldValidate: true})
	}
	function funcInputDate(e, field){
		
		const value = e.target.value;
		
		if(!value.length) {
			setValue("schedule.time", "00:00", {shouldValidate: true});
			setValue("duration", {time:"00:00"}, {shouldValidate: true});
		}
		
	}
	function funcInputDate2(e){
		
		const value = e.target.value;
		
		if(!value.length) setValue("duration.time", "00:00", {shouldValidate: true});
		
	}
	function setFile(e){
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(!getValues('attachment')){
					
					if(e.target.files[key].size > 10000000 ) setError("attachment.0", {type: "size", message: "File too large"})
					update(0, e.target.files[key])
					
				}else{
					
					if(e.target.files[key].size > 10000000 ) setError("attachment."+getValues("attachment").length, {type: "size", message: "File too large"})
					update(getValues("attachment").length, e.target.files[key])
					
				}
			}
		}
		
		e.target.value = null;
	}
	
	const dateOfSchedule = watch("schedule.date");
	const timeOfSchedule = watch("schedule.time");
	const dateOfDuration = watch("duration.date");
	const timeOfDuration = watch("duration.time");
	
	return (
		<form className={style.container} onSubmit={handleSubmit(submit)} >
			<input className={style.input} maxLength={255} placeholder="Judul" {...register('name', val.name)} />
			<div className={style.input} >
				<input type="text" style={{display:"none"}} {...register('description', val.description2)} />
				<div 
					maxLength={5} 
					onPaste={e=>e.preventDefault()}
					ref={customInput}
					onKeyPress={e=>{
						if(e.target.textContent.length >= 255) e.preventDefault();
					}}
					onInput={inputDesc} 
					contentEditable="true" 
				/>
				<span>Deskripsi (optional)</span>
			</div>
					
			<div className={style.inputDateContainer}>
				<h4>Jadwal</h4>
				
				{
					inputSchedule?
					<div className={style.dateOfLink}>
						<p className={style.dateOfLinkText}>
							{
								formatDate(
									inputSchedule,
									"id-ID",
									{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"}
								)
							}
						</p>
						<div onClick={()=>setInputSchedule(null)} className={style.cancel}>
							<FontAwesomeIcon icon="plus" />
						</div>
					</div>
					:
					<div className={style.inputDate}>
						<div className={`${style.setOption} setOption`}>
							<span className={style.value} >
								{
									dateOfSchedule?
									formatDate(
										dateOfSchedule+" "+timeOfSchedule,
										"id-ID",
										{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"}
									)
									:
									"Tidak ada jadwal"
								}
							</span>
						</div>
						
						<div onClick={e=>e.stopPropagation()} className={`${style.opt} option`}>
							<div className={style.desc} > Tanggal & Waktu</div>
							<div className={style.formOpt}>
								<div className={style.date}>
									<FontAwesomeIcon icon={['far','calendar-alt']} />
									<div className={style.content} >
										{ dateOfSchedule && dateOfSchedule.length ? formatDate(dateOfSchedule,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
									</div>
									<input 
										type="date"
										{
											...register( 'schedule.date', { ...val.dateNoTimezone, onChange: funcInputDate } )
										} 
									/>
									
								</div>
								<div className={`${style.time} ${dateOfSchedule && dateOfSchedule.length?"":style.hidden}`}>
									<FontAwesomeIcon icon={['far','clock']} />
									<div className={style.content} >
										{ timeOfSchedule && timeOfSchedule.length ? formatDate(dateOfSchedule+" "+timeOfSchedule,"id-ID", {timeStyle:"short"}) : ""}
									</div>
									<input type="time" {...register('schedule.time', val.timeNoTimezone)} />
								</div>
							</div>
						</div>
						
					</div>
				}
			</div>
			
			<div className={style.inputDateContainer}>
				<h4>Berakhir pada: </h4>
				<div className={style.inputDate}>
					<div className={`${style.setOption} ${dateOfSchedule || inputSchedule  ?"":style.disabled} setOption`}>
						<span className={style.value} >
							{
								dateOfDuration?
								formatDate(
									dateOfDuration+" "+timeOfDuration,
									"id-ID",
									{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"}
								)
								:
								"-"
							}
						</span>
					</div>
					<div onClick={e=>e.stopPropagation()} className={`${style.opt} ${dateOfSchedule  || inputSchedule ?"option":""}`}>
						<div className={style.desc} > Tanggal & Waktu</div>
						<div className={style.formOpt}>
							<div className={style.date}>
								<FontAwesomeIcon icon={['far','calendar-alt']} />
								<div className={style.content} >
									{ dateOfDuration && dateOfDuration.length ? formatDate(dateOfDuration,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
								</div>
								<input 
									type="date"
									{...register('duration.date', { onChange: funcInputDate2 }) } 
								/>
							</div>
							<div className={`${style.time} ${dateOfDuration && dateOfDuration.length?"":style.hidden}`}>
								<FontAwesomeIcon icon={['far','clock']} />
								<div className={style.content} >
									{ timeOfDuration && timeOfDuration.length ? formatDate(dateOfDuration+" "+timeOfDuration,"id-ID", {timeStyle:"short"}) : ""}
								</div>
								<input  type="time" {...register('duration.time') } />
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
			{
				watch("attachment")?.map((e,i)=>{
					return <div key={i} className={`${style.fileUpload} ${errors.attachment?.[i]?style.error:""}`}>
							<div className={style.icon}>
								<div className={style.img}>
									<Image src="images/attachment.png" />
								</div>
							</div>
							<div className={style.fileName}>{e.name}</div>
							<div 
								onClick={()=>remove(i)} 
								className={style.removeFile}
							>
								<FontAwesomeIcon icon="plus" />
							</div>
					</div>
				})
			}
			
			<div className={style.inputFile} >
				<div className={style.icon} >
					<FontAwesomeIcon icon='arrow-up-from-bracket' />
					<span>Upload</span>
				</div>
				
				<input 
					type="file"
					onChange={setFile}
					accept=".pdf,.docx,.doc,.PDF,.DOCX,.DOC" 
					multiple 
				/>
			</div>
			<p className={style.fileInfo}>*Ukuran file tidak lebih dari 10MB</p>
			<button 
				type="submit" 
				disabled={errorAttachment || isSubmitting || !isValid} 
				className={style.btn}
			>Tugaskan</button>
			
		</form>
	)
})

MatterForm.propTypes = {
	display: PropTypes.func,
	displayMatters: PropTypes.func
}

export default MatterForm;