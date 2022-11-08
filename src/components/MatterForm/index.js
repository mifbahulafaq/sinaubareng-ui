import { useState, useRef, useEffect, memo } from 'react';
import style from './MatterForm.module.css';
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

 const MatterForm = memo(function ({displayMatters, display}){
	
	const [attachment, setAttachment] = useState(undefined);
	const customInput = useRef(null);
	const { reset, setValue, watch, register, setError, handleSubmit, formState: { isSubmitSuccessful, isValid } } = useForm({
		mode: "onChange",
		defaultValues: {
			code_class: 119,
			status: "active",
			schedule: {
				time : '00:00:00'
			},
			duration: {
				time : '00:00:00'
			}
		}
	});
	
	async function submit(input){
		
		input.schedule = input.schedule.date + " " + input.schedule.time;
		
		if(attachment) input.attachment = attachment;
		if(!input.description.length) delete input.description;
		
		if(input.duration?.date?.length){
			
			const scheduleTime = new Date(input.schedule);
			const durationTime = new Date(input.duration.date + " " + input.duration.time);
			input.duration = durationTime.getTime() - scheduleTime.getTime();
			
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
			//return console.log(payload.getAll('attachment'))
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
		setValue('description', e.currentTarget.textContent, { shouldValidate: true})
	}
	function funcInputDate(e, field){
		
		const value = e.target.value;
		
		if(!value.length) {
			setValue("schedule.time", "00:00", {shouldValidate: true});
			setValue("duration", {time:"00:00"}, {shouldValidate: true});
		}
			
		setValue("schedule.date", value, {shouldValidate: true});
		
	}
	function funcInputDate2(e){
		
		const value = e.target.value;
		
		if(!value.length) setValue("duration.time", "00:00", {shouldValidate: true});
			
		setValue("duration.date", value, {shouldValidate: true});
		
	}
	function setFile(e){
		let tempFiles = [];
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) tempFiles.push(e.target.files[key]);
		}
		
		if(attachment){
			setAttachment([...attachment, ...tempFiles]);
		}else{
			setAttachment(tempFiles)
		}
		
		e.target.value = null;
	}
	//Reset Form
	useEffect(()=>{
		
		reset()
		customInput.current.textContent = ""
		setAttachment(undefined)
		
	},[isSubmitSuccessful, display, reset])
	
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
					
			<div className={style.inputDate}>
				<h4>Jadwal</h4>
				<div className={`${style.select} select`}>
				
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
					
					<div onClick={e=>e.stopPropagation()} className={`${style.opt} option`}>
						<div className={style.desc} > Tanggal & Waktu</div>
						<div className={style.formOpt}>
							<div className={style.date}>
								<FontAwesomeIcon icon={['far','calendar-alt']} />
								<div className={style.content} >
									{ dateOfSchedule && dateOfSchedule.length ? formatDate(dateOfSchedule,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
								</div>
								<input style={{display:"none"}} {...register('schedule.date', val.dateNoTimezone)} />
								<input type="date" onChange={funcInputDate}  />
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
			</div>
			
			<div className={style.inputDate}>
				<h4>Berakhir pada: </h4>
				<div className={`${style.select} ${dateOfSchedule && dateOfSchedule.length ?"":style.disabled} select`}>
				
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
					
					<div onClick={e=>e.stopPropagation()} className={`${style.opt} ${dateOfSchedule && dateOfSchedule.length ?"option":""}`}>
						<div className={style.desc} > Tanggal & Waktu</div>
						<div className={style.formOpt}>
							<div className={style.date}>
								<FontAwesomeIcon icon={['far','calendar-alt']} />
								<div className={style.content} >
									{ dateOfDuration && dateOfDuration.length ? formatDate(dateOfDuration,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
								</div>
								<input type="date" style={{display:"none"}} {...register('duration.date') } />
								<input type="date" onChange={funcInputDate2} />
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
				attachment?.map((e,i)=>{
					return <div key={i} className={style.fileUpload}>
							<div className={style.icon}>
								<div className={style.img}>
									<Image src="images/attachment.png" />
								</div>
							</div>
							<div className={style.fileName}>{e.name}</div>
							<div 
								onClick={()=>{
									setAttachment(attachment=>{
										return attachment.filter((e,index)=>{
											return index !== i
										})
									})
								}} 
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
			<button type="submit" disabled={!isValid} className={`${style.btn} ${!isValid?style.disabled:""}`}>Tugaskan</button>
			
		</form>
	)
})

MatterForm.propTypes = {
	display: PropTypes.func,
	displayMatters: PropTypes.func
}

export default MatterForm;