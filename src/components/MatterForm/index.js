import { useRef, useEffect } from 'react';
import style from './MatterForm.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
//components
import Image from '../Image'
import InputDate from '../InputDate'

 const MatterForm = function ({
	fetchMatters, 
	setDisplay, 
	display,
	defaultValues, 
	useForm, 
	disabledSubmit,
	submit
}){
	 
	const descField = useRef(null);
	
	const { reset, setValue, watch, register, setError, clearErrors, handleSubmit, formState, getValues } = useForm;
	const { isSubmitSuccessful, errors } = formState;
	
	const dateOfSchedule = watch("schedule.date");
	const timeOfSchedule = watch("schedule.time");
	const inputDateStyling = {width: "350px", margin: "10px 0 0", fontSize: "0.875rem"};
	
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
		
		//set time of the schedule
		if(value.length) {
			
			customSetValue("schedule.time", defaultScheduleTime);
			
		}else{
			customSetValue("schedule.time", "00:00:00");
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
					</div>	
					<div className={style.inputDateContainer}>
						<h4>Jadwal</h4>
						<InputDate 
							{...inputDateStyling}
							minDate={
								defaultValues.schedule.date
								|| 
								(new Date()).toLocaleString('en-CA',{dateStyle: 'short'})
							}
							initialText="Tidak ada jadwal"
							dateInput={dateOfSchedule} 
							timeInput={timeOfSchedule}
							dateRegistration={register( 'schedule.date', { ...val.dateNoTimezone, onChange: funcInputDate })}
							timeRegistration={register('schedule.time', { ...val.timeNoTimezone })} 
							active={true}
						/>
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