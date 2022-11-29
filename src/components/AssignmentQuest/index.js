import React from 'react';
import style from './AssignmentQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AssignmentQuest(){
	return (
		<div className={style.container}>
			<div className={style.created}>
				<h5 className={style.teacher}>Mifbahul Afaq</h5>
				<p className={style.date}>Asked on Aril 19, 2022</p>
			</div>
			<div className={style.quest}>
				<div className={style.questIcon}>
					<FontAwesomeIcon icon="clipboard-question" />
				</div>
				<p>{`Lorem ips
				
				1.dsaasdasd?1dsaasdasd?1.dsa
				2.asddasads
				3.saddasads?
				S
				jawab pertanyaan diatas... `}</p>
			</div>
			<div className={style.bottomSide}>
				<div className={style.attachment}>
					<div className={style.download} >Download file</div>
					<p>xxxx.pdf</p>
				</div>
				<h5 className={style.deadline} >Tenggat: 13 July 2022 20.45</h5>
			</div>
		</div>
	)
}