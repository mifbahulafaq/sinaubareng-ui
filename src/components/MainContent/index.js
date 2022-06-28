import style from './MainContent.module.css';

//components
import WebTitle from '../WebTitle';

export default function MainContent(){
	return (
		<div className={style.container}>
			<h1> Ayo belajar bersama di Sinaubareng</h1>
			<h3>Buat materi pembelajaranmu atau masuk kelas yang ingin kamu ikuti</h3>
		</div>
	)
}