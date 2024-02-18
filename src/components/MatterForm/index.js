import { useRef, useEffect } from 'react';
import style from './MatterForm.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
//components
import Image from '../Image'
import InputDate from '../InputDate'
//utils
import formatDate from '../../utils/id-format-date';

 const MatterForm = function ({
	fetchMatters, 
	setDisplay, 
	display,
	defaultValues, 
	useForm, 
	inputSchedule,
	setInputSchedule,
	disabledSubmit,
	submit
}){
	 
	const descField = useRef(null);
	
	const { reset, setValue, watch, register, setError, clearErrors, handleSubmit, formState, getValues } = useForm;
	const { isSubmitSuccessful, errors } = formState;
	
	const dateOfSchedule = watch("schedule.date");
	const timeOfSchedule = watch("schedule.time");
	const dateOfDuration = watch("duration.date");
	const timeOfDuration = watch("duration.time");
	
	//Reset Form
	useEffect(()=>{
		
		descField.current.innerText = defaultValues.description || ""
		
	},[defaultValues.description, descField])
	useEffect(()=>{
		reset(defaultValues)
		
	},[isSubmitSuccessful, setDisplay, reset, defaultValues])
	
	useEffect(()=>{
		register('description', val.description2) 
		
	},[register])
	
	const customSetValue = function(field, value){

		setValue(
			field, 
			value,
			{ 
				shouldValidate: true,
				shouldDirty: true,
			}
		)
		
	}
	
	function inputDesc(e){
		customSetValue( 'description', e.currentTarget.innerText)
	}
	
	function funcInputDate(e){
		
		const value = e.target.value;
		
		const defaultScheduleTime = (new Date()).toLocaleString('en-GB',{timeStyle: 'short'});
		
		if(value.length) {
			
			if(getValues('duration.date')) customSetValue("duration.date", value);
			
			customSetValue("schedule.time", defaultScheduleTime);
			
		}else{
			customSetValue("schedule.time", "00:00:00");
			customSetValue("duration", {date: "", time: "00:00:00"});
		}
		
	}

	function funcInputDate2(e){
		
		const value = e.target.value;
		
		let date = formatDate(new Date(),'en-CA',{dateStyle: 'short'});
		date = new Date(date + " " + timeOfSchedule);
		date.setHours(date.getHours() + 1);
		
		if(!value){
			customSetValue( "duration.time", "00:00:00");
		}else{
			customSetValue( "duration.time", formatDate(date,'en-GB',{timeStyle: 'short'}) + ":00");
		}
		
	}
	
	function functionInputTime(e){
	
		const value = e.target.value;
		
		let date = formatDate(new Date(),'en-CA',{dateStyle: 'short'});
		date = new Date(date + " " + value);
		date.setHours(date.getHours() + 1);
		
		if(dateOfDuration){
			customSetValue( "duration.time",formatDate(date,'en-GB',{timeStyle: 'short'}) + ":00");
		}
		
	}
	
	function setFile(e){
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(!getValues('attachment')){
					
					if(e.target.files[key].size > 10000000 ) setError("attachment.0", {type: "size", message: "File too large"})
						
					customSetValue( "attachment.0", e.target.files[key])
					
				}else{
					
					if(e.target.files[key].size > 10000000 ) setError("attachment."+getValues("attachment").length, {type: "size", message: "File too large"})
						
					const i = getValues("attachment").length;
					
					customSetValue(`attachment.${i}`, e.target.files[key])
					
				}
			}
		}
		
		e.target.value = null;
	}
	
	function removeFile(i){
		const left = getValues('attachment').filter((e,index)=>index!==i)
		customSetValue("attachment", left);
											
		if(errors.attachment?.[i]) clearErrors(`attachment.${i}`)
	}
	
	return (
		<div className={`${style.addMatter} ${display?style.open:''}`}>
			<div className={style.header}>
				<div className={style.left}>
					<FontAwesomeIcon icon={['far', 'file-alt']} />
					<h2>Materi</h2>
				</div>
				<div className={style.right}>
					<FontAwesomeIcon onClick={()=>setDisplay(false)} icon="plus" />
				</div>
			</div>
			<div className={style.formContainer}>
				<form className={style.form} onSubmit={handleSubmit(submit)} >
					<input className={style.input} maxLength={255} placeholder="Judul" {...register('name', val.name)} />
					<div className={style.input} >
						<div 
							maxLength={5} 
							onPaste={e=>e.preventDefault()}
							ref={descField}
							onKeyPress={e=>{
								if(e.target.textContent.length >= 255) e.preventDefault();
							}}
							onInput={inputDesc} 
							contentEditable="true" 
						>
						</div>
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
												min={
													defaultValues.schedule.date 
													|| 
													(new Date()).toLocaleString('en-CA',{dateStyle: 'short'})
												}
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
											<input
												type="time" 
												{
													...register('schedule.time', { ...val.timeNoTimezone, onChange: functionInputTime })
												} 
											/>
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
											min={dateOfSchedule}
											type="date"
											{
												...register('duration.date',
												{onChange: funcInputDate2}
												) 
											} 
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
										onClick={()=>removeFile(i)} 
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
						disabled={disabledSubmit} 
						className={style.btn}
					>Tugaskan</button>
					
				</form>
			</div>
		</div>
	)
}

MatterForm.propTypes = {
	setDisplay: PropTypes.func,
	defaultValues: PropTypes.object
}

export default MatterForm;