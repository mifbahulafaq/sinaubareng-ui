import React from 'react';
import style from './ForgotPassword.module.css';

import WebTitle from '../../components/WebTitle';


export default function ForgotPassword() {
	
	
	return (
		<div className={style.container}>
		
			<div className={style.webTitle}>
				<WebTitle />
			</div>
			
			<div className={style.content}>
				<h1 className={style.pageTitle}> Forgot Password</h1>
				<p className={style.note}>Enter your email address, and we'll send you intructions to reset your password</p>
				
				<div className={style.inputContainer}>
					<input />
					<span>Your E-mail address</span>
				</div>
				
				<button>Submit</button>
			</div>
			
		</div>
	)
}
