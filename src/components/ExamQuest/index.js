import React from 'react';
import style from './ExamQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinearProgress from '@mui/material/LinearProgress';

//components
import { ModalContainer, ModalChild } from '../Modal';
import AnsComment from '../AnsComment';
import InputFile from '../InputFile';
import DocumentAnswer from '../DocumentAnswer';
import UploadedFile from '../UploadedFile';
import DocumentViewer from '../DocumentViewer';
import ConfirmationMessage from './ConfirmationMessage';
//APIs
import * as examApi from "../../api/exam";
import * as ansApi from "../../api/exam-answer";

//utils
import getToday from '../../utils/get-today'
import formatDate from '../../utils/id-format-date';
import uppercase from '../../utils/uppercase';
import statusList from '../../utils/req-status';
import displayFile from '../../utils/displayFile';

//hooks
import useIsTeacher from '../../hooks/useIsTeacher';

export default React.memo(function ExamQuest({ id_exm }){
	
	//states
	const [ examData, setExamData ] = React.useState({});
	const [ childName, setChildName ] = React.useState('');
	const isTeacher = useIsTeacher(examData?.teacher);
	const fileInput = React.useRef(null);
	const [ fileAns, setFileAns ] = React.useState(null);
	const [ ansData, setAnsData ] = React.useState({});
	const [ addingFileStatus, setAddingFileStatus ] = React.useState(statusList.idle);
	const [ sizeError, setSizeError ] = React.useState(false);
	const disableSubmitting = !fileAns || addingFileStatus === statusList.processing || sizeError;
	const rawToday = new Date()
	const today = formatDate(rawToday, "id-ID", {dateStyle:"medium"})
	const rawSchedule = new Date(examData?.schedule || Date.now())
	const schedule = getToday(rawSchedule, today)
	const tenggat = parseInt(examData.duration)? (new Date(examData.schedule)).getTime() + parseInt(examData.duration) : 0;
	
	const [ childObj, setChildObj ] = React.useState({
		file: { Comp: DocumentViewer, props:{}},
		confirmation: { Comp: ConfirmationMessage, props: {}},
		comment: { Comp: AnsComment, props: {}}
	});
	
	const setDisplayModal = React.useCallback((nameChild, props)=>{
		
		setChildObj(function(state){
			return {
				...state,
				[nameChild]:{
					...state[nameChild],
					props
				}
			}
		});
		setChildName(nameChild);
		
	}, [])

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
	
	const getFile = React.useCallback((id_exm, filename)=>{
		
		examApi.getaDocument(id_exm, filename[0]).then( async ({ data })=>{
			
			if(data.error) return console.log(data);
		
			const docs = await displayFile(data.path, ()=>{}, filename[1]);
			
			setDisplayModal( 'file', { docs } );
			
		})
		.catch(err=>console.log(err))
		
	},[setDisplayModal])
	
	const submitAnswer = React.useCallback(()=>{
		
		setAddingFileStatus(statusList.processing)
		
		const payload = new FormData();
		
		payload.append('id_exm', id_exm);
		payload.append('content', fileAns);
		
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
		
	}, [fileAns, getAns, id_exm])
	
	function validateFile(e){
		setSizeError(false)
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 3000000 ) setSizeError(true)
			}
		}
		setFileAns(e.target.files[0])
	}
	
	//functs to display modal
	function displayAnsComment(){
		
		setDisplayModal(
			'comment', 
			{
				idAns: ansData.id_exm_ans,
				idTeacher: examData.teacher,
				setModal: (bool)=>setChildName(bool? 'comment': '')
			}
		)
	}
	function displayDocExm(id_exm, filename){
		getFile(id_exm, filename)
	}
	
	const setConfirmation = React.useCallback(()=>{
		
		if(disableSubmitting) return;
		
		setDisplayModal(
			'confirmation',
			{
				cancel: ()=>setChildName(''),
				submit: ()=>submitAnswer()
			}				
		);
		
	}, [disableSubmitting, setDisplayModal, setChildName, submitAnswer]);
	
	if(!examData.id_exm) return <div className={style.loading}><LinearProgress /></div>
	
	return (
		<div className={style.container}>
			<ModalContainer displayed={Boolean(childName)} hideModal={bool=>setChildName(bool || '')}>
				<ModalChild comp={childName} compOfObjs={childObj} />
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
							display={()=>displayDocExm(examData.id_exm, examData.attachment)} data={examData.attachment} 
						/>
					</div>
					:
					<div></div>
				}
				
				<h5 
					className={`${style.deadline} ${tenggat && Date.now() > tenggat? style.expired: ""}`} 
				>
				Tenggat: <span>{tenggat?formatDate(tenggat, 'id-ID',{dateStyle: "long", timeStyle: "short"}):"-"}</span>
				</h5>
			</div>
			{!isTeacher?
			<div className={style.answerContainer}>
				<div className={style.exp}>
					<span>Jawaban Anda</span>
					<span className={parseInt(ansData.score)? style.score: ""}>
						{parseInt(ansData.score)? <>Nilai: <span className={style.num}>{parseInt(ansData.score)}/100</span></>:"Belum dinilai"}
					</span>
				</div>
				<div className={style.answers}>
					{
						ansData.content?
						<DocumentAnswer
							name={ansData.content[1]}
							className={{ container: style.answer }}
						/>
						:
						<div className={style.noAnsw}>Belum ada jawaban</div>
					}
				</div>
				<div className={style.commentContainer}>
					{
						Object.keys(ansData).length
						?
							<>
							<FontAwesomeIcon className={style.commentIcon} icon="user-friends" />
							<span onClick={displayAnsComment}>{ansData.total_comments || 0} Komentar Jawaban</span>
							</>
						:""
					}
					
				</div>
				{
				(tenggat && Date.now() > tenggat) || Object.keys(ansData).length?
				""
				:
				<>
					<div className={style.addFile}>
						<p className={style.title} >Tambahkan Jawaban</p>
						<div className={style.input}>
							<InputFile
								onChange={validateFile}
								ref={fileInput}
								style={{ marginRight: "0.7rem"}}
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
					
					<div onClick={setConfirmation} className={`${style.submit} ${disableSubmitting?style.disabled:""}`}>Serahkan</div>
				</>
				}
			</div>
			:""
			}
		</div>
	)
})