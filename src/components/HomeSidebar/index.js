import { memo } from 'react';
import style from './HomeSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function HomeSidebar({ classData, iconBar }){
	
	function classActive({ isActive }){
		return isActive? style.active: '';
	}
	
	return (
		<div 
			style={{marginLeft: iconBar? '0': '-300px'}} 
			className={style.container}
		>
			<ul className={style.nav}>
				<li>
					<NavLink to="c" className={classActive}>
						<FontAwesomeIcon icon="landmark" />
						<div className={style.navName}>Kelas</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="unread-assignment" className={classActive} >
						<FontAwesomeIcon icon="clipboard-list" />
						<div className={style.navName}>Perlu Diperikas</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="assignment" className={classActive} >
						<FontAwesomeIcon icon="table-list" />
						<div className={style.navName}>Semua Tugas</div>
					</NavLink>
				</li>
			</ul>
			
			<div className={style.classContainer}>
				<TypeContainer name="Mengajar" data={classData.created_classes} />
				<TypeContainer name="Mengikuti" data={classData.joined_classes} />
				
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
									
									<span>{e.class_name}</span>
								</NavLink>
							</li>
					})
				}
			</ul>
		</div>
	)
}