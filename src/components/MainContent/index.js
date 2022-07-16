import style from './MainContent.module.css';

//components
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export default function MainContent({loginForm: login}){
	return (
		<div className={style.container}>
			<div className={style.text}>
				<h1> Ayo belajar bersama di Sinaubareng</h1>
				<h3>Buat materi pembelajaranmu atau masuk kelas yang ingin kamu ikuti</h3>
			</div>
			<div className={style.form}>
				{
					login?
					<LoginForm />
					:
					<RegisterForm />
				}
				
			</div>
		</div>
	)
}