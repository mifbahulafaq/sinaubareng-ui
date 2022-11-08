import React from 'react';
import style from './CreateClass.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { useContext } from '../../Context';

//components
import FormSchedule from '../FormSchedule';
import FormControl2 from '../FormControl2';

//APIs
import { createClass } from '../../api/class';
import { insertSchedules } from '../../api/schedule';

//utils 
import reqStatus from '../../utils/req-status';

//hooks
import useRefreshClass from '../../hooks/useRefreshClass';


export default React.memo(function CreateClass({ setModal }){
	
	const [ formClass, setFormClass ] = React.useState(true);
	const { reset, register, getValues, watch, setValue, setError, handleSubmit, formState: { errors } } = useForm();
	const [ formStatus, setFormStatus ] = React.useState(reqStatus.idle);
	const setClasses = useRefreshClass();
	
	async function submit(input){
		
		const { class_name, description, schedules } = input;
		setFormStatus(reqStatus.processing);
		
		function funcErr(result){
			
			if(result.error){
				setFormStatus(reqStatus.error)
				if(result.field){
					const key = Object.keys(result.field)[0];
					setError(key, {type: 'manual', message: result.field[key].msg});
					
				}
				console.log(result)
				return ;
			}
		}
		
		try{
			
			const { data : resultClass} = await createClass({class_name, description: description || undefined});
			funcErr(resultClass);
			
			const code_class = resultClass.data[0].code_class;
			let schedulePayload = {schedules, code_class }
			
			const { data: resultSchedule } = await insertSchedules(schedulePayload);
			funcErr(resultSchedule)
			
			setFormStatus(reqStatus.success)
			setFormClass(true)
			reset();
			setClasses();
			setModal(false)
		}catch(err){
			setFormStatus(reqStatus.error)
			console.log(err)
		}
	}
	function addSchedule(){
		setValue(`schedules.${getValues('schedules').length}`,{day:'', time: ''})
	}
	
	function navClick(value){
		
		const errArray = Object.keys(errors);
		
		if(errArray.length){
			
			if(errArray.length === 1 && errArray.includes('schedules')) return setFormClass(value) ;
			
			setFormClass(true);
			return ;
			
		}
		
		setFormClass(value)
	}
	
	React.useEffect(()=>{
		
		const errArray = Object.keys(errors);
		
		if(formClass === false && errArray.length){
			
			if(errArray.length === 1 && errArray.includes('schedules')) return ;
			setFormClass(true);
			
		}
		
	},[Object.keys(errors).length, errors, formClass])
	
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
				</div>
				
				<div className={`${style.hiding} ${formClass?style.hiden:''}`}>
					<span className={style.des}>Atur waktu dan hari untuk mengingatkanmu membuat Jadwal Mareri.</span>
					<div className={style.scheduleRelative}>
						<div className={style.scheduleScroll}>
							{	
								watch('schedules')?.length?
									watch('schedules')?.map((current_e,current_i)=>{
										
										return <React.Fragment key={current_i}>
											<FormSchedule register={register} day={current_e.day} schedule={current_e} schedules={getValues('schedules')} iSchedule={current_i} setValue={setValue} />
										</React.Fragment>
									})
								: <FormSchedule day={''} register={register} schedule={{day: '', time: ''}} schedules={[]} iSchedule={0} setValue={setValue} />
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
						disabled={formStatus === reqStatus.processing || Boolean(Object.keys(errors).length)} 
					>
						Submit
					</button>
					}
				</div>
				
			</form>
			
		</div>
	)
})