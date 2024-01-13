import { memo } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import style from './HomeSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

//components
import Image from '../Image';
//utils
import getPhotoPath from '../../utils/getPhotoPath'

function HomeSidebar({ classData, iconBar, setIconBar }){
	
	const navigate = useNavigate();
	
	function classActive({ isActive }){
		return isActive? style.active: '';
	}
	
	let styling = {};
	
	if(iconBar){
		styling = {
			marginLeft: '0',
			boxShadow: '1px 0 20px rgba(206, 206, 206, 0.4)'
		}
	}else{
		styling = {
			marginLeft: '-18.8rem',
			boxShadow: 'none'
		}
	}
	
	return (
		<div style={{...styling}} className={style.container}>
			<Link to="/user/account/profile" className={style.user}>
				<div className={style.leftSide}>
					<div className={style.photo}>
						<Image src={getPhotoPath(null)}/>
					</div>
				</div>
				<div className={`${style.detail} ${style.rightSide}`}>
					<p className={style.name}>Mifbahul Afaq</p>
					<p className={style.email}>mifbahulafaq@gmail.com</p>
				</div>

				<div onClick={()=>setIconBar()} className={`${style.hider} ${!iconBar?style.hidden: ""}`}>
					<FontAwesomeIcon icon="angle-left" />
				</div>
				
			</Link>
			<div 
				className={style.centerSide}
			>
				<ul className={style.nav}>
					<li>
						<NavLink to="c" className={classActive}>
							<div className={style.leftSide}>
								<FontAwesomeIcon icon="landmark" />
							</div>
							<div className={`${style.navName} ${style.rightSide}`}>Kelas</div>
						</NavLink>
					</li>
					<li>
						<NavLink to="/given-assignment" className={classActive} >
							<div className={style.leftSide}>
								<FontAwesomeIcon icon="clipboard-list" />
							</div>
							<div className={`${style.navName} ${style.rightSide}`}>Tugas Diberikan</div>
						</NavLink>
					</li>
					<li>
						<NavLink to="/assignment" className={classActive} >
							<div className={style.leftSide}>
								<FontAwesomeIcon icon="table-list" />
							</div>
							<div className={`${style.navName} ${style.rightSide}`}>Semua Tugas</div>
						</NavLink>
					</li>
				</ul>
				
				<div className={style.classContainer}>
					<TypeContainer name="Mengajar" data={classData.created_classes} />
					<TypeContainer name="Mengikuti" data={classData.joined_classes} />
					
				</div>
			</div>
			<div onClick={()=>navigate('/logout')} className={style.logout}>
				<div className={style.leftSide}>
					<div className={style.icon}>
						<FontAwesomeIcon icon="sign-out" />
					</div>
				</div>
				<span className={style.rightSide} >Logout</span>
				
			</div>
		</div>
	)
}

HomeSidebar.propTypes = {
	classData: PropTypes.object,
	iconBar: PropTypes.bool
}

export default memo(HomeSidebar)

function TypeContainer({name, data}){
	
	const circleColor = ['#f68815', '#3366cc', '#1a472a', '#d6493c', '#ffbf00'];
	
	function classActive({ isActive }){
		return isActive? style.active: '';
	}
	
	return (
		<div className={style.typeContainer}>
			<div className={style.nameType}>
				{name}
			</div>
			<ul>
				{
					data?.map((e,i)=>{
						
						const [...a] = e.class_name;
						
						return <li key={i} >
								<NavLink to={`c/${e.code_class}`} className={classActive}>
									<div 
										style={{background: e.color}}
										className={style.circle}
									>
									{a[0].toUpperCase()}
									</div>
									
									<span className={style.rightSide}>{e.class_name}</span>
								</NavLink>
							</li>
					})
				}
			</ul>
		</div>
	)
}