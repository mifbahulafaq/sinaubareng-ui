import React from 'react';
import style from './ForgotPassword.module.css';

import WebTitle from '../../components/WebTitle';

import * as authApi from '../../api/auth';

import reqStatus from '../../utils/req-status';


export default function ForgotPassword() {
	
	const [ emailInput, setEmailInput ] = React.useState('');
	const [ error, setError ] = React.useState('');
	const [ status, setStatus ] = React.useState(reqStatus.idle);
	
	const sendEmail = React.useCallback(async (email)=>{

		const { data } = await authApi.forgot(email);
		
		if(data.error){
			console.log(data)
			setError(data.message);
			setStatus(reqStatus.error);
			return;
		}
		
		setStatus(reqStatus.success)
		
	}, [])

	async function handleSubmit(e){
	
		e.preventDefault();
		
		setStatus(reqStatus.processing) //pending fetch
		
		//validate email input
		const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		if(!regex.test(emailInput)){
			
			setError('Invalid email');
			setStatus(reqStatus.error);
			return ;
		}
		
		await sendEmail(emailInput);
		
		setEmailInput('')
		
	}
	
	return (
		<div className={style.container}>
		
			<div className={style.webTitle}>
				<WebTitle />
			</div>
			
			<div className={style.content}>
			
				<h1 className={style.pageTitle}> Forgot Password</h1>
				<p className={style.note}>Enter your email address, and we'll send you intructions to reset your password</p>
				
				{
					status === reqStatus.success?
					
						<div className={style.info}>
							A reset link has been sent to your email. Please use it to reset your password
						</div>
					:
						status === reqStatus.error?
							<div className={style.error}>
								{error}
							</div>
						:
						    <></>
				}
				
				<form onSubmit={handleSubmit} >
					<div className={style.inputContainer}>
						<input value={emailInput} onChange={e=>setEmailInput(e.target.value)} placeholder="Your E-mail address" />
					</div>
					
					<button type='submit' disabled={status === reqStatus.processing} >Submit</button>
				</form>
			</div>
			
		</div>
	)
}
