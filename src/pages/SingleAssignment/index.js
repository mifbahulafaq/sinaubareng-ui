import React from 'react';
import style from './SingleAssignment.module.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config'
import { useSelector } from 'react-redux'

//components
import Image from '../../components/Image';
import StudentComponent from '../../components/StudentComponent';
import TeacherComponent from '../../components/TeacherComponent';

//utils
import formatDate from '../../utils/id-format-date'
import uppercase from '../../utils/uppercase'
import plural from '../../utils/plural'

//APIs
import * as assignmentApi from '../../api/matt-ass' 
import * as answerApi from '../../api/ass-answer'
import * as studentApi from '../../api/class-student' 

export default React.memo(function SingleAssignment() {
	
	const user = useSelector(s=>s.user.data)
	const params = useParams()
	const [ answerText, setAnswerText ] = React.useState("")
	const [ ansFile, setAnsFile ] = React.useState(null)
	const [ assData, setAssData ] = React.useState({})
	const [ ansData, setAnsData ] = React.useState([])
	const [ teacherAuth, setTeacherAuth ] = React.useState(true)
	const fileAnsw = React.useRef(null)
	const isTeacher = user.user_id === assData.teacher?.user_id
	
	const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
	const assdate = assData.date? new Date(assData.date) : new Date()
	const tenggat = assData.duration? (assdate).getTime() + assData.duration : ""
	
	const getSingleAnswer = React.useCallback(()=>{
		
		answerApi.getByAss(params.id_matt_ass)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setAnsData(data.data)	
		})
		.catch(err=>console.log(err))
		
	},[params.id_matt_ass])
	
	React.useEffect(()=>{
		
		assignmentApi.readSingle(params.id_matt_ass)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setAssData(data.data[0])
			getSingleAnswer()
		})
		.catch(err=>console.log(err))
		
	},[params.id_matt_ass, getSingleAnswer])
	
	function submitAnswer(){
		if(!ansFile) return
		
		const payload = new FormData()
		payload.append('content', ansFile)
		payload.append('id_matt_ass', params.id_matt_ass)
		
		answerApi.add(payload)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			getSingleAnswer()
			setAnsFile(null)
		})
		.catch(err=>console.log(err))
	}
	console.log(isTeacher)
  return (
	<div className={style.container}>
		<div className={`${style.mainContent} ${isTeacher? style.teacherAuth: ""}`}>
		
			<div className={style.about}>
				<div className={style.className}><Link to="..">PHP Dasar</Link></div>
				<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
				<h3>Tugas</h3>
			</div>
			
			<div className={style.assignment}>
				<div className={style.qna}>
					<div className={style.created}>
						<h5 className={style.teacher}>{assData.teacher?uppercase(assData.teacher.name, 0):""}</h5>
						<p className={style.date}>Dibuat pada {bulan[assdate.getMonth()]} {assdate.getDate()}, {assdate.getFullYear()}</p>
					</div>
					<div className={style.quest}>
						{`${assData.title || ""}
						
						 ${assData.text || ""}`}
					</div>
					
					<div className={style.bottomSide}>
						{
							assData.attachment?
							<div className={style.fileUpload}>
								<div className={style.icon}>
									<div className={style.img}>
										<Image src="images/attachment.png" />
									</div>
								</div>
								<div className={style.fileName}>
									<h3>{assData.attachment[1]}</h3>
									<p>document</p>
								</div>
							</div>
							:
							<div />
						}
						
						<h5 className={style.deadline} >Tenggat: {assData.duration?formatDate(tenggat, 'id-ID',{dateStyle: "long", timeStyle: "short"}):"-"}</h5>
					</div>
				</div>
				<TeacherComponent teacherId={assData.teacher?.user_id} >
					<div className={style.answContainer}>
						<div className={style.aboutAnsw}>
							<h4>20 Jawaban dari 30 Siswa </h4>
						</div>
						<div className={style.answs}>
							{
								ansData.map((e,i)=>{
									
									let created = Date.now() - (new Date(e.date)).getTime()
									const days = created / 86400000
									
									if(days > 1 && days < 2){
										created = "Yesterday"
									}else if( days < 1){
										const hours = created / 3600000
										created = `${hours}hr${plural(hours)} ago `
									}else{
										created = formatDate(e.date, "id-ID", {dateStyle: "medium", timeStyle: "short"})
									}
									
									console.log(created)
									
									return <div key={i} className={style.singleAnsw}>
											<div className={style.detail}>
												<div className={style.photo } >
													<Image src={e.user.photo?`${config.api_host}/public/photo/${e.user.photo}`:"images/user.png"} />
												</div>
												<div className={style.status}>
													<h5>{uppercase(e.user.name, 0)}</h5>
													<p>{created}</p>
												</div>
											</div>
										</div>
								})
							}
						
						</div>
					</div>
				</TeacherComponent>
			</div>
			<StudentComponent teacherId={assData.teacher?.user_id}>
				<div className={style.answerContainer}>
					<div className={style.exp}>
						<span>Jawaban Anda</span>
					</div>
					<div style={{display: ansData[0]?.content && ansData[0]?.content.length? "grid": "block	"}} className={style.answers}>
						{
							ansData[0]?.content && ansData[0].content.length?
								ansData[0].content.map((e,i)=>{
									
									const ext = e[1].split('.')[1].toLowerCase()
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
									ref={fileAnsw} 
									onChange={e=>setAnsFile(e.target.files[0])} 
									type="file" accept=".pdf, .docx, doc, .PDF, .DOCX, DOC" 
								/>
								<FontAwesomeIcon icon='arrow-up-from-bracket' />
								<span>Upload</span>
							</div>
							<div className={style.answer}>
								{
									ansFile?
									<>
										<div 
											className={`${style.icon} ${style[ansFile.name.split('.')[ansFile.name.split('.').length - 1].toLowerCase()]}`}
										>
											{ansFile.name.split('.')[ansFile.name.split('.').length - 1].toLowerCase() === 'pdf'?"P":"W"}
										</div>
										<span>{ansFile.name}</span>
									</>
									:""
								}
							</div>
							{
								ansFile?
								
								<div
									onClick={()=>{
										setAnsFile(null)
										fileAnsw.current.value = null
									}}
									className={style.delete}>
									<FontAwesomeIcon icon='plus' />
								</div>
								:""
							}
						</div>
					</div>
					
					<div onClick={submitAnswer} className={`${style.submit} ${ansFile?"":style.disabled}`}>Serahkan</div>
					
				</div>
			</StudentComponent>
			
			
		</div>
	</div>
  )
})
