import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ExamAnswers.module.css'
import config from '../../config'

//components
import Image from '../Image'
import ModalContainer from '../ModalContainer'
//APIs
import * as ansApi from "../../api/exam-answer"
//utils
import uppercase from '../../utils/uppercase'
import formatDate from '../../utils/id-format-date'

export default function ExamAnswers(){
	
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const [ ansData, setAnsData ] = React.useState([])
	const params = useParams()
	
	const getFile = React.useCallback(()=>{
		
	},[])
	
	React.useEffect(()=>{
		ansApi.getByExm(params.id_exm)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setAnsData(data.data)
		})
		.catch(err=>console.log(err))
	},[params.id_exm])
	
	return (
		<div className={style.container}>
			
			<ModalContainer displayed={displayModal} setDisplayed={setDisplayModal}>
			</ ModalContainer>
			{
				ansData.map((e,i)=>{
					return <div className={style.singleAns} >
						<div 
							onClick={e=>{
								e.currentTarget.parentElement.classList.toggle(style.active)
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
								<p className={`${style.comment} ${e.total_comments?"": style.none}`}> {e.total_comments? `${e.total_comments} Komentar`: "Tidak ada komentar"}</p>
								<p className={style.score}>Nilai: 70</p>
							</div>
							<div className={style.ansNav}>
								<span 
									onClick={()=>{
										setDisplayModal(true)
										getFile()
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