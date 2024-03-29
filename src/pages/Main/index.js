import React from 'react';
import style from './Main.module.css';

//components
import MainHeader from '../../components/MainHeader';
import MainContent from '../../components/MainContent';


export default function Main() {
	
	let [ loginForm, setLoginForm ] = React.useState('')
	
	const backgroundImage = "url('images/main.png')";
	
	return (
		<div style={{backgroundImage}} className={style.container}>
		
			<div className={style.header}>
				<MainHeader loginForm={loginForm} setLoginForm={setLoginForm}/>
			</div>
			
			<div className={style.content}>
				<MainContent setLoginForm={setLoginForm} loginForm={loginForm}/>
			</div>
			
		</div>
	)
}
