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
		mode: "onChange",
		defaultValues: {
			time: "00:00:00"
		}
	})
	
	function funcInputDate(e, field){
		
		const value = e.target.value;
			
		setValue("date", value);
		
	}
	
	function clickInsertAttachment(e){
		e.currentTarget.querySelector('input').click()
	}
	
	console.log(watch())
	console.log(isValid)
	
	return (
		<div className={style.formContainer}>
			<div className={style.header}>
				<div className={style.about}>
					<div className={style.icon}>
						<FontAwesomeIcon icon={["far","file-lines"]} />
					</div>
					<span>Tugas</span>
				</div>
				<div className={`${style.submit} ${!isValid? style.disabled: ""}`}>Tugaskan</div>
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
									onClick={()=>{
										/*setAttachment(attachment=>{
											return attachment.filter((e,index)=>{
												return index !== i
											})
										})*/
									}} 
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
			</form>
		</div>
	)
})

AssignmentForm.propTypes = {
	display: PropTypes.func,
	displayMatters: PropTypes.func
}

export default AssignmentForm;