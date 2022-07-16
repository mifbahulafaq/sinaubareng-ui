import style from './MainHeader.module.css';

//components
import WebTitle from '../WebTitle';

export default function MainHeader({loginForm, setLoginForm}){
	
	return (
		<div className={style.container}>
			<WebTitle />
			<ul className={style.auth}>
			
				<li 
					onClick={e=>setLoginForm('1')}
					className={`${style.login} ${loginForm && style.active}`}
				>
					Log In
				</li>
				
				<li 
					onClick={e=>setLoginForm('')}
					className={`${style.signup} ${!loginForm && style.active}`}
				>
					Sign Up
				</li>
				
			</ul>
		</div>
	)
}