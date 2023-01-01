import React from 'react'
import PropTypes from 'prop-types'
import style from './AnsComment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//components
import Image from '../Image'
//api
import * as commentApi from "../../api/ans-comment"
//utils
import formatDate from '../../utils/id-format-date'
import uppercase from '../../utils/uppercase'
import status from '../../utils/req-status'


const AnsComment = function ({idAns, idTeacher, setModal}){
	
	const [ commentDatas, setCommentDatas ] = React.useState([])
	const eAnsComment = React.useRef(null)
	const [ commentText, setCommentText ] = React.useState("")
	const [ reqStatus, setReqStatus ] = React.useState(status.idle)
	
	const getComments = React.useCallback(()=>{
		commentApi.getByAns(idAns)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setCommentDatas(data.data)
		})
		.catch(err=>console.log(err))
	}, [idAns])
	
	React.useEffect(()=>{
		getComments()
	},[getComments])
	
	async function submitComment(event){
		
		event.preventDefault()
		
		const payload = {
			id_exm_ans: idAns,
			text: commentText
		}
		
		try{
			
			const { data : addingResult } = await commentApi.add(payload)
			
			if(addingResult.error){
				return console.log(addingResult)
			}
		
			getComments();
			eAnsComment.current.innerHTML = "";
			
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
	
	return <div className={style.container}>
		<div className={style.desc}>
			<div className={style.main}>
				<h4> Komentar Jawaban </h4>
				<p>Hanya Anda dan Pengajar yang bisa memberi komentar</p>
			</div>
			<div 
				onClick={()=>{
					setModal(false)
					eAnsComment.current.innerHTML = "";
				}} 
				className={style.close}
			>
				<FontAwesomeIcon className={style.closeIcon} icon="plus" />
			</div>
		</div>
		<div className={style.singleCommentContainer}>
			
			{
				commentDatas.map((e,i)=>{
					console.log(e)
					return <div key={i} className={style.singleComment}>
						<div className={style.photo}>
							<Image src={"images/user.png"} />
						</div>
						<div className={style.rightSide}>
							<h5>
								{uppercase(e.user.name, 0)}
								<span>{idTeacher === e.user_id? "(Pengajar)": ""}   {formatDate(e.date, "en-US", {hour: '2-digit', minute: '2-digit'})}</span>
							</h5>
							<div className={style.text} >{e.text}</div>
						</div>
					</div>
				})
			}
								
								
							
			<div className={style.send}>
				<form onSubmit={submitComment} >
					<div
						onPaste={e=>e.preventDefault()}
						onKeyPress={e=>{if(e.target.textContent.length >= 255) e.preventDefault()}}
						className={style.divInput} 
						onInput={inputCommentText} 
						contentEditable="true" 
						spellCheck="false"
						ref={eAnsComment}
					/>
					<span className={style.shadowText}>Tulis komentar..</span>
					<button disabled={!Boolean(commentText)} type="submit" className={style.icon}>
						<FontAwesomeIcon icon="paper-plane" />
					</button>
				</form>
			</div>
		</div>
		
	</div>
}
AnsComment.propTypes = {
	idAns: PropTypes.number.isRequired,
	idTeacher: PropTypes.number.isRequired,
	setModal: PropTypes.func.isRequired
}

export default React.memo(AnsComment)
