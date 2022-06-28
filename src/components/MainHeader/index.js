import style from './MainHeader.module.css';
import { Link } from 'react-router-dom';

//components
import WebTitle from '../WebTitle';

export default function MainHeader(){
	return (
		<div className={style.container}>
			<WebTitle />
			<ul className={style.auth}>
				<li className={style.login}>
					<Link to="/login">
							Log In
					</Link>
				</li>
				<li className={style.signup}>
					<Link to="/login">
							Sign Up
					</Link>
				</li>
			</ul>
		</div>
	)
}