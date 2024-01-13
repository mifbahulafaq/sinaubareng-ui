import React from 'react';
import style from './Exam.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { useContext } from '../../Context'

//APIs
import * as examApi from '../../api/exam'

//components
import PreviousLink from '../../components/PreviousLink';
import ModalContainer from '../../components/ModalContainer';
import ExamForm from '../../components/ExamForm';
import TeacherComponent from '../../components/TeacherComponent';

//utils
import formatDate from '../../utils/id-format-date'
//hooks
import useIsTeacher from '../../hooks/useIsTeacher'

export default React.memo(function Exam() {
	
	const params = useParams()
	const [ examDatas, setExamDatas ] = React.useState([])
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const { singleClass } = useContext()
	const isTeacher = useIsTeacher(singleClass.teacher)
	
	const getExams = React.useCallback(()=>{
		
		examApi.getAll(params.code_class, {latest: 1})
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setExamDatas(data.data)
		})
		
	},[params.code_class])
	
	React.useEffect(()=>{
		getExams();
	},[getExams])
	
  return (
	<div className={style.container}>
		
		<ModalContainer displayed={displayModal} setDisplayed={setDisplayModal}>
			<ExamForm
				display={displayModal}
				refreshExam={()=>{
					getExams()
					setDisplayModal(false)
				}} 
				codeClass={parseInt(params.code_class)}
			/>
		</ ModalContainer>
		
		
		<div className={style.examContainer}>
		
			<div className={style.previousLink} >
				<PreviousLink to="../.." name={singleClass.class_name} />
			</div>
			
			<div className={style.top}>
				<div className={style.label}>
					<FontAwesomeIcon icon="clipboard-question" />
					<span>Semua Ujian</span>
				</div>
				{
					isTeacher?
					<div onClick={()=>setDisplayModal(true)} className={style.add}>
						<span>+</span>
						<span>Tambah Ujian</span>
					</div>
					:""
				}
			</div>
			
			<div className={style.exams}>
				{
					examDatas.map((e,i)=>{
						return <div className={style.singleExam} key={i} >
							<div className={style.answer}>
								{isTeacher?
								<h2>{e.total_answers}</h2>
								:
								<h2>{Number(e.total_answers) && <>&#10004;</>}</h2>
								}
								<p>answer</p>
							</div>
							<div className={style.quest} >
								<div className={style.icon}> <FontAwesomeIcon icon="clipboard-question" /> </div>
								<Link to={e.id_exm+""} >
									<p>
									{e.teacher_name} memposting ujian baru:
									{e.text?.trim()}
									</p>
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
