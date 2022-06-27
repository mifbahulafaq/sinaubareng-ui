import style from './MainHeader.module.css';

//components
import WebTitle from '../WebTitle';
import BtnEllipse from '../BtnEllipse';

export default function MainHeader(){
	return (
		<div className={style.container}>
			<WebTitle />
			<BtnEllipse bgColor="#5d6aaf" text="Sign Up" />
		</div>
	)
}