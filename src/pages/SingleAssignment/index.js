import React from 'react';
import style from './SingleAssignment.module.css';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinearProgress from '@mui/material/LinearProgress';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";

//components
import Image from '../../components/Image';
import InputFile from '../../components/InputFile';
import DocumentAnswer from '../../components/DocumentAnswer';
import ModalContainer from '../../components/ModalContainer';
import AllAnswers from '../../components/SingleAssignment/AllAnswers';
import SingleAnswer from '../../components/SingleAssignment/SingleAnswer';

//utils
import formatDate from '../../utils/id-format-date';
import uppercase from '../../utils/uppercase';
import statusList from '../../utils/req-status';

//APIs
import * as assignmentApi from '../../api/matt-ass'; 
import * as answerApi from '../../api/ass-answer';
import * as studentApi from '../../api/class-student';

//hooks
import useIsTeacher from '../../hooks/useIsTeacher'

export default React.memo(function SingleAssignment() {
	
	const params = useParams();
	const [ ansFile, setAnsFile ] = React.useState(null)
	const [ sizeError, setSizeError ] = React.useState(false)
	const [ assData, setAssData ] = React.useState({})
	const [ studentData, setStudentData ] = React.useState([]);
	const [ displayDoc, setDisplayDoc ] = React.useState(false)
	const [ ansData, setAnsData ] = React.useState([])
	const [ docs, setDocs ] = React.useState([])
	const [ addingFileStatus, setAddingFileStatus ] = React.useState(statusList.idle)
	const fileAnsw = React.useRef(null)
	const isTeacher = useIsTeacher(assData.teacher?.user_id);
	const disableSubmitting = !ansFile || addingFileStatus === statusList.processing || sizeError;
	
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
			studentApi.getByClass(params.code_class)
		])
		.then(([{ data: assData }, { data: studentData }])=>{
			if(assData.error){
				throw assData.error ;
			}
			if(studentData.error){
				throw studentData.error ;
			}
			setAssData(assData.data[0])
			setStudentData(studentData.data)
			getAnswer()
		})
		.catch(err=>console.log(err))
		
	},[params.id_matt_ass, params.code_class, getAnswer])
	
	function submitAnswer(){
		if(!ansFile) return
		
		setAddingFileStatus(statusList.processing)
		
		const payload = new FormData()
		payload.append('content', ansFile)
		payload.append('id_matt_ass', params.id_matt_ass)
		
		answerApi.add(payload)
		.then(({ data })=>{

			if(data.error) return setAddingFileStatus(statusList.error);
			
			setAnsFile(null)
			setAddingFileStatus(statusList.success)
			
		})
		.catch(err=>setAddingFileStatus(statusList.error))
	}
	
	
	function validateFile(e){
		setSizeError(false)
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 10000000 ) setSizeError(true)
			}
		}
		setAnsFile(e.target.files[0])
	}
	
  return (
	<div className={style.container}>
		<ModalContainer displayed={displayDoc} setDisplayed={setDisplayDoc}>
			<DocViewer 
				pluginRenderers={DocViewerRenderers }
				documents={docs}
				theme={{
					primary: "#5296d8",
					secondary: "#ffffff",
					tertiary: "#5296d899",
					textPrimary: "#black",
					textSecondary: "#5296d8",
					textTertiary: "#00000099",
					disableThemeScrollbar: false,
				}}
				style={{width: '60vw'}}
			/>
		</ ModalContainer>
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
							<h4>{ ansData.length } Jawaban dari { studentData.length } Siswa </h4>
						</div>
						<Routes>
							<Route path="/" element=<AllAnswers /> />
							<Route path="/a/:id_ass_answer" element=<SingleAnswer /> />
						</Routes>
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
									
									return <React.Fragment key={i}>
										<DocumentAnswer
											name={e[1]}
											className={{ container: style.answer}}
										/>
									</React.Fragment>
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
								<InputFile 
									ref={fileAnsw} 
									onChange={validateFile} 
								/>
								{
									ansFile?
									<>
										<DocumentAnswer
											error={sizeError}
											name={ansFile.name}
											className={{container: style.answer2}}
										/>
										<div
											onClick={()=>{
												setSizeError(false)
												setAnsFile(null)
												fileAnsw.current.value = null
											}}
											className={style.delete}>
											<FontAwesomeIcon icon='plus' />
										</div>
									</>
									:""
								}
							</div>
						</div>
						
						<div onClick={submitAnswer} className={`${style.submit} ${disableSubmitting?style.disabled: ""}`}>Serahkan</div>
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
