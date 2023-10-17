import React from 'react';
import style from './ResetPassword.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import useQuery from '../../hooks/useQuery';
import * as val from '../../validation';

import WebTitle from '../../components/WebTitle';
import ErrorAlert from '../../components/ErrorAlert';

import * as userApi from '../../api/user';
import * as authApi from '../../api/auth';


export default function ResetPassword() {
	
	const [ redirecting, setRedirecting ] = React.useState(false);
	const [ user, setUser ] = React.useState(null)
	const { reset, register, setError, watch, formState, handleSubmit } = useForm();
	const { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } = formState;
	const qs = useQuery();
	const navigate = useNavigate();
	
	
	const redirectUrl = React.useCallback(()=>{

		setRedirecting(true)
		
		setTimeout(()=>{
			navigate('/', {replace: true});
			
		}, 2000)
		
	}, [navigate])
	
	React.useEffect(()=>{
		
		const token = qs.get('t');
		
		if(!token) return navigate('/forgot-password');
		
		authApi.me({t: token})
		.then(({ data: meData })=>{
			
			if(meData.error) return navigate('/forgot-password');
			
			userApi.getSingle(meData.user_id, {t: token})
			.then(({ data: userData })=>{
				
				if(meData.error) return navigate('/forgot-password');
				
				setUser(userData);
			})
			
		})
		.catch(err=>{
			//set SERVER ERROR
			console.log(err)
		})
		
	}, [qs])
	
	function submit(input){
		
		authApi.reset({ new_password: input.new_password}, {t: qs.get('t')})
		.then(({ data: authData})=>{
			if(authData.error) {
				
				if(authData.field){
					
					const key = Object.keys(authData.field)[0];
					
					setError(key,{type: 'manual', message: authData.field[key].msg});
					return;
				}
				console.log(authData)
				return
				
			}
			
			redirectUrl();
		})
		.catch(err=>{
			//server error
			console.log(err)
		})
		
	}
	
	function visible(e){
		
		const parentE = e.currentTarget.parentElement;
		const inputE = e.currentTarget.parentElement.querySelector('input')
		
		parentE.classList.toggle(style.visible);
		
		const classListArr = Array.from(parentE.classList);
		
		if(classListArr.includes(style.visible)){
			inputE.type = "text"
		}else{
			inputE.type = "password"
		}
	}
	
	function keyup(e){

		const input = e.currentTarget;

		if(input.value.length){

			input.style.right = "35px";
			return;
			
		}
		
		input.style.right = "10px";
	}
	
	function disabled(){
		
		if(isSubmitting) return true
		
		return isSubmitted? !isValid: false
	}
	
	return (
		<div className={style.container}>
			
			<div className={style.content}>
			
				<div className={style.webTitle}>
					<WebTitle />
				</div>

				<p className={style.pageTitle}> Reset your password</p>
				<p className={style.email}>
					<FontAwesomeIcon icon="circle-user" />
					<span>{user?.email}</span>
				</p>
				{
					redirecting?
						<div className={style.success}>
								<p>New password set successfully <br /> Redirecting...</p>
						</div>
					:
						user?.email?
							<>
							<form onSubmit={handleSubmit(submit)}>
								<label>New password</label>
								<div className={style.inputContainer}>
									<input onKeyUp={keyup} type="password" {...register('new_password')} />
									<FontAwesomeIcon onClick={visible} className={style.visible} icon="eye" />
									<FontAwesomeIcon onClick={visible} className={style.visible} icon="eye-slash" />
									<p className={style.error}>{errors['new_password']?.message}</p>
								</div>
								
								<label>Re-enter password</label>
								<div className={style.inputContainer}>
									<input onKeyUp={keyup} type="password" {...register('new_password2')} />
									<FontAwesomeIcon onClick={visible} className={style.visible} icon="eye" />
									<FontAwesomeIcon onClick={visible} className={style.visible} icon="eye-slash" />
									<p className={style.error}>{errors['new_password2']?.message}</p>
								</div>
								<button type="submit" disabled={disabled()} >Reset password</button>
							
							</form>
							<div className={style.back}>
								<Link to="/" className={style.back}>Back to sign in</Link>
							</div>
							</>
						:
							<></>
					
				}
			</div>
			
		</div>
	)
}
