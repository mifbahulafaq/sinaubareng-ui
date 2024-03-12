import { useEffect, useRef, memo,useMemo } from 'react';
import style from './ExamForm.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import * as val from '../../validation';

//components
import Image from '../Image';
import InputDate from '../InputDate';

//apis
import * as examApi from '../../api/exam';

 const ExamForm = memo(function ({ refreshExam, codeClass, display, setDisplay }){
	 
	const inputDateStyling = {width: "100%", margin: "0.625rem 0 0", fontSize: "0.875rem"};
	const customInput = useRef(null);
	const defaultValues = useMemo(()=>{
		return {
		schedule: {
			date: "",
			time : '00:00'
		},
		duration: {
			date: "",
			time : '00:00'
		}
	}
	}, [])
	
	const { reset, register, setValue, watch, handleSubmit, setError, resetField, formState } = useForm({
		mode: "onChange",
		defaultValues
	})
	const { isValid, isSubmitSuccessful, errors, isSubmitting} = formState
	
	useEffect(()=>{
		
		reset(defaultValues)
		customInput.current.innerText = ""
		
	},[reset, display, isSubmitSuccessful, defaultValues])
	
	async function submit(input){
		const payload = input;
		payload.schedule = payload.schedule.date+ " " + payload.schedule.time;
		
		if(payload?.duration?.date.length){
			
			const fullScheduleDate = new Date(payload.schedule)
			const fullDurationDate = new Date(payload.duration.date+" "+payload.duration.time)
			
			if(fullDurationDate <= fullScheduleDate){
				delete payload.duration
			}else{
				payload.duration = fullDurationDate.getTime() - fullScheduleDate.getTime()
			}
			
		}else{
			delete payload.duration
		}
		
		payload.code_class = codeClass
		payload.attachment = payload.attachment?.["0"]
		
		let formData = new FormData()
		
		for(let key in payload){
			formData.append(key, payload[key])
		}
		
		const { data } = await examApi.add(formData)
		
		if(data.error) return console.log(data)
		refreshExam()
	}
	
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
		
		if(errors.attachment || isSubmitting || !isValid) return;
		
		const btn = document.querySelector('.'+style.formContainer).querySelector('[type="submit"]');
		
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
					<div onClick={tugaskan} className={`${style.submit} ${errors.attachment || !isValid || isSubmitting? style.disabled: ""}`}>Buat</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(submit)} >
				<div className={style.formSection1}>
					
					<div className={style.customInputContainer}>
						<input style={{display: "none"}} {...register('text')} />
						<div 
							ref={customInput}
							onInput={e=>setValue('text', e.currentTarget.innerText)}
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
							dateRegistration={register( 'schedule.date', { ...val.dateNoTimezone, onChange: funcInputDate })}
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
							dateRegistration={register( 'duration.date')}
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
						watch('attachment')?.["0"]?
							<div className={`${style.fileUpload} ${errors.attachment?style.error:""}`}>
								<div className={style.icon}>
									<div className={style.img}>
										<Image src="images/attachment.png" />
									</div>
								</div>
								<div className={style.fileName}>{watch('attachment')?.["0"]?.name}</div>
								<div 
									onClick={()=>resetField('attachment')} 
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
								type="file" {...register('attachment', { onChange: validateFile })} 
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
	 refreshExam: PropTypes.func, 
	 codeClass: PropTypes.number
}

export default ExamForm;