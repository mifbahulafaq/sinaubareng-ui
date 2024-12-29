import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";
import style from './ExamAnswers.module.css'
import config from '../../config'
import PropTypes from 'prop-types'
import { useContext } from '../../Context'
import { useForm } from 'react-hook-form'
import { inputExamAnswer as ansReducer } from '../../reducers'
import LinearProgress from '@mui/material/LinearProgress';

//components
import Image from '../Image';
import { ModalContainer, ModalChild } from '../Modal';
import AnsComment from '../AnsComment';
import ErrorAlert from '../ErrorAlert';
import DocumentViewer from '../DocumentViewer';
//APIs
import * as ansApi from "../../api/exam-answer"
//utils
import uppercase from '../../utils/uppercase';
import formatDate from '../../utils/id-format-date';
import displayFile from '../../utils/displayFile';
//hooks
import useDisplayFile from '../../hooks/useDisplayFile';
import useIsTeacher from '../../hooks/useIsTeacher';

const ExamAnswers = function ({ id_exm }){
	
	const [ singleAns, setSingleAns ] = React.useState({})
	const [ idAns, setIdAns ] = React.useState(null)
	const { singleClass } = useContext()
	const [ ansData, dispatch ] = React.useReducer(ansReducer, [])
	const [ errScore, setErrScore ] = React.useState("")
	const [ loading, setLoading ] = React.useState(false)
	const [ docs, setDocs ] = React.useState([]);
	const isTeacher = useIsTeacher(singleClass.teacher);
	const navigate = useNavigate();
	const [ childName, setChildName ] = React.useState("");
	const [ childObj, setChildObj ] = React.useState({
		file: { Comp: DocumentViewer, props:{}},
		comment: { Comp: AnsComment, props: {}}
	});
	
	const getAns = React.useCallback(()=>{
		
		ansApi.getByExm(id_exm)
		.then(({ data })=>{
			if(data.error) return setLoading(true)
			dispatch({ type: 'ADD', data: data.data})
		})
		.catch(err=>console.log(err))
	},[id_exm])
	
	React.useEffect(()=>{
		if(!isTeacher){
			navigate('..', { replace: true });
			return;
		}
		getAns()
	},[getAns ])
	
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
	const getFile = React.useCallback((id_exm_ans, filename)=>{
		
		ansApi.getaDocument(id_exm_ans, filename).then( async ({ data })=>{
			
			if(data.error) return console.log(data);
		
			const docs = await displayFile(data.path, ()=>{}, filename[1]);
			
			setDisplayModal( 'file', { docs } );
			
		})
		.catch(err=>console.log(err))
		
	},[setDisplayModal])
	//start of functs to display modal
	function displayAnsComment(idAns, idTeacher){
		
		setDisplayModal(
			'comment', 
			{
				idAns,
				idTeacher,
				setModal: (bool)=>setChildName(bool? 'comment': '')
			}
		)
	}
	function displayDocAns(id_exm_ans, filename){
		getFile(id_exm_ans, filename)
	}
	//end of functs to display modal
	function submitScore(e){
		
		e.stopPropagation()
		
		const inputScore = ansData.filter((e,i)=>{
			return e.active === true
		})
		
		// start validation
		const regex = /[a-zA-Z]/g
		if(regex.test(inputScore[0].inputScore) || !Number(inputScore[0].inputScore)){
			return setErrScore('Nilai harus berupa angka')
		}
		const integerInp = parseInt(inputScore[0].inputScore)
		if(integerInp > 100 ) return setErrScore('100 score maximum')
		//end validation
	
		ansApi.rate(inputScore[0].id_exm_ans, {score:inputScore[0].inputScore })
		.then(({ data })=>{
			if(data.error){
				if(data.field){
					return setErrScore(data.field.score.msg)
				}
				console.log(data)
			}
			getAns()
			
		})
		.catch(err=>console.log(err))
	}
	
	if(loading) return <div className={style.loading}><LinearProgress /></div>
	
	return (
		<div className={style.container}>
			<div className={`${style.errorAlert} ${errScore?style.active:""}`}>
				<span>{errScore}</span>
				<span onClick={()=>setErrScore("")}>Tutup</span>
			</div>
			<ModalContainer displayed={Boolean(childName)} hideModal={bool=>setChildName(bool || '')}>
				<ModalChild comp={childName} compOfObjs={childObj} />
			</ModalContainer>
			{
				ansData.map((e,iAns)=>{
					
					return <div key={iAns} className={style.singleAns} >
						<div 
							onClick={e=>{
								e.currentTarget.parentElement.classList.toggle(style.active)
								dispatch({ type: 'CANCEL', index: iAns})
								e.stopPropagation()
							}}
							className={style.topSide} 
						>
						
							<div className={style.leftSide}>
								<div className={style.user}>
									<div className={style.photo}>
										<Image src={e.user.photo?`${config.api_host}/public/photo/${e.user.photo}`:'images/user.png'} />
									</div>
									<div className={style.name}>{uppercase(e.user.name, 0)}</div>
								</div>
								<div className={style.comments}>
									<FontAwesomeIcon icon={['far','comment-alt']} /> <span>{e.total_comments}</span>
								</div>
							</div>
							<div className={style.date}>Dibuat: {formatDate(e.date, 'id-ID', {dateStyle: 'medium', timeStyle: 'short'})}</div>
						</div>
						<div className={style.detail}>
							<div className={style.desc}>
								<div 
									onClick={()=>displayAnsComment(e.id_exm_ans, singleClass.teacher)} 
									className={`${style.comment} ${e.total_comments?"": style.none}`}
								> 
									<p>{`${e.total_comments} Komentar`}</p>
								</div>
								<div 
									className={style.scoreContainer}
									onClick={e=>{
										e.currentTarget.querySelector('input').focus()
										dispatch({ type: 'ACTIVATE', index: iAns})
										e.stopPropagation()
									}}
								>
									<div className={style.score}>Nilai:</div>
									<input 
										onChange={e=>dispatch({ type: 'UPDATE', index: iAns, inputScore: e.target.value})} 
										value={e.inputScore} 
									/>
									<div className={style.scoreIn}>/100</div>
									<div className={`${style.width} ${e.active?"":style.none}`} />
									{e.active?
										<>
											<div onClick={submitScore} title="Serahkan" className={style.sendIcon}>
												<FontAwesomeIcon icon={['far','paper-plane']} />
											</div>
											<div 
												onClick={e=>{
													dispatch({ type: 'CANCEL', index: iAns})
													e.stopPropagation()
												}} 
												title="Batal" 
												className={style.cancelIcon}
											>
												<FontAwesomeIcon icon="ban" />
											</div>
										</>
									:""
									}
								</div>
							</div>
							<div className={style.ansNav}>
								<span 
									onClick={()=>displayDocAns(e.id_exm_ans, e.content[0])} 
									className={style.nav}
								>Lihat Jawaban</span>
							</div>
						</div>
					</div>
				})
			}
			
		</div>
	)
}

export default React.memo(ExamAnswers)