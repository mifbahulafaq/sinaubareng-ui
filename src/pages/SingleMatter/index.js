import React from 'react';
import style from './SingleMatter.module.css';
import { useParams } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";
import LinearProgress from '@mui/material/LinearProgress';
import sanitizeHtml from 'sanitize-html';
//APIs
import * as matterApi from '../../api/matter';
import * as discussionApi from '../../api/matter-discussion';
import * as mattAss from '../../api/matt-ass';
//components
import Image from '../../components/Image';
import PreviousLink from '../../components/PreviousLink';
import ModalContainer from '../../components/ModalContainer';
import AssignmentForm from '../../components/AssignmentForm';
import EditingMatterForm from '../../components/EditingMatterForm';
import Contenteditable from '../../components/Contenteditable';
import Assignment from '../../components/SingleMatter/Assignment';
//utils
import formatDate from '../../utils/id-format-date';
import getToday from '../../utils/get-today';
import uppercase from '../../utils/uppercase';
import statusFetching from '../../utils/req-status';
//hooks
import useIsTeacher from '../../hooks/useIsTeacher';
import useDisplayFile from '../../hooks/useDisplayFile';

export default React.memo(function SingleMatter() {
	
	//state
	const [matt, setMatt] = React.useState({});
	const [comments, setComments] = React.useState([]);
	const [mattAssignments, setMattAssignments] = React.useState({
		status: statusFetching.idle,
		data: []
	});
	
	const [ commentText, setCommentText ] = React.useState("");
	const [ displayModal, setDisplayModal ] = React.useState(false)
	const [ displayDoc, setDisplayDoc ] = React.useState(false)
	const [ matterForm, setMatterForm ] = React.useState(false); 
	const [ allAss, setAllAss ] = React.useState(false)
	const params = useParams()
	const isTeacher = useIsTeacher(matt.teacher)
	const [ docs, setDocs ] = React.useState([])
	const rawToday = new Date()
	const today = formatDate(rawToday, "id-ID", {dateStyle:"medium"})
	const rawYesterDay = new Date((new Date()).setDate(rawToday.getDate() - 1))
	const yesterday = formatDate(rawYesterDay, "id-ID", {dateStyle:"medium"})
	const rawMattSchedule = new Date(matt.schedule || Date.now())
	const mattSchedule = getToday(rawMattSchedule, today)
	const displayFile = useDisplayFile();
	
	const getComments = React.useCallback((id_matt)=>{
		
		discussionApi.getAll(id_matt)
		.then(res=>{
			const { data: discussions } = res;
			if(discussions.error) return console.log(discussions);
			setComments(discussions.data)
		})
	}, [])
	const getAss = React.useCallback((id_matt, allAss, isT)=>{
		
		let filter = {}
		if(!allAss) filter.no_answer = 1
		if(isT) delete filter.no_answer;
		
		mattAss.getByMatter(id_matt, filter)
		.then(res=>{
			const { data: ass } = res;
			
			if(ass.error) return console.log(ass.message);
			
			setMattAssignments({
				status: statusFetching.success, 
				data: ass.data
			})
		})
		
	}, [])
	const getSingleMatter = React.useCallback((id_matt)=>{
		
		matterApi.getSingle(id_matt)
		.then(res=>{

			const { data: matter } = res;
			
			if(matter.error) return;
			
			const singleMatt = matter.data[0];
			
			setMatt(singleMatt);
			
		})
	}, [])
	
	React.useEffect(()=>{
		getSingleMatter(params.id_matt);
		getComments(params.id_matt );
	}, [ getSingleMatter, getComments, params.id_matt])
	
	React.useEffect(()=>{
		if(isTeacher !== undefined) getAss(params.id_matt, allAss, isTeacher);
	}, [params.id_matt, allAss, isTeacher, getAss])
	
	React.useEffect(()=>{
		if(!displayDoc) setDocs([])
	}, [displayDoc])

	function getFile(idMatt, filename, download = false){
		matterApi.getaDocument(idMatt, filename[0]).then( async ({ data })=>{
			
			if(data.error) return console.log(data);
			
			if(download){
				displayFile(data.path, null, null, filename[1]);
				return
			}
			displayFile(data.path, setDocs, setDisplayDoc, filename[1]);
			
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
			getComments(params.id_matt);
			setCommentText("");
		}catch(err){
			console.log(err)
		}
		
		
	}
	function inputCommentText(e){
		const config = {
			allowedTags: ['b', 'i', 'a', 'p'],
			allowedAttributes: { a: ["href"] }
		};
		
		//the /(^\s*)|(\s*$)/g regex are searches for any whitespace from the beginning and end of the character. if found, then it is replaced by empty string ''
		///255 chars validation
		const [ ...arrValue ] = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
		const value = (arrValue.filter((e,i)=>i<255)).join('');
		
		setCommentText(sanitizeHtml(value, config));
	}
	function displayMatterForm(bool){
		setMatterForm(bool)
	}
	
  return (
	<div className={style.container}>
		{
		matt.id_matter?
			<>
			<EditingMatterForm 
				fetchMatters={()=>getSingleMatter(params.id_matt)} 
				setDisplay={displayMatterForm} 
				display={matterForm} 
				singleMatter={matt}
			/>
			<ModalContainer displayed={displayModal} setDisplayed={setDisplayModal}>
				<AssignmentForm
					refreshAssignment={()=>{
						getAss(params.id_matt, allAss, isTeacher)
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
						<div className={style.top}>
							<p className={style.matterName}>{uppercase(matt.name,0)}</p>
							{
								isTeacher?
								<div onClick={()=>setMatterForm(true)} className={style.editIcon}>
									<FontAwesomeIcon icon="pencil" />
								</div>
								:""
							}
						</div>
						<div className={style.duration} >
							<span>{uppercase(matt.teacher_name, 0)}, {mattSchedule}</span>
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
								<Contenteditable
									className={style.divInput} 
									onChange={inputCommentText}
									value={commentText}
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
						!isTeacher && isTeacher !== undefined?
						<ul className={style.menu}>
							<li onClick={()=>setAllAss(false)} className={`${!allAss? style.active: ""}`}>Perlu Dikerjakan</li>
							<li onClick={()=>setAllAss(true)} className={`${allAss? style.active: ""}`}>Semua</li>
						</ul>
						:""
					}
					<div className={style.assigns}>
						{
							(function(){
								
								if(mattAssignments.status === statusFetching.idle) return "";
								
								if(!mattAssignments.data.length){
									return <Assignment data={null} isTeacher={null} />
								}
								
								return mattAssignments.data.map((e,i)=>{
									
									
									return <React.Fragment key={i}>
										<Assignment 
											data={e}
											isTeacher={isTeacher}
										/>
									</React.Fragment>
								})
								
							})()
						}
					</div>
				</div>
				
			</div>
			</>
			:
			<div className={style.loading}>
				<LinearProgress />
			</div>
		}
	</div>
  )
})
