import React from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './Main.module.css';

//components
import MainHeader from '../../components/MainHeader';
import MainContent from '../../components/MainContent';
import WebTitle from '../../components/WebTitle';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';


export default function Main() {
	
	let [ loginState, setLoginState ] = React.useState('1')
	const [ searchParams ] = useSearchParams()
	const nextRoute = searchParams.get('next')
	
	const backgroundImage = "url('images/main.png')";
	
	return (
		<div className={style.container}>
		
			<div className={style.desc}>
				<div className={style.header}>
					<div className={style.title}>
						<WebTitle />
					</div>
				</div>
				<div style={{backgroundImage}} className={style.content}>
					<h1> Ayo belajar bersama di Sinaubareng</h1>
					<h3>Buat materi pembelajaranmu atau masuk kelas yang ingin kamu ikuti</h3>
				</div>
			</div>
			
			<div className={style.auth}>
				<div className={style.header}>
					<li 
						onClick={e=>setLoginState('1')}
						className={`${style.login} ${loginState && style.active}`}
					>
						Log In
					</li>
					
					<li 
						onClick={e=>setLoginState('')}
						className={`${style.signup} ${!loginState && style.active}`}
					>
						Sign Up
					</li>
				</div>
				<div className={style.content}>
					{
						loginState?
						<LoginForm nextRoute={nextRoute}/>
						:
						<RegisterForm />
					}
				</div>
			</div>
			{/*
			<div className={style.header}>
				<MainHeader loginForm={loginForm} setLoginForm={setLoginForm}/>
			</div>
			
			<div className={style.content}>
				<MainContent setLoginForm={setLoginForm} loginForm={loginForm}/>
			</div>*/}
			
		</div>
	)
}
