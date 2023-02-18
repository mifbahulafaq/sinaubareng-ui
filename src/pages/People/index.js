import React from 'react'
import style from './People.module.css'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import config from '../../config'

//components
import Image from '../../components/Image'
import ModalContainer from '../../components/ModalContainer'
import FormControl2 from '../../components/FormControl2'
import PreviousLink from '../../components/PreviousLink'
import GuardComponent from '../../components/GuardComponent'
//APIs
import * as classApi from '../../api/class'
import * as studentApi from '../../api/class-student'
//utils
import uppercase from '../../utils/uppercase'
import reqStatus from '../../utils/req-status'


export default React.memo(function People(){
	
	const [ teacherData, setTeacherData ] = React.useState({});
	const [ studentDatas, setStudentDatas ] = React.useState([]);
	const [ addStatus, setAddStatus ] = React.useState(reqStatus.idle)
	const [ modal, setModal ] = React.useState(false)
	const [ inputUserId, setInputUserId ] = React.useState("")
	const [ errInputUser, setErrInputUser ] = React.useState("") 
	const user = useSelector(s=>s.user)
	const params = useParams()
	
	const getStudents = React.useCallback(()=>{
		
		studentApi.getByClass(params.code_class)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setStudentDatas(data.data)
		})
		
	}, [params.code_class])
	
	React.useEffect(()=>{
		
		classApi.getSingle(params.code_class)
		.then(({ data })=>{
			if(data.error) return console.log(data)
			setTeacherData(data.data)
			getStudents()
		})
		
	}, [params.code_class, getStudents])
	
	React.useEffect(()=>setInputUserId(""), [modal])
	
	function entryUserId(e){
		setErrInputUser("")
		if(e.target.value.length < 7){
			
			if(parseInt(e.target.value)) setInputUserId(parseInt(e.target.value))
			if(e.target.value === "") setInputUserId(e.target.value)
		}
	}
	function handleSubmit(e){
		e.preventDefault()
		
		setAddStatus(reqStatus.processing)
		const payload = {
			class: params.code_class,
			user: inputUserId
		}
		studentApi.add(payload)
		.then(({ data })=>{
			if(data.error){
				
				setAddStatus(reqStatus.error)
				if(data.field && data.field.user){
					return setErrInputUser(data.field.user.msg)
				}
				return console.log(data)
			}
			getStudents()
			setErrInputUser("")
			setInputUserId("")
			setModal(false)
			setAddStatus(reqStatus.success)
		})
		.catch(err=>{
			setAddStatus(reqStatus.error)
			console.log(err)
		})
	}
	
	return <div className={style.container}>
	
		<div className={style.previousLink} >
			<PreviousLink to=".." name={teacherData?.class_name}/>
		</div>
		<ModalContainer displayed={modal} setDisplayed={setModal}>
			<div className={style.addStudentContainer}>
			
				<h2>Tambahkan Siswa</h2>
				
				<div className={style.content} >
					<h3>ID Siswa</h3>
					<p>Masukan 6 digit ID Siswa.</p>
					<form onSubmit={handleSubmit} className={style.form}>
						
						<FormControl2 error={errInputUser} width="70%">
							<input 
								className={errInputUser? style.error: ""} 
								type="text" placeholder="ID Siswa"
								value={inputUserId}
								onChange={entryUserId}
							/>
						</FormControl2>
						
						<div className={style.btnContainer}>
							<button 
								type="submit" 
								className={style.btn} 
								disabled={addStatus === reqStatus.processing || Boolean(errInputUser) || !Boolean(inputUserId)} 
							>
								Tambah
							</button>
						</div>
						
					</form>
				</div>
				
			</div>
			
		</ModalContainer>
		
		<div className={style.people}>
			<div className={style.teacher}>
				<div className={style.photo}>
					<Image src={teacherData?.photo? `${config.api_host}/public/photo/${teacherData.photo}`: "images/user.png"} />
				</div>
				<div className={style.detail}>
					<p>{uppercase(teacherData?.username, 0)}</p>
					<p>Pengajar</p>
				</div>
			</div>
			<div className={style.studentContainer}>
				<div className={style.studentTitle}>
					<p>{studentDatas.length} Siswa {teacherData.teacher !== user.data.user_id? "lainnya": ""}</p>
					<GuardComponent teacherId={teacherData.teacher} >
						<div onClick={()=>setModal(true)} className={style.addIcon}>
							<FontAwesomeIcon icon="user-plus" />
						</div>
					</GuardComponent>
				</div>
				{
					studentDatas.map((e,i)=>{
						
						return <div key={i} className={style.singleStudent}>
							<div className={style.photo}>
								<Image src={e.photo? `${config.api_host}/public/photo/${e.photo}`: "images/user.png"} />
							</div>
							<p>{uppercase(e.name, 0)}</p>
						</div>
					})
				}
			</div>
		</div>
	</div>
})