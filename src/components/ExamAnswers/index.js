import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ExamAnswers.module.css'

//components
import Image from '../Image'
import ModalContainer from '../ModalContainer'

//APIs
import * as examApi from "../../api/exam"

export default function ExamAnswers(){
	
	const [ displayModal, setDisplayModal ] = React.useState(true)
	
	return (
		<div className={style.container}>
			
			<ModalContainer displayed={displayModal} setDisplayed={setDisplayModal}>
			</ ModalContainer>
			
			<div className={style.singleAns} >
				<div 
					onClick={e=>{
						e.currentTarget.parentElement.classList.toggle(style.active)
					}}
					className={style.topSide} 
				>
					<div className={style.leftSide}>
						<div className={style.user}>
							<Image src="images/user.png" />
						</div>
						<div className={style.name}>Mifbahul Afaq</div>
						<div className={style.comments}>
							<FontAwesomeIcon icon={['far','comment-alt']} /> <span>5</span>
						</div>
					</div>
					<div className={style.rightSide}>
						<div className={style.date}>Dibuat: 13 Apr 2020 20.45</div>
						<div className={style.menu}><FontAwesomeIcon icon="ellipsis-vertical" /></div>
					</div>
				</div>
				<div className={style.detail}>
					<div className={style.desc}>
						<p className={style.comment}> 10 Komentar</p>
						<p className={style.score}>Nilai: 70</p>
					</div>
					<div className={style.ansNav}><span onClick={()=>setDisplayModal(true)} className={style.nav}>Lihat Jawaban</span></div>
				</div>
			</div>
			
			<div className={style.singleAns} >
				<div 
					onClick={e=>{
						e.currentTarget.parentElement.classList.toggle(style.active)
					}}
					className={style.topSide} 
				>
					<div className={style.leftSide}>
						<div className={style.user}>
							<Image src="images/user.png" />
						</div>
						<div className={style.name}>Mifbahul Afaq</div>
						<div className={style.comments}>
							<FontAwesomeIcon icon={['far','comment-alt']} /> <span>5</span>
						</div>
					</div>
					<div className={style.rightSide}>
						<div className={style.date}>Dibuat: 13 Apr 2020 20.45</div>
						<div className={style.menu}><FontAwesomeIcon icon="ellipsis-vertical" /></div>
					</div>
				</div>
				<div className={style.detail}>
					<div className={style.desc}>
						<p className={style.comment}> 10 Komentar</p>
						<p className={`${style.score} ${style.none}`}>Tidak ada</p>
					</div>
					<div className={style.ansNav}><span  onClick={()=>setDisplayModal(true)} className={style.nav}>Lihat Jawaban</span></div>
				</div>
			</div>
			
		</div>
	)
}