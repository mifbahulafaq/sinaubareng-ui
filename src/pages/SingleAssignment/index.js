import React from 'react';
import style from './SingleAssignment.module.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../config'

//components
import Image from '../../components/Image';

//utils
import formatDate from '../../utils/id-format-date'
import uppercase from '../../utils/uppercase'
import plural from '../../utils/plural'

//APIs
import * as assignmentApi from '../../api/matt-ass' 
import * as answerApi from '../../api/ass-answer'
import * as studentApi from '../../api/class-student'

//hooks
import useIsTeacher from '../../hooks/useIsTeacher'

export default React.memo(function SingleAssignment() {
	
	const params = useParams()
	const [ studentData, setStudentData ] = React.useState([])
	const [ ansFile, setAnsFile ] = React.useState(null)
	const [ assData, setAssData ] = React.useState({})
	const [ ansData, setAnsData ] = React.useState([])
	const [ errorServer, setErrorServer ] = React.useState(false)
	const fileAnsw = React.useRef(null)
	const isTeacher = useIsTeacher(assData.teacher?.user_id)
	
	const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
	const assdate = assData.date? new Date(assData.date) : new Date()
	const tenggat = assData.duration? (assdate).getTime() + assData.duration : ""
	
	const getAnswer = React.useCallback(()=>{
		
		answerApi.getByAss(params.id_matt_ass)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setAnsData(data.data)	
		})
		.catch(err=>console.log(err))
		
	},[params.id_matt_ass])
	
	React.useEffect(()=>{
		
		Promise.all([
			assignmentApi.readSingle(params.id_matt_ass), 
			studentApi.getByClass(params.code_class)])
		
		.then(([{ data: assData }, { data: studentData }])=>{
			if(assData.error){
				return ;
			}
			if(studentData.error){
				return ;
			}
			setAssData(assData.data[0])
			setStudentData(studentData.data)
			getAnswer()
		})
		.catch(err=>console.log(err))
		
	},[params.id_matt_ass, params.code_class, getAnswer])
	
	function submitAnswer(){
		if(!ansFile) return
		
		const payload = new FormData()
		payload.append('content', ansFile)
		payload.append('id_matt_ass', params.id_matt_ass)
		
		answerApi.add(payload)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			getAnswer()
			setAnsFile(null)
		})
		.catch(err=>console.log(err))
	}
	
  return (
	<div className={style.container}>
		{
		assData.id_matt_ass?
		<div className={`${style.mainContent} ${isTeacher? style.teacherAuth: ""}`}>
		
			<div className={style.about}>
				<div className={style.className}><Link to=".." replace={true} >PHP Dasar</Link></div>
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
				{
					isTeacher?
					<div className={style.answContainer}>
						<div className={style.aboutAnsw}>
							<h4>{ansData.length} Jawaban dari {studentData.length} Siswa </h4>
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
										created = `${Math.floor(hours)}hr${plural(hours)} ago `
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
					:""
				}
			</div>
			{
				!isTeacher?
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
							<div className={style.noAnsw}>Tidak ada jawaban</div>
						}
					</div>
					{
					tenggat && Date.now() > tenggat? ""
					:
					<>
						<div className={style.addFile}>
							<p className={style.title} >Tambahkan Jawaban</p>
							<div className={style.input}>
								<div onClick={e=>e.currentTarget.querySelector("input").click()} className={style.select} >
									<input 
										ref={fileAnsw} 
										onChange={e=>{
											setAnsFile(e.target.files[0])
											e.target.value = null
										}} 
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
					</>
					}
					
				</div>
				:""
			}
			
			
		</div>
		:
		<div className={style.loading}>
			<LinearProgress />
		</div>
		}
	</div>
  )
})
