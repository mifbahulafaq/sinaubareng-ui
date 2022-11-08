import React from 'react';
import style from './Exam.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

//components
import PreviousLink from '../../components/PreviousLink';
import Calendar from 'react-calendar';

export default React.memo(function Matter() {
	
	
	
  return (
	<div className={style.container}>
		
		<div className={style.previousLink} >
			<PreviousLink to="../119" name="PHP Dasar" />
		</div>
		
		<div className={style.examContainer}>
		
			<div className={style.top}>
				<div className={style.label}>
					<FontAwesomeIcon icon="clipboard-question" />
					<span>Semua Ujian</span>
				</div>
				<div className={style.add}>
					<span>+</span>
					<span>Tambah Ujian</span>
				</div>
			</div>
			
			<div className={style.exams}>
			
				<div className={style.singleExam} to="1221" >
					<div className={style.answer}>
						<h2>1</h2>
						<p>answer</p>
					</div>
					<div className={style.quest} >
						<div className={style.icon}> <FontAwesomeIcon icon="clipboard-question" /> </div>
						<h3>
						Mifbahul Afaq memposting ujian baru:
						{`
							Lorem ips

							1.dsaasdasd?
							2.asddasads
							3.saddasads?

							jawab pertanyaan diatas... asasdasdadsas
						`}
						</h3>
						<div className={style.detail}>
							<span>2 files</span>
							<span>10/10/2021, 10:10</span>
						</div>
					</div>
					<FontAwesomeIcon className={style.opt} icon="ellipsis-vertical" />
				</div>
				
				<div className={style.singleExam} to="1221" >
					<div className={style.answer}>
						<h2>1</h2>
						<p>answer</p>
					</div>
					<div className={style.quest} >
						<div className={style.icon}> <FontAwesomeIcon icon="clipboard-question" /> </div>
						<h3>
						Mifbahul Afaq memposting ujian baru:
						{`
							Lorem ips

							1.dsaasdasd?
							2.asddasads
							3.saddasads?

							jawab pertanyaan diatas... asasdasdadsas
						`}
						</h3>
						<div className={style.detail}>
							<span>2 files</span>
							<span>10/10/2021, 10:10</span>
						</div>
					</div>
					<FontAwesomeIcon className={style.opt} icon="ellipsis-vertical" />
				</div>
				
			</div>
			
		</div>
	</div>
  )
})
