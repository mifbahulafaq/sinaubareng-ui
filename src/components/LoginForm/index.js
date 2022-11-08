import style from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { email, password } from '../../validation';
//import { useDispatch, useSelector } from 'react-redux';
//import { addUser } from '../../features/User/actions';
import { useContext } from '../../Context';
import { user as userAction } from '../../actions';

//components
import { useState } from 'react';
import Input1 from '../Input1';
import FormControl from '../FormControl';
import ErrorAlert from '../ErrorAlert';

//apis
import { login, me } from '../../api/auth';

//utils
import reqStatus from '../../utils/req-status';

export default function LoginForm(){
	
	const navigate = useNavigate();
	const [ loginStatus, setLoginStatus] = useState(reqStatus.idle);
	const { register, setError, handleSubmit, formState: { errors } } = useForm();
	const { dispatch } = useContext();
	
	
	async function submit(input){
		
		setLoginStatus(reqStatus.processing);
		
		try{
			
			const { data : loginData } = await login(input);
			
			if(loginData.error){
				
				if(loginData.field){
					
					const key = Object.keys(loginData.field)[0];
					
					setError(key,{type: 'manual', message: loginData.field[key].msg});
					setLoginStatus(reqStatus.error)
					
					return;
					
				}
				
				setError('login',{type: 'manual', message: loginData.message});
				setLoginStatus(reqStatus.error)
				return;
			}
			
			const { data: meData } = await me();
			
			if(meData.error) return console.log(meData);
			
			dispatch(userAction.add(meData.data));
			setLoginStatus(reqStatus.success)
			
			navigate('c');
			
		}catch(err){
			setLoginStatus(reqStatus.error)
			throw err;
		}
	}
	
	return (
		<div className={style.container}>
			{
				errors.login?
				<ErrorAlert
					message={
						<>{errors.login?.message}. <Link to="/"> Forget password </Link></>
					}
				/>
				:
				''
			}
			
			<form onSubmit={handleSubmit(submit)} className={style.form}>
			
				<div className={style.inputContainer}>
				
					<FormControl width="100%" error={errors.email?.message} >
						<Input1 
							error={Boolean(errors.email)} 
							type="text" 
							placeholder="Enter your email address" 
							{...register('email', email)}
						/>
					</FormControl>
					
					<FormControl width="100%" error={errors.password?.message} >
						<Input1 
							error={Boolean(errors.password)} 
							type="password" placeholder="Password"  
							{...register('password', password)}
						/>
					</FormControl>
					
					<div className={style.otherInput}>
						<div className={style.checkbox}>
							<input id="keep" type="checkbox" />
							<label htmlFor="keep"> Keep me login </label>
						</div>
						<Link className={style.forget} to="/"> Forget password </Link>
					</div>
					
				</div>
				
				<button 
					className={style.submitLogin} 
					disabled={loginStatus === reqStatus.processing} 
					type="submit"
				>Log In</button>
				
			</form>
		</div>
	)
}