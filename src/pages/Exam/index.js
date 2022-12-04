import React from 'react';
import style from './Exam.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

//APIs
import * as examApi from '../../api/exam'

//components
import PreviousLink from '../../components/PreviousLink';
import Calendar from 'react-calendar';

//utils
import formatDate from '../../utils/id-format-date'

export default React.memo(function Matter() {
	
	const params = useParams()
	const [ examDatas, setExamDatas ] = React.useState([])
	
	const getExams = React.useCallback(()=>{
		
		examApi.getAll(params.code_class)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setExamDatas(data.data)
		})
		
	},[params.code_class])
	
	React.useEffect(()=>{
		getExams();
	},[getExams])
	console.log(examDatas)
  return (
	<div className={style.container}>
		
		<div className={style.previousLink} >
			<PreviousLink to="../.." name="PHP Dasar" />
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
				{
					examDatas.map((e,i)=>{
						return <div className={style.singleExam} key={i} >
							<div className={style.answer}>
								<h2>{e.total_answers}</h2>
								<p>answer</p>
							</div>
							<div className={style.quest} >
								<div className={style.icon}> <FontAwesomeIcon icon="clipboard-question" /> </div>
								<Link to={e.id_exm+""} >
									{e.teacher_name} memposting ujian baru:
									{e.text}
								</Link>
								<div className={style.detail}>
									<span>
										{formatDate(new Date(e.schedule), "en-GB",{dateStyle: "short", timeStyle: "short"})}
									</span>
								</div>
							</div>
							<div className={style.menu}>
								<FontAwesomeIcon icon="ellipsis-vertical" />
							</div>
						</div>
					})
				}
				
			</div>
			
		</div>
	</div>
  )
})
