import React from 'react';
import style from './ExamQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";
import LinearProgress from '@mui/material/LinearProgress';

//components
import Image from '../Image';
import ModalContainer from '../ModalContainer';
import AnsComment from '../AnsComment';
import InputFile from '../InputFile';
import DocumentAnswer from '../DocumentAnswer';
import UploadedFile from '../UploadedFile';
//APIs
import * as examApi from "../../api/exam";
import * as ansApi from "../../api/exam-answer";

//utils
import getToday from '../../utils/get-today'
import formatDate from '../../utils/id-format-date';
import uppercase from '../../utils/uppercase';
import statusList from '../../utils/req-status';

//hooks
import useIsTeacher from '../../hooks/useIsTeacher';
import useDisplayFile from '../../hooks/useDisplayFile';

export default React.memo(function ExamQuest({ id_exm }){
	
	//states
	const [ examData, setExamData ] = React.useState({})
	const [ docs, setDocs ] = React.useState([])
	const isTeacher = useIsTeacher(examData?.teacher)
	const fileInput = React.useRef(null)
	const [ fileAns, setFileAns ] = React.useState(null)
	const [ ansData, setAnsData ] = React.useState({})
	const [ modal, setModal ] = React.useState(false)
	const [ fileModal, setFileModal ] = React.useState(false);
	const [ addingFileStatus, setAddingFileStatus ] = React.useState(statusList.idle)
	const [ sizeError, setSizeError ] = React.useState(false)
	const disableSubmitting = !fileAns || addingFileStatus === statusList.processing || sizeError;
	const displayFile = useDisplayFile();
	
	const rawToday = new Date()
	const today = formatDate(rawToday, "id-ID", {dateStyle:"medium"})
	const rawSchedule = new Date(examData?.schedule || Date.now())
	const schedule = getToday(rawSchedule, today)
	const tenggat = examData && examData.duration? (new Date(examData.schedule)).getTime() + examData.duration : ""

	const getAns = React.useCallback(()=>{
		ansApi.getByExm(id_exm)
		.then(({ data })=>{
			
			if(data.error) return console.log(data)
			setAnsData(data.data[0]? data.data[0]: {})
			
		})
		.catch(err=>console.log(err))
	}, [id_exm])
	
	React.useEffect(()=>{
		
		examApi.getSingle(id_exm)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setExamData(data.data?.[0])
			getAns()
		})
		
	},[id_exm, getAns])
	
	//for student authorization
	React.useEffect(()=>{
		if(!isTeacher){
			getAns()
		}
	}, [isTeacher, getAns])
	
	React.useEffect(()=>{
		if(!fileModal) setDocs([])
	}, [fileModal])

	function getFile(id_exm, filename){
		
		examApi.getaDocument(id_exm, filename[0]).then( async ({ data })=>{
			
			if(data.error) return console.log(data);
			
			// if(download){
				// displayFile(data.path, null, null, filename[1]);
				// return
			// }
			displayFile(data.path, setDocs, setFileModal, filename[1]);
		})
		.catch(err=>console.log(err))
	}
	function submitAnswer(){
		if(disableSubmitting) return
		
		setAddingFileStatus(statusList.processing)
		
		const payload = new FormData()
		payload.append('id_exm', id_exm)
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
				
				if(e.target.files[key].size > 3000000 ) setSizeError(true)
			}
		}
		setFileAns(e.target.files[0])
	}
	
	if(!examData.id_exm) return <div className={style.loading}><LinearProgress /></div>
	
	return (
		<div className={style.container}>
			
			<ModalContainer displayed={fileModal} setDisplayed={()=>setFileModal(false)}>
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
					style={{
						maxWidth: '850px',
						margin: "0 10px"
					}}
					
				/>
			</ModalContainer>
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
						<UploadedFile 
							display={()=>getFile(examData.id_exm, examData.attachment)} data={examData.attachment} 
						/>
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
				<div style={{display: ansData.content && ansData.content.length? "flex": "block	"}} className={style.answers}>
					{
						ansData.content && ansData.content.length?
							ansData.content.map((e,i)=>{
								
								return <React.Fragment key={i}>
									<DocumentAnswer
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
								<div className={style.inputtedFile} >
									<DocumentAnswer
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
								</div>
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