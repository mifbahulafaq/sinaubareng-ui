import { useState, useRef } from 'react';
import style from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//components
import Input1 from '../Input1';

//apis
import { login } from '../../api/auth';

export default function LoginForm(){
	
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [ data, setData ] = useState('');
	
	async function submit(data){
		console.log(data);
		return ;
	}
	
	console.log('render')
	return (
		<form onSubmit={handleSubmit(submit)} className={style.form}>
			<div className={style.inputContainer}>
				<Input1 type="text" placeholder="Enter your email address" {...register('email')} />
				<Input1 type="password" placeholder="Password"  {...register('password')}/>
				<div className={style.otherInput}>
					<div className={style.checkbox}>
						<input id="keep" type="checkbox" />
						<label htmlFor="keep"> Keep me login </label>
					</div>
					<Link className={style.forget} to="/"> Forget password </Link>
				</div>
			</div>
			<button className={style.submitLogin} type="submit">Log In</button>
		</form>
	)
}