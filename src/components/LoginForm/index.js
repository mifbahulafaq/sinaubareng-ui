import { useState, useEffect } from 'react';
import style from './LoginForm.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { email, password } from '../../validation';
import { useDispatch } from 'react-redux';
import { add as addToken, reqError as errorToken } from '../../features/Token/actions';
import googleLogo from './google.png'

//pages
import ErrorPage from '../../pages/ServerError'

//components
import Input1 from '../Input1';
import FormControl from '../FormControl';
import ErrorAlert from '../ErrorAlert';
import SuccessAlert from '../SuccessAlert';
import Image from '../Image';

//utils
import getGoogleUrl from '../../utils/getGoogleUrl'
import getDataError from '../../utils/getDataError'

//apis
import { login, me } from '../../api/auth';

export default function LoginForm({ nextRoute }){
	
	const navigate = useNavigate();
	const [ customError, setCustomError] = useState("")
	const dispatch = useDispatch()
	const { register, setError, handleSubmit, formState } = useForm();
	const { errors, isValid, isSubmitted, isSubmitting } = formState
	let otherLoignError = errors.email && errors.password
	const location = useLocation()
	
	const from = location.state || '/profile'
	
	async function submit(input){
		
		try{
			
			const { data : loginData } = await login(input);
			
			if(loginData.error){
				
				if(loginData.field){
					
					const key = Object.keys(loginData.field)[0];
					
					setError(key,{type: 'manual', message: loginData.field[key].msg});
					
					return;
					
				}
				
				setError('email',{type: 'unknown', message: loginData.message});
				setError('password',{type: 'unknown', message: loginData.message});
				dispatch(errorToken())
				return;
			}
			
			if(!loginData.token){
				setError('email',{type: 'unknown', message: loginData.message});
				setError('password',{type: 'unknown', message: loginData.message});
				return;
			}
			//store token and re-render by state
			dispatch(addToken())
			
			if(nextRoute) return navigate(nextRoute, { replace: true})
			
		}catch(err){
			
			const errorData = getDataError(err);
			
			if(errorData.status === 500){
				setCustomError('SERVER ERROR')
			}
			//console.log(errorData)
			dispatch(errorToken())
		}
	}
	
	function fieldErrorFunc(objErr = {}){
		if(objErr.type === "unknown") return null
		return objErr.message
	}
	
	function disabled(){
		
		if(isSubmitting) return true
		
		return isSubmitted? !isValid: false
	}
	
	/*useEffect(()=>{
		clearErrors('login')
	}, [])*/
	
	if(customError) return <ErrorPage />
	
	return (
		<div className={style.container}>
			{
				otherLoignError?.type === "unknown"?
				<ErrorAlert
					message={
						<>{otherLoignError?.message}</>
					}
				/>
				:
				''
			}
			
			<form onSubmit={handleSubmit(submit)} className={style.form}>
			
				<div className={style.inputContainer}>
				
					<FormControl width="100%" error={fieldErrorFunc(errors.email)} >
						<Input1 
							error={Boolean(fieldErrorFunc(errors.email))} 
							type="text" 
							placeholder="Enter your email address" 
							{...register('email', email)}
						/>
					</FormControl>
					
					<FormControl width="100%" error={fieldErrorFunc(errors.password)} >
						<Input1 
							error={Boolean(fieldErrorFunc(errors.password))} 
							type="password" placeholder="Password"  
							{...register('password', password)}
						/>
					</FormControl>
					
					<div className={style.otherInput}>
						<div className={style.checkbox}>
							<input {...register('keep')} id="keep" type="checkbox" />
							<label htmlFor="keep"> Keep me login </label>
						</div>
						<Link className={style.forget} to="/"> Forget password </Link>
					</div>
					
				</div>
				
				<button 
					className={style.submitLogin} 
					disabled={disabled()}
					type="submit"
				>Log In</button>
				
			</form>
			<p className={style.info} >Log in with another provider:</p>
			<div className={style.oauthLogin}>
				<a href={getGoogleUrl(from)} className={style.loginContainer}>
					<div className={style.img}>
						<Image src={googleLogo}/>
					</div>
					<span>Google</span>
				</a>
			</div>
		</div>
	)
}