import React from 'react';
import { useParams } from 'react-router-dom'
import style from './ExamQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import LinearProgress from '@mui/material/LinearProgress';

//components
import Image from '../Image';
import ModalContainer from '../ModalContainer';
import AnsComment from '../AnsComment';
import InputFile from '../InputFile';
import Answer from '../Answer';
//APIs
import * as examApi from "../../api/exam"
import * as ansApi from "../../api/exam-answer"
import * as commentApi from "../../api/ans-comment"

//utils
import getToday from '../../utils/get-today'
import formatDate from '../../utils/id-format-date';
import uppercase from '../../utils/uppercase';
import statusList from '../../utils/req-status';

//hooks
import useIsTeacher from '../../hooks/useIsTeacher'

export default React.memo(function ExamQuest(){
	
	//states
	const params = useParams()
	const [ examData, setExamData ] = React.useState({})
	const isTeacher = useIsTeacher(examData?.teacher)
	const fileInput = React.useRef(null)
	const [ fileAns, setFileAns ] = React.useState(null)
	const [ ansData, setAnsData ] = React.useState({})
	const [ commentDatas, setCommentDatas ] = React.useState([])
	const [ modal, setModal ] = React.useState(false)
	const [ addingFileStatus, setAddingFileStatus ] = React.useState(statusList.idle)
	const [ sizeError, setSizeError ] = React.useState(false)
	const disableSubmitting = !fileAns || addingFileStatus === statusList.processing || sizeError;
	
	const rawToday = new Date()
	const today = formatDate(rawToday, "id-ID", {dateStyle:"medium"})
	const extAttachment = {pdf: "document", doc: "word", docx: "word"}
	const rawSchedule = new Date(examData?.schedule || Date.now())
	const schedule = getToday(rawSchedule, today)
	const tenggat = examData && examData.duration? (new Date(examData.schedule)).getTime() + examData.duration : ""
	
	const getComments = React.useCallback((id_exm_ans)=>{
		commentApi.getByAns(id_exm_ans)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setCommentDatas(data.data)
		})
		.catch(err=>console.log(err))
	}, [])
	const getAns = React.useCallback(()=>{
		ansApi.getByExm(params.id_exm)
		.then(({ data })=>{
			
			if(data.error) return console.log(data)
			setAnsData(data.data[0]? data.data[0]: {})
			
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
	
	//for student authorization
	React.useEffect(()=>{
		if(!isTeacher){
			getAns()
		}
	}, [isTeacher, getAns])
	
	function submitAnswer(){
		if(disableSubmitting) return
		
		setAddingFileStatus(statusList.processing)
		
		const payload = new FormData()
		payload.append('id_exm', params.id_exm)
		payload.append('content', fileAns)
		
		ansApi.add(payload)
		.then(({ data })=>{
			if(data.error) {
				setAddingFileStatus(statusList.error)
				console.log(data)
			}
			setFileAns(null)
			getAns()
			setAddingFileStatus(statusList.success)
		})
		.catch(err=>console.log(err))
	}
	function validateFile(e){
		setSizeError(false)
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 10000000 ) setSizeError(true)
			}
		}
		setFileAns(e.target.files[0])
	}
	
	if(!examData.id_exm) return <div className={style.loading}><LinearProgress /></div>
	return (
		<div className={style.container}>
			<div className={style.created}>
				<h5 className={style.teacher}>{uppercase(examData?.teacher_name, 0)}</h5>
				<p className={style.date}>Jadwal: {schedule}</p>
			</div>
			<div className={style.quest}>
				<div className={style.questIcon}>
					<FontAwesomeIcon icon="clipboard-question" />
				</div>
				<p>{examData?.text?.trim()}</p>
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
			{!isTeacher?
			<div className={style.answerContainer}>
				<div className={style.exp}>
					<span>Jawaban Anda</span>
					<span className={parseInt(ansData.score)? style.score: ""}>
						{parseInt(ansData.score)? <>Nilai: <span className={style.num}>{parseInt(ansData.score)}/100</span></>:"Belum dinilai"}
					</span>
				</div>
				<div style={{display: ansData.content && ansData.content.length? "grid": "block	"}} className={style.answers}>
					{
						ansData.content && ansData.content.length?
							ansData.content.map((e,i)=>{
								
								return <React.Fragment key={i}>
									<Answer
										name={e[1]}
										className={{ container: style.answer }}
									/>
								</React.Fragment>
						})
						:
						<div className={style.noAnsw}>Belum ada jawaban</div>
					}
				</div>
				<div className={style.commentContainer}>
					{Object.keys(ansData).length?
					<>
					<FontAwesomeIcon className={style.commentIcon} icon="user-friends" />
					<span onClick={()=>setModal(true)}>{ansData.total_comments || 0} Komentar Jawaban</span>
					
					<ModalContainer displayed={modal} setDisplayed={function(){}}>
						{
							ansData.id_exm_ans && examData.teacher?
								<AnsComment idAns={ansData.id_exm_ans} idTeacher={examData.teacher} setModal={setModal} />
							:""
						}
					</ModalContainer>
					</>
					:""
					}
					
				</div>
				<div className={style.addFile}>
					<p className={style.title} >Tambahkan Jawaban</p>
					<div className={style.input}>
						<InputFile
							onChange={validateFile}
							ref={fileInput}
						/>
						{
							fileAns?
								<>
									<Answer
										error={sizeError}
										name={fileAns.name}
										className={{ container: style.answer2 }}
									/>
									<div
										onClick={()=>{
											setSizeError(false);
											setFileAns(null);
											fileInput.current.value = null;
										}}
									className={style.delete}>
										<FontAwesomeIcon className={style.deleteIcon} icon='plus' />
									</div>
								</>
							:""
						}
					</div>
					<p className={style.fileInfo}>*Ukuran file tidak lebih dari 10MB</p>
				</div>
				
				<div onClick={submitAnswer} className={`${style.submit} ${disableSubmitting?style.disabled:""}`}>Serahkan</div>
			</div>
			:""
			}
		</div>
	)
})