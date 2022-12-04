import React from 'react';
import style from './SingleMatter.module.css';
import { useParams, Link } from 'react-router-dom';
import config from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//APIs
import * as matterApi from '../../api/matter';
import * as fileApi from '../../api/file';
import * as discussionApi from '../../api/matter-discussion';
import * as mattAss from '../../api/matt-ass';
//components
import Image from '../../components/Image';
import PreviousLink from '../../components/PreviousLink';
import ModalContainer from '../../components/ModalContainer';
import AssignmentForm from '../../components/AssignmentForm';
//utils
import formatDate from '../../utils/id-format-date';

export default React.memo(function SingleMatter() {
	const [matt, setMatt] = React.useState({});
	const [comments, setComments] = React.useState([]);
	const [mattAssignments, setMattAssignments] = React.useState([]);
	const [ commentText, setCommentText ] = React.useState("");
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const customInput = React.useRef(null);
	//const [assignment, setAssignment] = React.useState({});
	const params = useParams()
	
	const scheduleMatt = matt.schedule? formatDate(new Date(matt.schedule), "id-ID", {timeStyle:"short"}) : ""
	
	const getSingleMatt = React.useCallback(()=>{
		matterApi.getSingle(params.id_matt)
		.then(res=>{
			const { data: matter } = res;
			if(matter.error) return console.log(matter);
			setMatt(matter.data[0])
		})
	}, [params.id_matt])
	
	const getComments = React.useCallback(()=>{
		
		discussionApi.getAll(params.id_matt)
		.then(res=>{
			const { data: discussions } = res;
			if(discussions.error) return console.log(discussions);
			setComments(discussions.data)
		})
	}, [params.id_matt])
	
	const getAssignments = React.useCallback(()=>{
		mattAss.getAll(params.id_matt)
		.then(res=>{
			const { data: ass } = res;
			if(ass.error) return console.log(ass.message);
			setMattAssignments(ass.data)
		})
	}, [params.id_matt])
	
	React.useEffect(()=>{
		getSingleMatt();
		getComments();
		getAssignments()
	}, [getSingleMatt, getAssignments, getComments])
	
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
			getComments();
			customInput.current.innerHTML = "";
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
		<ModalContainer displayed={displayModal} setDisplayed={setDisplayModal}>
			<AssignmentForm
				refreshAssignment={()=>{
					getAssignments()
					setDisplayModal(false)
				}} 
				idMatter={parseInt(params.id_matt)}
			/>
		</ ModalContainer>
		
		<div className={style.class}>
			<PreviousLink to="../../.." name={matt.class_name} />
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
						{
							comments?.map((e,i)=>{
								
								return <div key={i} className={style.singleComment}>
									<div className={style.photo}>
										<Image src={e.photo?`${config.api_host}/public/photo/${e.photo}`:"images/user.png"} />
									</div>
									<div className={style.rightSide}>
										<h5>{e.name} <span>07:34 AM</span></h5>
										<div className={style.text} >{e.text}</div>
									</div>
								</div>
							})
						}
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
								ref={customInput	}
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
				<div className={style.top}>
					<h1 className={style.title} >Tugas</h1>
					<div className={style.btn} onClick={()=>setDisplayModal(true)} > <FontAwesomeIcon icon="plus" /> Buat</div>
				</div>
				<ul className={style.menu}>
					<li>Perlu Dikerjakan</li>
					<li>Semua</li>
				</ul>
				<div className={style.assigns}>
					{
						mattAssignments.map((e,i)=>{
							let tenggat
							if(e.duration){
								
								const date = new Date(Date.now() + e.duration)
								tenggat = formatDate(date, "id-ID",{dateStyle:"medium", timeStyle: 'short'})
							}
							
							return <div key={i} className={style.singleAssign}>
								<Link to="assignment/1221" ><h4>{e.title}</h4></Link>
								<span className={style.duration} >
									Tenggat: <span>{tenggat? tenggat : "-"}</span>
								</span>
							</div>
						})
					}
					<div className={style.singleAssign}>
						<Link to="assignment/1221" ><h4>tugas membuat function pada php...</h4></Link>
						<span className={style.duration} >Tenggat: <span>6 Jul 2020 20.45</span></span>
					</div>
					<div className={style.singleAssign}>
						<Link to="assignment/1221" ><h4>tugas membuat function pada php...</h4></Link>
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
