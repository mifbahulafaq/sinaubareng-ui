import React from 'react';
import axios from 'axios'
import style from './SingleMatter.module.css';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//APIs
import * as matterApi from '../../api/matter';
import * as fileApi from '../../api/file';
import * as discussionApi from '../../api/matter-discussion';
//components
import Image from '../../components/Image';
import PreviousLink from '../../components/PreviousLink';
//utils
import formatDate from '../../utils/id-format-date';

export default React.memo(function SingleMatter() {
	const [matt, setMatt] = React.useState({});
	const [ commentText, setCommentText ] = React.useState("");
	//const [comments, setComments] = React.useState({});
	//const [assignment, setAssignment] = React.useState({});
	const params = useParams()
	
	const scheduleMatt = matt.schedule? formatDate(new Date(matt.schedule), "id-ID", {timeStyle:"short"}) : ""
	
	const getSingleMatt = React.useCallback(()=>{
		matterApi.getSingle(params.id_matt).
		then(res=>{
			const { data: matter } = res;
			if(matter.error) return console.log(matter.message);
			setMatt(matter.data[0])
		})
	}, [params.id_matt])
	/*const getComments = React.useCallback(()=>{
		matterApi.getSingle(params.id_matt).
		then(res=>{
			const { data: matter } = res;
			if(matter.error) return console.log(matter.message);
			setMatt(matter.data[0])
		})
	}, [params.id_matt])
	const getAssignments = React.useCallback(()=>{
		matterApi.getSingle(params.id_matt).
		then(res=>{
			const { data: matter } = res;
			if(matter.error) return console.log(matter.message);
			setMatt(matter.data[0])
		})
	}, [params.id_matt])*/
	
	React.useEffect(()=>{
		getSingleMatt();
	}, [getSingleMatt])
	
	function getFile(idMatt, filename, donwload = false){
		matterApi.getaDocument(idMatt,filename[0]).then(({ data })=>{
			if(data.error) return console.log(data);
			
			fileApi.get(data.path)
			.then(({ data })=>{
				
				if(data.error) return console.log(data);
				
				//create url
				const blob = new Blob([data], {type: data.type});
				const url = window.URL.createObjectURL(blob);
				
				//create Element
				const link = document.createElement('a');
				
				link.href = url;
				if(donwload){
					link.setAttribute('download',filename[1])
				}else{
					link.target = "_blank"
				}
				
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.catch(err=>console.log(err))
			
		})
		.catch(err=>console.log(err))
	}
	async function submitComment(event){
		
		event.preventDefault()
		
		const payload = {
			matt: parseInt(params.id_matt),
			date: formatDate(new Date(),"sv-SE"),
			text: commentText
		}
		
		try{
			
			const { data : addingResult } = await discussionApi.add(payload)
			
			if(addingResult.error){
				return console.log(addingResult)
			}
			console.log(addingResult)
		}catch(err){
			console.log(err)
		}
		
		
	}
	function inputCommentText(e){
		setCommentText(
			e.target.innerText
			.replace(/(^\s*)|(\s*$)/g, "")
		)
	}
	
  return (
	<div className={style.container}>
		<div className={style.class}>
		<PreviousLink to={`../${matt.class}`} name={matt.class_name} />
		</div>
		
		<div className={style.mainContent}>
		
			<div className={style.matter}>
				<div className={style.detail}>
					<h3>{matt.name}</h3>
					<div className={style.duration} >
						<FontAwesomeIcon icon={['far', 'clock']} />
						<span>{`${scheduleMatt} ${matt.duration?"- 12:12":""}`}</span>
					</div>
					<p>{matt.description}</p>
					<div className={style.attachContainer} >
						{
							matt.attachment?.map((e,i)=>{
								return <div key={i} className={style.attach}>
											<div className={style.file} >
												<div className={style.fileIcon}>
													<FontAwesomeIcon icon={['far','file-word']} />
												</div>
												<span>{e[1]}</span>
											</div>
											<div className={style.act} >
												<FontAwesomeIcon icon="file-download" />
												<span 
													onClick={()=>getFile(matt.id_matter, e, true)}
												>Download</span>
												<FontAwesomeIcon icon="external-link" />
												<span
													onClick={()=>getFile(matt.id_matter, e)}
												>Read</span>
											</div>
										</div>
							})
						}
						
					</div>
				</div>
				
				<div className={style.commentContainer}>
					<div className={style.label}>
						<FontAwesomeIcon icon="comments" />
						<span>Comments</span>
					</div>
					<div className={style.comments} >
						
						<div className={style.singleComment}>
							<div className={style.photo}>
								<Image src="images/user.png" />
							</div>
							<div className={style.rightSide}>
								<h5>Mifbahul Afaq <span>07:34 AM</span></h5>
								<div className={style.text} >adsdasasddsaasd asdasdasdasdasdasd asdasdasdasdaskjd[okaj asdkaosjdaopsdopasjdioas adsajiodaospdjaois</div>
							</div>
						</div>
						<div className={style.singleComment}>
							<div className={style.photo}>
								<Image src="images/user.png" />
							</div>
							<div className={style.rightSide}>
								<h5>Mifbahul Afaq <span>07:34 AM</span></h5>
								<div className={style.text} >asdasdasdasdaskjd[okaj asdkaosjdaopsdopasjdioas adsajiodaospdjaois</div>
							</div>
						</div>
						
						
					</div>
					<div className={style.send}>
						<form onSubmit={submitComment} >
							<div
								onPaste={e=>e.preventDefault()}
								onKeyPress={e=>{if(e.target.textContent.length >= 255) e.preventDefault()}}
								className={style.divInput} 
								onInput={inputCommentText} 
								contentEditable="true" 
								spellCheck="false"
							/>
							<span className={style.shadowText}>Tulis komentar..</span>
							<button disabled={!Boolean(commentText)} type="submit" className={style.icon}>
								<FontAwesomeIcon icon="paper-plane" />
							</button>
						</form>
					</div>
				</div>
				
			</div>
			
			<div className={style.assignContainer}>
				<h1>Tugas</h1>
				<ul className={style.menu}>
					<li>Perlu Dikerjakan</li>
					<li>Semua</li>
				</ul>
				<div className={style.assigns}>
					<div className={style.singleAssign}>
						<h4>tugas membuat function pada php...</h4>
						<span className={style.duration} >Tenggat: <span>6 Jul 2020 20.45</span></span>
						<input placeholder="Answer" />
					</div>
					<div className={style.singleAssign}>
						<h4>tugas membuat function pada php...</h4>
						<span className={style.duration} >Tenggat: <span>6 Jul 2020 20.45</span></span>
						<input placeholder="Answer" disabled />
					</div>
					<div className={style.singleAssign}>
						<h4>tugas membuat function pada php...</h4>
						<span className={style.duration} >Tenggat: <span className={style.deadline} >6 Jul 2020 20.45</span></span>
						<span className={style.answered}>
							Answered 
							<span>&#10004;</span>
							<FontAwesomeIcon icon="pencil" />
						</span>
					</div>
				</div>
			</div>
			
		</div>
	</div>
  )
})
