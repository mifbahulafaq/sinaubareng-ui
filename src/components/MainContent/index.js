import style from './MainContent.module.css';

//components
import LoginForm from '../LoginForm';

export default function MainContent(){
	return (
		<div className={style.container}>
			<div className={style.text}>
				<h1> Ayo belajar bersama di Sinaubareng</h1>
				<h3>Buat materi pembelajaranmu atau masuk kelas yang ingin kamu ikuti</h3>
			</div>
			<div className={style.form}>
				<LoginForm />
			</div>
		</div>
	)
}