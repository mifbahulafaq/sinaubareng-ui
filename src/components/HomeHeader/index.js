import { memo } from 'react';
import style from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from '../../Context';

//components
import WebTitle from '../WebTitle';
import Image from '../Image';

export default memo(function HomeHeader(){
	
	const { setIconBar, iconBar } = useContext();
	
	function clickIcon(e){
		e.currentTarget.classList.toggle(style.active);
		setIconBar(!iconBar);
	}
	
	return (
		<div id="home-header" className={style.container}>
			<div className={style.left}>
				<FontAwesomeIcon icon="bars" onClick={clickIcon} />
				<WebTitle size="25px" />
			</div>
			<ul className={style.user}>
				<div className={style.userImage}>
					<Image src="images/user.png"/>
				</div>
				<span>Mifbahul Afaq</span>
			</ul>
		</div>
	)
})