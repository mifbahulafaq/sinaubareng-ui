import React from 'react'
import { useSearchParams } from 'react-router-dom';
import style from './MainContent.module.css';

//components
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export default function MainContent({loginForm: login, setLoginForm}){
	
	const [ searchParams ] = useSearchParams()
	const nextRoute = searchParams.get('next')
	
	React.useEffect(()=>{
		if(nextRoute) setLoginForm('1')
	}, [ nextRoute, setLoginForm])
	
	return (
		<div className={style.container}>
			<div className={style.text}>
				<h1> Ayo belajar bersama di Sinaubareng</h1>
				<h3>Buat materi pembelajaranmu atau masuk kelas yang ingin kamu ikuti</h3>
			</div>
			<div className={style.form}>
				{
					login?
					<LoginForm nextRoute={nextRoute}/>
					:
					<RegisterForm />
				}
				
			</div>
		</div>
	)
}