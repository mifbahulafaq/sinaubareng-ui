import React from 'react';
import style from './JoinClass.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { useContext } from '../../Context';

//components
import FormControl2 from '../FormControl2';

//APIs
import { joinClass } from '../../api/class-student';

//utils 
import reqStatus from '../../utils/req-status';

//hooks
import useRefreshClass from '../../hooks/useRefreshClass';


export default React.memo(function JoinClass({ setModal, modal }){
	
	const { reset, register, handleSubmit,  setError, formState: {errors} } = useForm({
		mode: "onChange",
		// defaultValues: { singleClass: 12}
	});
	// register('test')
	const [joinStatus, setJoinStatus] = React.useState(reqStatus.idle);
	const setClasses = useRefreshClass();
	
	async function submit(input){
		try{
			
			setJoinStatus(reqStatus.processing);
			const { data : resultStudent } = await joinClass(input.singleClass);
			
			if(resultStudent.error){
				setJoinStatus(reqStatus.error);
				return setError('singleClass',{type: 'manual', message: resultStudent.message || resultStudent.field['class'].msg})
			}
			
			setJoinStatus(reqStatus.success);
			setClasses();
			setModal(false)
			
		}catch(err){
			console.log(err);
		}
	}
	
	React.useEffect(()=>{
		reset();
		console.log('reset join class')
	}, [reset, modal])
	
	React.useEffect(()=>{
		register('test');
	}, [register])
	// const testInput = register('test');
	console.log('render join class')
	return (
		<div className={style.container}>
		
			<h2>Gabung Kelas</h2>
			
			<div className={style.content} >
				<h3>Kode Kelas</h3>
				<p>Masukan kode kelas di sini.</p>
				<form onSubmit={handleSubmit(submit)} className={style.form}>
					
					<FormControl2 error={errors.singleClass?.message} width="70%">
						<input 
							className={errors.singleClass && errors.singleClass.type !== 'required' ?style.error:""} 
							type="text" placeholder="Kode Kelas" 
							{...register('singleClass', val.codeClass)} 
						/>
					</FormControl2>
					{
					// <FormControl2 width="70%">
						// <input
							// name={testInput.name}
							// onChange={testInput.onChange}
							// onBlur={testInput.onBlur}
							// inputRef={testInput.ref}
						// />
					// </FormControl2>
					}
					{
					// <FormControl2 width="70%">
						// <input
							// name={testInput.name}
							// onChange={testInput.onChange}
							// onBlur={testInput.onBlur}
							// inputRef={testInput.ref}
						// />
					// </FormControl2>
					}
					<div className={style.btnContainer}>
						<button 
							type="submit" 
							className={style.btn} 
							disabled={joinStatus === reqStatus.processing || Boolean(Object.keys(errors).length)} 
						>
							Join
						</button>
					</div>
					
				</form>
			</div>
			
		</div>
	)
})