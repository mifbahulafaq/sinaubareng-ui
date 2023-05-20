import React from 'react';
import style from './CreateClass.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { useContext } from '../../Context';

//components
import FormSchedule from '../FormSchedule';
import FormControl2 from '../FormControl2';
//pages
import ServerError from '../../pages/ServerError'
//APIs
import { createClass } from '../../api/class';
import { insertSchedules } from '../../api/schedule';

//utils 
import reqStatus from '../../utils/req-status';
import days from '../../utils/days'

//hooks
import useRefreshClass from '../../hooks/useRefreshClass';


export default React.memo(function CreateClass({ setModal, modal }){
	
	const [ formClass, setFormClass ] = React.useState(true);
	const { reset, register, unregister, getValues, watch, setValue, setError, clearErrors, handleSubmit, formState } = useForm({
		mode: "onChange",
		defaultValues: {
			color: '#83d0c9'
		}
	});
	const {isValid, errors } = formState
	const errArray = Object.keys(errors);
	const [ formStatus, setFormStatus ] = React.useState(reqStatus.idle);
	const setClasses = useRefreshClass();
	const arrColors = ["#83d0c9",  "#851e3e", "#fe4a49", "#f6cd61", "#009688", "#ee4035",  "#f37736", "#7bc043", "#4b3832", "#854442", "#be9b7b", "#008744", "#f6abb6", "#d62d20", "#ffa700", "#ff3377"]
	
	async function submit(input){
		
		setFormStatus(reqStatus.processing);
		
		let { class_name, description, color, schedules } = input;
		let schedules2 = []
		schedules.forEach(e=>{
			if(e.day) schedules2.push({ day: days.indexOf(e.day) + '', time: e.time+':00+07:00'})
		})
		
		function funcErr(result){
			setFormStatus(reqStatus.error)
			if(result.field){
				const key = Object.keys(result.field)[0];
				setError(key, {type: 'manual', message: result.field[key].msg});
				
			}
		}
		
		try{
			
			const { data : resultClass} = await createClass({class_name, color, description: description || undefined});
			if(resultClass.error){
				funcErr(resultClass)
				return
			}
			
			if(schedules2.length){
				
				const code_class = resultClass.data[0].code_class;
				let schedulePayload = {schedules: schedules2, code_class }
				
				const { data: resultSchedule } = await insertSchedules(schedulePayload);
				if(resultSchedule.error){
					funcErr(resultSchedule)
					return
				}
			}
			
			setFormStatus(reqStatus.success)
			setFormClass(true)
			setClasses();
			setModal(false)
			
		}catch(err){
			
			setFormStatus(reqStatus.error)
		}
	}
	function addSchedule(){
		setValue(`schedules.${getValues('schedules').length}`,{day:'', time: ''})
	}
	
	function navClick(value){
		
		if(errArray.length){
			
			if(errArray.length === 1 && errArray.includes('schedules')) return setFormClass(value) ;
			
			setFormClass(true);
			return ;
			
		}
		
		setFormClass(value)
	}
	
	React.useEffect(()=>{
		reset()
	}, [modal])
	
	React.useEffect(()=>{
		
		if(formClass === false && errArray.length){
			
			if(errArray.length === 1 && errArray.includes('schedules')) return ;
			setFormClass(true);
			
		}
		
	},[errArray.length, formClass])
	
	if(!errArray.length && formStatus === reqStatus.error) return <ServerError />
	return (
		<div className={style.container}>
		
			<h2>Buat Kelas</h2>
			
			<ul className={style.menu}>
				<li onClick={()=>navClick(true)} className={formClass? style.active: ""} >Kelas</li>
				<li onClick={()=>navClick(false)} className={!formClass? style.active: ""}>Jadwal</li>
			</ul>
			
			<form onSubmit={handleSubmit(submit)} className={style.form}>
			
				<div className={`${style.hiding} ${!formClass?style.hiden:''}`}>
					<FormControl2 error={errors.class_name?.message} margin="0 0 20px 0" width="85%" > 
						<input className={`${style.input} ${errors.class_name?style.error:''}`} placeholder="Nama Kelas" {...register('class_name', val.className)}/>
					</FormControl2>
					<FormControl2 error={errors.description?.message} margin="0 0 20px 0" width="85%" >  
						<textarea rows="5" className={`${style.input} ${errors.description?style.error:''}`} placeholder="Keterangan" {...register('description', val.description)}/>
					</FormControl2> 
					<div className={style.inputColor}>
						<p>Tema Kelas</p>
						<div className={style.colorLists}>
							{
								arrColors.map((e,i)=>{
									return <React.Fragment key={i}>
										<input {...register("color")} id={i} type="radio" name="color" value={e} />
										<label htmlFor={i} style={{background: e}} className={style.color} ><p>&#10003;</p></label>
									</React.Fragment>
								})
							}
						</div>
					</div>
				</div>
				
				<div className={`${style.hiding} ${formClass?style.hiden:''}`}>
					<span className={style.des}>Atur waktu dan hari untuk mengingatkanmu membuat Jadwal Materi.</span>
					<div className={style.scheduleRelative}>
						<div className={style.scheduleScroll}>
							{	
								watch('schedules')?.length?
									watch('schedules')?.map((current_e,current_i)=>{
										
										return <React.Fragment key={current_i}>
											<FormSchedule clearErrors={clearErrors} unregister={unregister} register={register} schedule={current_e} schedules={getValues('schedules')} iSchedule={current_i} setValue={setValue} />
										</React.Fragment>
									})
								: <FormSchedule clearErrors={clearErrors} unregister={unregister} register={register} schedule={{day: '', time: ''}} schedules={[]} iSchedule={0} setValue={setValue} />
							}
							
							<FontAwesomeIcon onClick={addSchedule} className={style.addTime} icon="plus" />
						</div>
					</div>
				</div>
				
				<div className={style.btnContainer}>
					{
					formClass?
					<div type="button" className={style.btn} onClick={()=>navClick(false)} >Next</div>
					:
					<button 
						type="submit" 
						className={style.btn} 
						disabled={formStatus === reqStatus.processing || !isValid} 
					>
						Submit
					</button>
					}
				</div>
				
			</form>
			
		</div>
	)
})