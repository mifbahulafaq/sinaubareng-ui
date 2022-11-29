import React from 'react';
import style from './SingleAssignment.module.css';

import { NavLink, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../../components/Image';
import AssignmentQuest from '../../components/AssignmentQuest';
import AssignmentAnswers from '../../components/AssignmentAnswers';

export default React.memo(function SingleMatter() {
	
	function classActive({ isActive }){
		return isActive? style.active: ''
	}	
	
  return (
	<div className={style.container}>
		<div className={style.mainContent}>
			<div className={style.topNav}>
				<div className={style.about}>
					<div className={style.className}><Link to="../119">PHP Dasar</Link></div>
					<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
					<h3>Tugas</h3>
				</div>
				<ul className={style.contentNav}>
					<li className={style.click}><NavLink to="." className={classActive} end >Pertanyaan</NavLink></li>
					<li><NavLink to="answers" className={classActive} >Jawaban</NavLink></li>
				</ul>
			</div>
			
			<div className={style.assignment}>
				<Routes>
					<Route path="/" element=<AssignmentQuest /> />
					<Route path="answers" element=<AssignmentAnswers /> />
				</Routes>
			</div>
			
			
			
		</div>
	</div>
  )
})
