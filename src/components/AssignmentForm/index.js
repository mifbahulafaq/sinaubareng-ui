import { useRef, memo, useEffect } from 'react';
import style from './AssignmentForm.module.css';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'

//components
import Image from '../Image'

//apis
import * as mattAssApi from '../../api/matt-ass';
//utils
import formatDate from '../../utils/id-format-date';

 const AssignmentForm = memo(function ({ refreshAssignment, idMatter, displayModal }){
	 
	const customInput = useRef(null)
	const { reset, register, setValue, watch, handleSubmit, resetField, formState, setError} = useForm({
		mode: "onChange",
		defaultValues: {
			time: "00:00:00"
		}
	})
	const { errors, isValid, isSubmitted, isSubmitting, isSubmitSuccessful } = formState
	
	useEffect(()=>{
		reset()
		customInput.current.textContent = ""
	}, [displayModal, isSubmitSuccessful, reset])
	
	async function submit(input){
		
		const payload = input;
		
		if(payload.date.length){
			
			const date = (new Date(payload.date+" "+payload.time)).getTime()
			
			payload.duration = date - Date.now()
			
		}
		
		delete payload.date
		delete payload.time
		payload.id_matt = idMatter
		payload.attachment = payload.attachment?.["0"]
		
		let formData = new FormData()
		
		for(let key in payload){
			formData.append(key, payload[key])
		}
		
		const { data } = await mattAssApi.add(formData)
		
		if(data.error) return console.log(data)
		
		refreshAssignment()
		
	}
	
	function clickInsertAttachment(e){
		e.currentTarget.querySelector('input').click()
	}
	
	function tugaskan(e){
		if(errors.attachment || isSubmitting || !isValid) return;
		const btn = e.currentTarget.parentElement.parentElement.querySelector('[type="submit"]')
		btn.click();
	}
	function validateFile(e){
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 10000000 ) setError("attachment", {type: "size", message: "File too large"})
			}
		}
	}
	
	return (
		<div className={style.formContainer}>
			<div className={style.header}>
				<div className={style.about}>
					<div className={style.icon}>
						<FontAwesomeIcon icon={["far","file-lines"]} />
					</div>
					<span>Tugas</span>
				</div>
				<div onClick={tugaskan} className={`${style.submit} ${errors.attachment || isSubmitting || !isValid? style.disabled: ""}`}>Tugaskan</div>
			</div>
			<form onSubmit={handleSubmit(submit)} >
				<div className={style.formSection1}>
				
					<input className={`${style.inputMargin} ${style.text}`} maxLength={255} placeholder="Judul" {...register('title', val.title)}/>
					
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
							
							<div className={`${style.setOption} setOption`}>
								<p>
								{
									watch('date')?
									formatDate(
										watch('date')+" "+watch('time'),
										"id-ID",
										{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"}
									)
									:
									"-"
								}
								</p>
								<div className={style.triangle} />
							</div>
							
							<div onClick={e=>e.stopPropagation()} className={`${style.selectContainer} option`}>
								<div className={style.desc} > Tanggal & Waktu</div>
								<div className={style.formOpt}>
									<div className={style.date}>
										<FontAwesomeIcon icon={['far','calendar-alt']} />
										<div className={style.content} >
											{ watch('date') && watch('date').length ? formatDate(watch('date'),"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
										</div>
										<input type="date" {...register('date')} />
									</div>
									<div className={`${style.time} ${watch('date') && watch('date').length? "": style.hidden}`}>
										<FontAwesomeIcon icon={['far','clock']} />
										<div className={style.content} >
											{ watch('date') && watch('date').length ? formatDate(watch('date')+" "+watch('time'),"id-ID", {timeStyle:"short"}) : ""}
										</div>
										<input type="time" {...register('time')} />
									</div>
								</div>
							</div>
							
						</div>
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

AssignmentForm.propTypes = {
	 refreshAssignment: PropTypes.func, 
	 idMatter: PropTypes.number
}

export default AssignmentForm;