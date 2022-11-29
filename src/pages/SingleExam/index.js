import React from 'react';
import style from './SingleExam.module.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../../components/Image';

export default React.memo(function SingleMatter() {
	
  return (
	<div className={style.container}>
		<div className={style.mainContent}>
		
			<div className={style.about}>
				<div className={style.className}><Link to="../119">PHP Dasar</Link></div>
				<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
				<h3>Ujian</h3>
			</div>
			
			<div className={style.exam}>
				<div className={style.qna}>
					<div className={style.created}>
						<h5 className={style.teacher}>Mifbahul Afaq</h5>
						<p className={style.date}>Asked on Aril 19, 2022</p>
					</div>
					<div className={style.quest}>
						{`Lorem ips
						
						1.dsaasdasd?
						2.asddasads
						3.saddasads?
						
						jawab pertanyaan diatas... `}
					</div>
					<div className={style.attachment}>
						<div className={style.download} >Download file</div>
						<p>xxxx.pdf</p>
					</div>
					<div className={style.bottomSide}>
						<div className={style.btnAnsw}>Answer It</div>
						<h5 className={style.deadline} >Tenggat: 13 July 2022 20.45</h5>
					</div>
				</div>
				<div className={style.answContainer}>
					<div className={style.aboutAnsw}>
						<h4>Answers(20) of 30 Students </h4>
					</div>
					<div className={style.answs}>
					
						<div className={style.singleAnsw}>
							<div className={style.detail}>
								<div className={style.photo } >
									<Image src="images/user.png" />
								</div>
								<div className={style.status}>
									<h5>Mifbahul Afaq</h5>
									<p>24hrs ago</p>
									<div className={style.comment}>
										<FontAwesomeIcon icon="message" />
										<span>2 Comments</span>
									</div>
								</div>
							</div>
							<div title="score" className={style.score}>90</div>
						</div>
					
						<div className={style.singleAnsw}>
							<div className={style.detail}>
								<div className={style.photo } >
									<Image src="images/user.png" />
								</div>
								<div className={style.status}>
									<h5>Mifbahul Afaq</h5>
									<p>24hrs ago</p>
									<div className={style.comment}>
										<FontAwesomeIcon icon="message" />
										<span>2 Comments</span>
									</div>
								</div>
							</div>
							<div title="score" className={style.score}>90</div>
						</div>
					
						<div className={style.singleAnsw}>
							<div className={style.detail}>
								<div className={style.photo } >
									<Image src="images/user.png" />
								</div>
								<div className={style.status}>
									<h5>Mifbahul Afaq</h5>
									<p>24hrs ago</p>
									<div className={style.comment}>
										<FontAwesomeIcon icon="message" />
										<span>2 Comments</span>
									</div>
								</div>
							</div>
							<div title="score" className={`${style.score} ${style.null}`}>0</div>
						</div>
						
					</div>
				</div>
			</div>
			
			
			
		</div>
	</div>
  )
})
