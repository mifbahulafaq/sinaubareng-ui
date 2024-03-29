import React from 'react';
import style from './SingleMatter.module.css';
import { useParams, Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";
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
import getToday from '../../utils/get-today';
import uppercase from '../../utils/uppercase';
//hooks
import useIsTeacher from '../../hooks/useIsTeacher';

export default React.memo(function SingleMatter() {
	
	//state
	const [matt, setMatt] = React.useState({});
	const [comments, setComments] = React.useState([]);
	const [mattAssignments, setMattAssignments] = React.useState([]);
	const [ commentText, setCommentText ] = React.useState("");
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const [ displayDoc, setDisplayDoc ] = React.useState(false)
	const customInput = React.useRef(null);
	const [ allAss, setAllAss ] = React.useState(false)
	const params = useParams()
	const isTeacher = useIsTeacher(matt.teacher)
	const [ docs, setDocs ] = React.useState([])
	const rawToday = new Date()
	const today = formatDate(rawToday, "id-ID", {dateStyle:"medium"})
	const rawYesterDay = new Date((new Date()).setDate(rawToday.getDate() - 1))
	const yesterday = formatDate(rawYesterDay, "id-ID", {dateStyle:"medium"})
	
	const rawMattSchedule = new Date(matt.schedule || Date.now())
	const rawMattduration = matt.duration? new Date( rawMattSchedule.getTime() + matt.duration): undefined
	const mattSchedule = getToday(rawMattSchedule, today)
	const mattDuration = getToday(rawMattduration).length? getToday(rawMattduration, today): "-"
	
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
	
	const getAss = React.useCallback(()=>{
		
		let filter = {}
		if(!allAss) filter.no_answer = 1
		if(isTeacher) delete filter.no_answer
		
		mattAss.getByMatter(params.id_matt, filter)
		.then(res=>{
			const { data: ass } = res;
			if(ass.error) return console.log(ass.message);
			setMattAssignments(ass.data)
		})
		
	}, [params.id_matt, allAss, isTeacher])
	
	React.useEffect(()=>{
		
		getAss()
		
	}, [ getAss ])
	
	React.useEffect(()=>{
		getSingleMatt();
		getComments();
	}, [getSingleMatt, getComments])
	
	React.useEffect(()=>{
		if(!displayDoc) setDocs([])
	}, [displayDoc])

	function getFile(idMatt, filename, download = false){
		matterApi.getaDocument(idMatt,filename[0]).then(({ data })=>{
			
			if(data.error) return console.log(data);

			//const ext = data.path.split('.')[1]
			const url = `${config.api_host}${data.path}`
			
			if(download){
				//create Element
				const link = document.createElement('a');
				
				link.href = url;
				link.setAttribute('download',filename[1])
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				
			}else{
				//console.log(ext)
				setDocs([
					{uri:url, fileName: filename[1]}
				])
				setDisplayDoc(true)
			}
			// fileApi.get(data.path)
			// .then(({ data })=>{
				
				//if(data.error) return console.log(data);
				//create url
				// const blob = new Blob([data], {type: data.type});
				// const url = window.URL.createObjectURL(blob);
				
				
			// })
			// .catch(err=>console.log(err))
			
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
					getAss()
					setDisplayModal(false)
				}}
				displayModal={displayModal}
				idMatter={parseInt(params.id_matt)}
			/>
		</ ModalContainer>
		<ModalContainer displayed={displayDoc} setDisplayed={setDisplayDoc}>
			
			<DocViewer 
				pluginRenderers={DocViewerRenderers }
				documents={docs}
				theme={{
					primary: "#5296d8",
					secondary: "#ffffff",
					tertiary: "#5296d899",
					textPrimary: "#black",
					textSecondary: "#5296d8",
					textTertiary: "#00000099",
					disableThemeScrollbar: false,
				}}
				style={{width: '60vw'}}
			/>
		</ ModalContainer>
		
		<div className={style.class}>
			<PreviousLink to="../.." name={matt.class_name} />
		</div>
		
		<div className={style.mainContent}>
		
			<div className={style.matter}>
				<div className={style.detail}>
					<h3>{uppercase(matt.name,0)}</h3>
					<div className={style.duration} >
						<span>{uppercase(matt.teacher_name, 0)}, {mattSchedule}</span>
						<span>Tenggat : {mattDuration}</span>
					</div>
					<p className={style.desc}>{matt.description?.trim()}</p>
					{
					matt.attachment?
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
												<span onClick={()=>getFile(matt.id_matter, e)} >Read</span>
											</div>
										</div>
							})
						}
						
					</div>
					:""
					}
				</div>
				
				<div className={style.commentContainer}>
					<div className={style.label}>
						<FontAwesomeIcon icon="comments" />
						<span>Comments</span>
					</div>
					<div className={style.comments} >
						{
							comments?.map((e,i)=>{
								
								const rawDiscussDate = new Date(e.date)
								let elementDay;
								
								const discussDate = formatDate(rawDiscussDate, "id-ID", {dateStyle:"medium"})
								
								switch(discussDate){
									case today:
										elementDay = formatDate(rawDiscussDate, "id-ID", {timeStyle:"short"})
										break
									case yesterday:
										elementDay = "Yesterday"
										break
									default:
										elementDay = discussDate
								}
								
								return <div key={i} className={style.singleComment}>
									<div className={style.photo}>
										<Image src={e.photo?`${config.api_host}/public/photo/${e.photo}`:"images/user.png"} />
									</div>
									<div className={style.rightSide}>
										<h5>{uppercase(e.name, 0)} {matt?.teacher === e.user? "(Pengajar)": ""}<span>{elementDay}</span></h5>
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
					{
						isTeacher?
						<div className={style.btn} onClick={()=>setDisplayModal(true)} > <FontAwesomeIcon icon="plus" /> Buat</div>
						:""
					}
				</div>
				{
					!isTeacher?
					<ul className={style.menu}>
						<li onClick={()=>setAllAss(false)} className={`${!allAss? style.active: ""}`}>Perlu Dikerjakan</li>
						<li onClick={()=>setAllAss(true)} className={`${allAss? style.active: ""}`}>Semua</li>
					</ul>
					:""
				}
				<div className={style.assigns}>
					{
						mattAssignments.map((e,i)=>{
							
							let additionalClassName = ""
							let tenggat
							
							if(e.duration){
								
								const rawDuration = new Date((new Date(e.date)).getTime() + e.duration)
								tenggat = formatDate(rawDuration, "id-ID",{dateStyle:"medium", timeStyle: 'short'})
								
								if(!isTeacher){
									if(new Date() > rawDuration && Number(e.total_answers) > 0){
										additionalClassName = style.done
									}else if(new Date() > rawDuration && Number(e.total_answers) < 1){
										additionalClassName = style.expired
									}
								}
								
							}
							
							return <div key={i} className={`${style.singleAssign} ${additionalClassName}`}>
								<div className={style.cover}/>
								<Link to={`assignment/${e.id_matt_ass}`} ><h4>{e.title}</h4></Link>
								<span className={style.duration} >
									Tenggat: <span>{tenggat? tenggat : "-"}</span>
								</span>
								{
									!isTeacher?
										Number(e.total_answers) > 0?
											<span className={style.answered}>
												Answered 
												<span>&#10004;</span>
											</span>
										:""
									:""
								}
							</div>
						})
					}
					{/*
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
					</div>*/
					}
					{
						mattAssignments.length?
						""
						:
						<div className={`${style.singleAssign} ${style.nodata}`}>
							<p className={style.textInfo} > Tidak ada tugas diberikan</p>
						</div>
					}
				</div>
			</div>
			
		</div>
	</div>
  )
})
