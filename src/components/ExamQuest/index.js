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
	const fileInput = React.useRef(null)
	const [ fileAns, setFileAns ] = React.useState(null)
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
	
	function submitAnswer(){
		if(!fileAns) return
		
		const payload = new FormData()
		payload.append('id_exm', params.id_exm)
		payload.append('content', fileAns)
		
		ansApi.add(payload)
		.then(({ data })=>{
			if(data.error) console.log(data)
			setFileAns(null)
			getAns()
		})
		.catch(err=>console.log(err))
	}
	
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
					<span className={parseInt(ansData.score)? style.score: ""}>{parseInt(ansData.score)? `Nilai: ${parseInt(ansData.score)}`:"Tidak Ada"}</span>
				</div>
				<div className={style.answers}>
					{
						ansData.content && ansData.content.length?
							ansData.content.map((e,i)=>{
								
								const ext = e[1].split('.')[e[1].split('.').length - 1].toLowerCase()
								return <div key={i} className={style.answer}>
									<div className={`${style.icon} ${style[ext]}`}>{ext === "pdf"?'P':'W'}</div>
									<span>{e[1]}</span>
								</div>
						})
						:
						<div className={style.noAnsw}>Belum ada jawaban</div>
					}
				</div>
				
				<div className={style.addFile}>
					<p className={style.title} >Tambahkan Jawaban</p>
					<div className={style.input}>
						<div onClick={e=>e.currentTarget.querySelector("input").click()} className={style.select} >
							<input 
								type="file" 
								ref={fileInput}
								onChange={e=>setFileAns(e.target.files[0])}
								onClick={e=>e.target.value = null} 
								accept=".pdf, .docx, doc, .PDF, .DOCX, DOC" 
							/>
							<FontAwesomeIcon icon='arrow-up-from-bracket' />
							<span>Upload</span>
						</div>
						<div className={style.answer}>
							{
								fileAns?
								<>
									<div 
										className={`${style.icon} ${style[fileAns.name.split('.')[fileAns.name.split('.').length - 1].toLowerCase()]}`}
									>
										{fileAns.name.split('.')[fileAns.name.split('.').length - 1].toLowerCase() === 'pdf'?"P":"W"}
									</div>
									<span>{fileAns.name}</span>
								</>
								:""
							}
						</div>
						{
							fileAns?
							
							<div
								onClick={()=>{
									setFileAns(null)
								}}
								className={style.delete}>
								<FontAwesomeIcon icon='plus' />
							</div>
							:""
						}
					</div>
				</div>
				
				<div onClick={submitAnswer} className={`${style.submit} ${fileAns?"":style.disabled}`}>Serahkan</div>
				
			</div>
		</div>
	)
})