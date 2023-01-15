import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ExamAnswers.module.css'
import config from '../../config'
import PropTypes from 'prop-types'
import { useContext } from '../../Context'
import { useForm } from 'react-hook-form'
import { inputExamAnswer as ansReducer } from '../../reducers'

//components
import Image from '../Image'
import ModalContainer from '../ModalContainer'
import AnsComment from '../AnsComment'
import ErrorAlert from '../ErrorAlert'
//APIs
import * as ansApi from "../../api/exam-answer"
//utils
import uppercase from '../../utils/uppercase'
import formatDate from '../../utils/id-format-date'


const ExamAnswers = function (){
	
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const [ singleAns, setSingleAns ] = React.useState({})
	const [ idAns, setIdAns ] = React.useState(null)
	const params = useParams()
	const { singleClass } = useContext()
	const [ ansData, dispatch ] = React.useReducer(ansReducer, [])
	const [ errScore, setErrScore ] = React.useState("")
	
	const getAns = React.useCallback(()=>{
		
		ansApi.getByExm(params.id_exm)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			dispatch({ type: 'ADD', data: data.data})
		})
		.catch(err=>console.log(err))
	},[params.id_exm])
	
	React.useEffect(()=>{
		getAns()
	},[getAns ])
	
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
	
	return (
		<div className={style.container}>
			<div className={`${style.errorAlert} ${errScore?style.active:""}`}>
				<span>{errScore}</span>
				<span onClick={()=>setErrScore("")}>Tutup</span>
			</div>
			<ModalContainer 
				displayed={displayModal} 
				setDisplayed={(bool)=>{
					if(idAns) return 
					setDisplayModal(bool)
			}}>
				{
					idAns?
						<AnsComment 
							idAns={idAns} 
							idTeacher={singleClass.teacher} 
							setModal={(bool)=>{
								setIdAns(null)
								setDisplayModal(bool)
							}}
						/>
					:""
				}
			</ ModalContainer>
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
									<Image src={e.user.photo?`${config.api_host}/public/photo/${e.user.photo}`:'images/user.png'} />
								</div>
								<div className={style.name}>{uppercase(e.user.name, 0)}</div>
								<div className={style.comments}>
									<FontAwesomeIcon icon={['far','comment-alt']} /> <span>{e.total_comments}</span>
								</div>
							</div>
							<div className={style.rightSide}>
								<div className={style.date}>Dibuat: {formatDate(e.date, 'id-ID', {dateStyle: 'medium', timeStyle: 'short'})}</div>
								<div className={style.menu}><FontAwesomeIcon icon="ellipsis-vertical" /></div>
							</div>
						</div>
						<div className={style.detail}>
							<div className={style.desc}>
								<p 
									onClick={()=>{
										setDisplayModal(true)
										setIdAns(e.id_exm_ans)
									}} 
									className={`${style.comment} ${e.total_comments?"": style.none}`}
								> 
									{e.total_comments? `${e.total_comments} Komentar`: "Tidak ada komentar"}
								</p>
								<div 
									className={style.score}
									onClick={e=>{
										e.currentTarget.querySelector('input').focus()
										dispatch({ type: 'ACTIVATE', index: iAns})
										e.stopPropagation()
									}}
								>
									<span>Nilai:</span>
									<input 
										onChange={e=>dispatch({ type: 'UPDATE', index: iAns, inputScore: e.target.value})} 
										value={e.inputScore} 
									/>
									<span>/100</span>
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
									onClick={()=>{
										setDisplayModal(true)
										//getFile()
									}} 
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

export default ExamAnswers