import { useEffect, useRef, memo } from 'react';
import style from './ExamForm.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'

//components
import Image from '../Image'

//apis
import * as examApi from '../../api/exam';
//utils
import formatDate from '../../utils/id-format-date';

 const ExamForm = memo(function ({ refreshExam, codeClass, display }){
	 
	const customInput = useRef(null)
	const { reset, register, setValue, watch, handleSubmit, resetField, formState: { isValid, isSubmitSuccessful} } = useForm({
		mode: "onChange",
		defaultValues: {
			schedule: {
				time : '00:00:00'
			},
			duration: {
				time : '00:00:00'
			}
		}
	})
	
	useEffect(()=>{
		
		reset()
		customInput.current.textContent = ""
		
	},[reset, display, isSubmitSuccessful])
	
	async function submit(input){
		const payload = input;
		payload.schedule = payload.schedule.date+ " " + payload.schedule.time
		
		if(payload.duration.date.length){
			
			const date = (new Date(payload.duration.date+" "+payload.duration.time)).getTime()
			
			payload.duration = date - (new Date(payload.schedule)).getTime()
			
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
	
	function clickInsertAttachment(e){
		e.currentTarget.querySelector('input').click()
	}
	
	function tugaskan(e){
		if(!isValid) return;
		const btn = e.currentTarget.parentElement.parentElement.querySelector('[type="submit"]')
		btn.click();
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
				<div onClick={tugaskan} className={`${style.submit} ${!isValid? style.disabled: ""}`}>Buat</div>
			</div>
			<form onSubmit={handleSubmit(submit)} >
				<div className={style.formSection1}>
					
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
						<h4>Jadwal</h4>
						<div className={style.inputDate}>
							<div className={`${style.setOption} setOption`}>
								<p>
								{
									watch('schedule.date')?
									formatDate(
										watch('schedule.date')+" "+watch('schedule.time'),
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
											{ watch('schedule.date') && watch('schedule.date').length ? formatDate(watch('schedule.date'),"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
										</div>
										<input 
											type="date" 
											{...register('schedule.date',{ required: true})} 
										/>
									</div>
									<div className={`${style.time} ${watch('schedule.date') && watch('schedule.date').length? "": style.hidden}`}>
										<FontAwesomeIcon icon={['far','clock']} />
										<div className={style.content} >
											{ watch('schedule.date') && watch('schedule.date').length ? formatDate(watch('schedule.date')+" "+watch('schedule.time'),"id-ID", {timeStyle:"short"}) : ""}
										</div>
										<input type="time" {...register('schedule.time')} />
									</div>
								</div>
							</div>
							
						</div>
					</div>
					
					<div className={`${style.inputDateContainer} ${style.inputMargin}`}>
						<h4>Tenggat</h4>
						<div className={style.inputDate}>
						
							<div className={`${style.setOption} setOption`}>
								<p>
								{
									watch('duration.date')?
									formatDate(
										watch('duration.date')+" "+watch('duration.time'),
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
											{ watch('duration.date') && watch('duration.date').length ? formatDate(watch('duration.date'),"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
										</div>
										<input type="date" {...register('duration.date')} />
									</div>
									<div className={`${style.time} ${watch('duration.date') && watch('duration.date').length? "": style.hidden}`}>
										<FontAwesomeIcon icon={['far','clock']} />
										<div className={style.content} >
											{ watch('duration.date') && watch('duration.date').length ? formatDate(watch('duration.date')+" "+watch('duration.time'),"id-ID", {timeStyle:"short"}) : ""}
										</div>
										<input type="time" {...register('duration.time')} />
									</div>
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
				
				<div className={style.formSection2}>
					<h4>Lampiran</h4>
					{
						watch('attachment')?.["0"]?
							<div className={style.fileUpload}>
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
								type="file" {...register('attachment')} 
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