import style from './RegisterForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
//import { useDispatch, useSelector } from 'react-redux';
//import { addUser } from '../../features/User/actions';

//components
import { useState } from 'react';
import Input1 from '../Input1';
import FormControl from '../FormControl';
import SuccessAlert from '../SuccessAlert';

//apis
import { signup } from '../../api/auth';

//utils
import reqStatus from '../../utils/req-status';

export default function RegisterForm(){
	
	const navigate = useNavigate();
	const [ signupStatus, setSignupStatus] = useState(reqStatus.idle);
	const { register, setError, watch, handleSubmit, formState: { errors } } = useForm();
	
	
	async function submit(input){
		
		setSignupStatus(reqStatus.processing);
		
		try{
			
			const { data : signupData } = await signup(input);
			
			if(signupData.error){
				
				if(signupData.field){
					
					const key = Object.keys(signupData.field)[0];
					
					setError(key,{type: 'manual', message: signupData.field[key].msg});
					setSignupStatus(reqStatus.error)
					
					return;
					
				}
				
				setError('login',{type: 'manual', message: signupData.message});
				setSignupStatus(reqStatus.error)
				return;
			}
			
			setSignupStatus(reqStatus.success);
			
		}catch(err){
				
			setSignupStatus(reqStatus.error)
			throw err;
			
		}
	}
	
	return (
		<div className={style.container}>
			<SuccessAlert
				displayed={signupStatus === reqStatus.success ? true : false }
				message={
					<> You have successfully registered </>
				}
			/>
			
			<form onSubmit={handleSubmit(submit)} className={style.form}>
			
				<div className={style.inputContainer}>
				
					<FormControl error={errors.name?.message} >
						<Input1 
							error={Boolean(errors.name)} 
							type="text" 
							placeholder="Enter your name" 
							{...register('name', val.name)}
						/>
					</FormControl>
					
					<FormControl error={errors.gender?.message} >
						<div className={style.gender}>
						
							<input {...register('gender', val.gender)} id='male' type='radio' value='Male' name='gender'/>
							<label htmlFor='male'>Male</label>
							
							<input {...register('gender', val.gender)} id='female' type='radio' value='Female' name='gender'/>
							<label htmlFor='female'>Female</label>
							
						</div>
					</FormControl>
					
					<FormControl error={errors.email?.message} >
						<Input1 
							error={Boolean(errors.email)} 
							type="text" 
							placeholder="Enter your email address" 
							{...register('email', val.email)}
						/>
					</FormControl>
					
					<FormControl error={errors.password?.message} >
						<Input1 
							error={Boolean(errors.password)} 
							type="password" placeholder="Password"  
							{...register('password', val.password)}
						/>
					</FormControl>
					
					<FormControl error={errors.newpassword?.message} >
						<Input1 
							error={Boolean(errors.newpassword)} 
							type="password" placeholder="Retype Password"  
							{...register('newpassword', val.newpassword(watch('password')))}
						/>
					</FormControl>
					
				</div>
				
				<button 
					className={style.submitLogin} 
					disabled={signupStatus === reqStatus.processing} 
					type="submit"
				>Sign Up</button>
				
			</form>
		</div>
	)
}