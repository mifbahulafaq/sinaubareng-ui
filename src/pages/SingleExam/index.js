import React from 'react';
import style from './SingleExam.module.css';
import { useContext } from '../../Context'

import { NavLink, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import ExamQuest from '../../components/ExamQuest';
import ExamAnswers from '../../components/ExamAnswers';
//hooks
import useIsTeacher from '../../hooks/useIsTeacher';

export default React.memo(function SingleExam() {
	
	const { singleClass } = useContext()
	const isTeacher = useIsTeacher(singleClass.teacher)
	function classActive({ isActive }){
		return isActive? style.active: ''
	}	
	
  return (
	<div className={style.container}>
		<div className={style.mainContent}>
			<div className={style.topNav}>
				<div className={style.about}>
					<div className={style.className}><Link to="..">{singleClass.class_name}</Link></div>
					<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
					<h3>Ujian</h3>
				</div>
				{
					isTeacher?
					<ul className={style.contentNav}>
						<li className={style.click}><NavLink to="." className={classActive} end >Pertanyaan</NavLink></li>
						<li><NavLink to="answers" className={classActive} >Jawaban</NavLink></li>
					</ul>
					:""
				}
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
