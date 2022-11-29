import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './AssignmentAnswers.module.css'

//components
import Image from '../Image'

export default function AssignmentAnswers(){
	return (
		<div className={style.container}>
			<div className={style.singleAns}>
				<div className={style.leftSide}>
					<div className={style.user}>
						<Image src="images/user.png" />
					</div>
					<div className={style.text}>asdassadasdaddasdassadddddddddddddddddddddddddddddddddddd</div>
					<div className={style.comments}>
						<FontAwesomeIcon icon={['far','comment-alt']} /> <span>5</span>
					</div>
				</div>
				<div className={style.rightSide}>
					<div className={style.date}>Dibuat: 13 Apr 2020 20.45</div>
					<div className={style.menu}><FontAwesomeIcon icon="ellipsis-vertical" /></div>
				</div>
			</div>
		</div>
	)
}