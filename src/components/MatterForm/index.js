import { useEffect, useCallback, Fragment } from 'react';
import style from './MatterForm.module.css';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import ContentEditable from 'react-contenteditable';
//components
import InputDate from '../InputDate';
import FormFile from '../FormFile';
// import Contenteditable from '../Contenteditable'

 const MatterForm = function ({
	setDisplay, 
	display,
	defaultValues, 
	useForm, 
	disabledSubmit,
	submit
}){
	
	const { reset, setValue, watch, register, setError, clearErrors, handleSubmit, formState, getValues } = useForm;
	const { isSubmitSuccessful, errors } = formState;
	
	const dateOfSchedule = watch("schedule.date");
	const timeOfSchedule = watch("schedule.time");
	const inputDateStyling = {width: "100%", margin: "10px 0 0", fontSize: "0.875rem"};
	
	//Reset Form
	useEffect(()=>{
		reset(defaultValues)
		
	},[isSubmitSuccessful, display, reset, defaultValues])
	
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
	
	const inputDesc = useCallback(e=>{
		
		const config = {
			allowedTags: ['b', 'i', 'a', 'p'],
			allowedAttributes: { a: ["href"] }
		};
		
		///255 chars validation
		const [ ...arrValue ] = e.currentTarget.innerText;
		const value = (arrValue.filter((e,i)=>i<255)).join('');
		
		setValue(
			'description', 
			sanitizeHtml(value, config), 
			{ 
				shouldValidate: true,
				shouldDirty: true,
			}
		);
		
	}, [setValue])
	
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
						<ContentEditable
							className={style.contentEditable}
							html={watch('description')}
							onChange={inputDesc} 
						/>
						<span className={style.placeholder} >Deskripsi (optional)</span>
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
							return  <div key={i} className={style.uploadedFile}>
								<FormFile 
									error={errors.attachment?.[i]}
									data={e}
									removeFile={()=>removeFile(i)}
								/>
							</div>
						})
					}
					
					<div className={style.inputFile} >
						<div className={style.icon} >
							<FontAwesomeIcon icon='arrow-up-from-bracket' />
							<span className={style.textBtn}>Upload</span>
						</div>
						{
							//no register. needed to make easier in managing such as removing and adding files
						}
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