import { useEffect, useRef, memo } from 'react';
import style from './ExamForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import * as val from '../../../validation';

//components
import Image from '../../Image';
import InputDate from '../../InputDate';

 const ExamForm = memo(function ({ 
		defaultValues,
		useForm,
		disabledSubmit,
		submit,
		display,
		setDisplay
	}){
		
	const inputDateStyling = {width: "100%", margin: "0.625rem 0 0", fontSize: "0.875rem"};
	const customInput = useRef(null);
	
	const { reset, register, setValue, watch, handleSubmit, setError, formState } = useForm;
	const { isSubmitSuccessful, errors } = formState;
	
	useEffect(()=>{
		reset(defaultValues)
		customInput.current.innerText = defaultValues.text || "";
		
	},[reset, display, isSubmitSuccessful, defaultValues])
	
	useEffect(()=>{
		register('text')
	}, [register])
	
	function validateFile(e){
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 10000000 ) setError("attachment", {type: "size", message: "File too large"})
			}
		}
	}
	
	function clickInsertAttachment(e){
		e.currentTarget.querySelector('input').click()
	}
	
	function tugaskan(e){
		if(disabledSubmit) return;
		
		const btn = e.currentTarget.parentElement.parentElement.parentElement.querySelector('[type="submit"]')
		
		btn.click();
	}
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
	
	return (
		<div className={style.formContainer}>
			<div className={style.header}>
				<div className={style.about}>
					<div className={style.icon}>
						<FontAwesomeIcon icon="clipboard-question" />
					</div>
					<span>Ujian</span>
				</div>
				<div className={style.rightSide}>
					<div className={style.close}>
						<FontAwesomeIcon onClick={()=>setDisplay(false)} icon="plus" />
					</div>
					<div onClick={tugaskan} className={`${style.submit} ${disabledSubmit? style.disabled: ""}`}>
						{defaultValues.schedule.date.length?"Edit": "Buat"}
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(submit)} >
				<div className={style.formSection1}>
					
					<div className={style.customInputContainer}>
						<div 
							ref={customInput}
							onInput={e=>customSetValue('text', e.currentTarget.innerText)}
							contentEditable="true" 
							className={`${style.inputMargin} ${style.text}`} 
						/>
						<p>Isi (Opsional)</p>
					</div>
					
					<div className={`${style.inputDateContainer} ${style.inputMargin}`}>
						<h4>Jadwal</h4>
						<InputDate
							{...inputDateStyling}
							minDate={(new Date()).toLocaleString('en-CA',{dateStyle: 'short'})}
							initialText="Tidak ada jadwal"
							dateInput={watch('schedule.date')} 
							timeInput={watch('schedule.time')}
							dateRegistration={register('schedule.date', { ...val.dateNoTimezone, onChange: funcInputDate })}
							timeRegistration={register('schedule.time', { ...val.timeNoTimezone })} 
							active={true}
						/>
					</div>
					
					<div className={`${style.inputDateContainer} ${style.inputMargin}`}>
						<h4>Tenggat</h4>
						<InputDate
							{...inputDateStyling}
							minDate={watch("schedule.date")}
							initialText="-"
							dateInput={watch('duration.date')} 
							timeInput={watch('duration.time')}
							dateRegistration={register('duration.date')}
							timeRegistration={register('duration.time')} 
							active={Boolean(watch("schedule.date"))}
						/>
					</div>
					
					
				</div>
				
				<div className={style.formSection2}>
					<div className={style.fileInfo}>
						<h4>Lampiran</h4>
						<p>*Ukuran file tidak lebih dari 10MB</p>
					</div>
					{
						watch('attachment')?.[0]?
							<div className={`${style.fileUpload} ${errors.attachment?style.error:""}`}>
								<div className={style.icon}>
									<div className={style.img}>
										<Image src="images/attachment.png" />
									</div>
								</div>
								<div className={style.fileName}>{watch('attachment')?.["0"]?.name}</div>
								<div 
									onClick={()=>customSetValue("attachment", {})} 
									className={style.removeFile}
								>
									<FontAwesomeIcon icon="plus" />
								</div>
							</div>
						:""
					}
					<div className={style.insertAttachment}>
						<div
							onClick={clickInsertAttachment}
							className={style.icon}
						>
							<FontAwesomeIcon icon="arrow-up-from-bracket" />
							<input 
								style={{display: "none"}} 
								type="file" 
								{...register('attachment', { onChange: validateFile })} 
								className={style.inputMargin}
								accept=".pdf,.docx,.doc,.PDF,.DOCX,.DOC"
							/>
						</div>
						<p>Upload</p>
					</div>
					
				</div>
				<button style={{display: "none"}} type="submit" />
			</form>
		</div>
	)
})


ExamForm.propTypes = {
	defaultValues: PropTypes.object,
	useForm:  PropTypes.object,
	disabledSubmit: PropTypes.bool,
	submit: PropTypes.func,
	display: PropTypes.bool,
	setDisplay: PropTypes.func
}

export default ExamForm;