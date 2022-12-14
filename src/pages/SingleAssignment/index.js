import React from 'react';
import style from './SingleAssignment.module.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../../components/Image';

//utils
import formatDate from '../../utils/id-format-date'

export default React.memo(function SingleAssignment() {
	
	const [ answerText, setAnswerText ] = React.useState("")
	
	function submitAnswer(){
		if(!answerText.length) return
		console.log(answerText)
	}
  return (
	<div className={style.container}>
		<div className={style.mainContent}>
		
			<div className={style.about}>
				<div className={style.className}><Link to="..">PHP Dasar</Link></div>
				<div className={style.icon}><FontAwesomeIcon icon="clipboard-question" /></div>	
				<h3>Tugas</h3>
			</div>
			
			<div className={style.assignment}>
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
					
					<div className={style.bottomSide}>
						{
							<div className={style.fileUpload}>
								<div className={style.icon}>
									<div className={style.img}>
										<Image src="images/attachment.png" />
									</div>
								</div>
								<div className={style.fileName}>
									<h3>adsdassad.pdf</h3>
									<p>document</p>
								</div>
							</div>
						}
						
						<h5 className={style.deadline} >Tenggat: {new Date()?formatDate(new Date(), 'id-ID',{dateStyle: "long", timeStyle: "short"}):"-"}</h5>
					</div>
				</div>
				{
				/*	<div className={style.answContainer}>
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
									</div>
								</div>
								<div title="score" className={`${style.score} ${style.null}`}>0</div>
							</div>
							
						</div>
					</div>*/
				}
			</div>
			{
			<div className={style.answerContainer}>
				<div className={style.exp}>
					<span>Jawaban Anda</span>
					<span>Tidak Ada</span>
				</div>
				<div className={style.answers}>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.pdf}`}>P</div>
						<span>sdadsads.pdf</span>
					</div>
					<div className={style.answer}>
						<div className={`${style.icon} ${style.word}`}>W</div>
						<span>sdadsads.pdf</span>
					</div>
				</div>
				
				<div className={style.addFile}>
					<p className={style.title} >Tambahkan Jawaban</p>
					<div className={style.input}>
						<div onClick={e=>e.currentTarget.querySelector("input").click()} className={style.select} >
							<input type="file" accept=".pdf, .docx, doc, .PDF, .DOCX, DOC" />
							<FontAwesomeIcon icon='arrow-up-from-bracket' />
							<span>Upload</span>
						</div>
						<div className={style.answer}>
							<div className={`${style.icon} ${style.word}`}>W</div>
							<span>sdadsads.pdf</span>
						</div>
						<div className={style.delete}>
							<FontAwesomeIcon icon='plus' />
						</div>
					</div>
				</div>
				
				<div onClick={submitAnswer} className={`${style.submit} ${answerText.length?"":style.disabled}`}>Serahkan</div>
				
			</div>
			
			}
			
			
		</div>
	</div>
  )
})
