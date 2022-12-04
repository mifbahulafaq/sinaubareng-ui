import React from 'react';
import style from './SingleExam.module.css';

import { NavLink, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../../components/Image';
import ExamQuest from '../../components/ExamQuest';
import ExamAnswers from '../../components/ExamAnswers';

export default React.memo(function SingleExam() {
	
	function classActive({ isActive }){
		return isActive? style.active: ''
	}	
	
  return (
	<div className={style.container}>
		<div className={style.mainContent}>
			<div className={style.topNav}>
				<div className={style.about}>
					<div className={style.className}><Link to="..">PHP Dasar</Link></div>
					<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
					<h3>Ujian</h3>
				</div>
				<ul className={style.contentNav}>
					<li className={style.click}><NavLink to="." className={classActive} end >Pertanyaan</NavLink></li>
					<li><NavLink to="answers" className={classActive} >Jawaban</NavLink></li>
				</ul>
			</div>
			
			<div className={style.assignment}>
				<Routes>
					<Route path="/" element=<ExamQuest /> />
					<Route path="/answers" element=<ExamAnswers /> />
				</Routes>
			</div>
			
			
			
		</div>
	</div>
  )
})
