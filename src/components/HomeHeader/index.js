import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import style from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../../features/User/actions'
import * as tokenActions from '../../features/Token/actions'
import config from '../../config'
 
//components
import WebTitle from '../WebTitle';
import Image from '../Image';
//pages
import ErrorPage from '../../pages/ServerError'

//api
import { logout } from '../../api/auth'
//utils
import reqStatus from '../../utils/req-status'
import uppercase from '../../utils/uppercase'

export default memo(function HomeHeader(){
	
	const { setIconBar, iconBar } = useContext();
	const [ logoutStatus, setLogoutStatus ] = useState(reqStatus.idle)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(s=>s.user)
	
	function clickIcon(e){
		e.currentTarget.classList.toggle(style.active);
		setIconBar(!iconBar);
	}
	async function clickLogout(){
		
		try{
			const { data: logoutResult} = await logout()
			
			if(logoutResult.error) return setLogoutStatus(reqStatus.error)
				
			dispatch(tokenActions.remove())
			dispatch(userActions.remove())
			navigate('/login', { replace: true})
			
		}catch(err){
			setLogoutStatus(reqStatus.error)
		}
	}
	
	if(logoutStatus === reqStatus.error) return <ErrorPage />
	return (
		<div id="home-header" className={style.container}>
			<div className={style.left}>
				<FontAwesomeIcon icon="bars" onClick={clickIcon} />
				<WebTitle size="25px" />
			</div>
			<ul className={style.user}>
				<div className={`${style.userImage} setOption`}>
					<Image src={user.data.photo?`${config.api_host}/public/photo/${user.data.photo}`:'images/user.png'} />
				</div>
				<div className={`${style.profilDropdown} option`}>
					<div className={style.detail}>
						<div className={style.userImage2}>
							<Image src={user.data.photo?`${config.api_host}/public/photo/${user.data.photo}`:'images/user.png'}/>
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
						<div className={style.edit}>
							<FontAwesomeIcon icon="pencil" />
							<p>Edit Profil</p>
						</div>
						<div onClick={clickLogout} className={style.logout}>
							<FontAwesomeIcon icon="sign-out" />
							<p>Log Out</p>
						</div>
					</div>
				</div>
			</ul>
		</div>
	)
})