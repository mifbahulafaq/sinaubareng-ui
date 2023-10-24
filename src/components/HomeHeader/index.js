import { memo } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import style from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from '../../Context';
import { useSelector } from 'react-redux'
import config from '../../config'
 
//components
import WebTitle from '../WebTitle';
import Image from '../Image';

//utils
import uppercase from '../../utils/uppercase'

export default memo(function HomeHeader(){
	
	const { setIconBar, iconBar } = useContext();
	const user = useSelector(s=>s.user)
	const photo =  user.data.photo? user.data.photo.includes('http')? user.data.photo: `${config.api_host}/public/photo/${user.data.photo}`: 'images/user.png';
	const navigate = useNavigate()
	
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
				<div className={`${style.userImage} setOption`}>
					<Image src={photo} />
				</div>
				<div className={`${style.profilDropdown} option`}>
					<div className={style.detail}>
						<div className={style.userImage2}>
							<Image src={photo}/>
						</div>
						<div className={style.text}>
							<p className={style.name}>{user.data.name? uppercase(user.data.name, 0): ""}</p>
							<div className={style.email}>
								<FontAwesomeIcon icon="envelope" />
								<div className={style.emailText}>{user.data.email}</div>
							</div>
						</div>
					</div>
					<div className={style.menu}>
						<Link to="/user/account/profile" className={style.edit}>
							<FontAwesomeIcon icon="pencil" />
							<p>Edit Profil</p>
						</Link>
						<div onClick={()=>navigate('/logout')} className={style.logout}>
							<FontAwesomeIcon icon="sign-out" />
							<p>Log Out</p>
						</div>
					</div>
				</div>
			</ul>
		</div>
	)
})