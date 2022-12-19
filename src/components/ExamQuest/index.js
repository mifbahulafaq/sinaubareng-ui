import React from 'react';
import { useParams } from 'react-router-dom'
import style from './ExamQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//components
import Image from '../Image'
//APIs
import * as examApi from "../../api/exam"
import * as ansApi from "../../api/exam-answer"

//utils
import formatDate from '../../utils/id-format-date'

export default React.memo(function ExamQuest(){
	
	const params = useParams()
	const [ examData, setExamData ] = React.useState(null)
	const customInput = React.useRef(null)
	const [ answerText, setAnswerText ] = React.useState("")
	const [ ansData, setAnsData ] = React.useState({})
	
	const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
	const extAttachment = {pdf: "document", doc: "word", docx: "word"}
	const schedule = examData? new Date(examData.schedule) : new Date()
	const tenggat = examData && examData.duration? (new Date(examData.schedule)).getTime() + examData.duration : ""
	
	const getAns = React.useCallback(()=>{
		ansApi.getByExm(params.id_exm)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setAnsData(data.data[0])
		})
		.catch(err=>console.log(err))
	}, [params.id_exm])
	React.useEffect(()=>{
		
		examApi.getSingle(params.id_exm)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setExamData(data.data?.[0])
			getAns()
		})
		
	},[params.id_exm, getAns])
	
	function inputAnswer(e){
		setAnswerText(e.currentTarget.textContent)
	}
	function submitAnswer(){
		if(!answerText.length) return
		console.log(answerText)
	}
	console.log(ansData)
	return (
		<div className={style.container}>
			<div className={style.created}>
				<h5 className={style.teacher}>{examData?.teacher_name}</h5>
				<p className={style.date}>Jadwal: {bulan[schedule.getMonth()]} {schedule.getDate()}, {schedule.getFullYear()}</p>
			</div>
			<div className={style.quest}>
				<div className={style.questIcon}>
					<FontAwesomeIcon icon="clipboard-question" />
				</div>
				<p>{examData?.text}</p>
			</div>
			<div className={style.bottomSide}>
				{
					examData && examData.attachment?
					<div className={style.fileUpload}>
						<div className={style.icon}>
							<div className={style.img}>
								<Image src="images/attachment.png" />
							</div>
						</div>
						<div className={style.fileName}>
							<h3>{examData.attachment[1]}</h3>
							<p>{extAttachment[examData.attachment[1].split('.')[1]]}</p>
						</div>
					</div>
					:
					<div></div>
				}
				
				<h5 className={style.deadline} >Tenggat: {tenggat?formatDate(tenggat, 'id-ID',{dateStyle: "long", timeStyle: "short"}):"-"}</h5>
			</div>
			<div className={style.answerContainer}>
				<div className={style.exp}>
					<span>Jawaban Anda</span>
					<span>Tidak Ada</span>
				</div>
				<div className={style.answers}>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
				</div>
				
				<div className={style.addFile}>
					<p className={style.title} >Tambahkan Jawaban</p>
					<div className={style.input}>
						<div onClick={e=>e.currentTarget.querySelector("input").click()} className={style.select} >
							<input type="file" accept=".pdf, .docx, doc, .PDF, .DOCX, DOC" />
							<FontAwesomeIcon icon='arrow-up-from-bracket' />
							<span>Upload</span>
						</div>
						<div className={style.answer}>
							<div className={`${style.icon} ${style.word}`}>W</div>
							<span>sdadsads.pdf</span>
						</div>
						<div className={style.delete}>
							<FontAwesomeIcon icon='plus' />
						</div>
					</div>
				</div>
				
				<div onClick={submitAnswer} className={`${style.submit} ${answerText.length?"":style.disabled}`}>Serahkan</div>
				
			</div>
		</div>
	)
})