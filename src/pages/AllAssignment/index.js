import React from 'react';
import style from './AllAssignment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom'
import { assignmentFilter } from '../../reducers'
import imgNodata from './book.jpg';

//components
import ImageWithAttribute from '../../components/ImageWithAttribute';
//apis
import * as assApi from '../../api/matt-ass'
import * as classStudentApi from '../../api/class-student'
//utils
import formateDate from '../../utils/id-format-date'
import reqStatus from '../../utils/req-status'

function NoData(){
	return <div className={style.noData}>
		<ImageWithAttribute 
			height= "90px"
			attrRight={"-15px"}
			imgSrc={imgNodata}
			attrHref="https://www.vecteezy.com/free-vector/book"
			attrText="img by Vecteezy"
		/>
		<p className={style.info} >Have no assigments</p>
	</div>
}

export default function AllAssignment() {
	
	const [ classStudentData, setClassStudentData ] = React.useState([])
	const [ assignmentDatas, setAssignmentDatas ] = React.useState({
		data: [], 
		rowCount: 0,
		status: reqStatus.idle
	})
	const [ className, setClassName ] = React.useState('Semua Kelas')
	const [ filterAssignment, dispatch ] = React.useReducer(assignmentFilter, {
		status: 'none',
		by: 'student',
		class: "",
		skip: 0,
		limit: 4
	})
	const pages = Math.ceil(assignmentDatas.rowCount/filterAssignment.limit)
	const clickedPage = (filterAssignment.skip + filterAssignment.limit ) / filterAssignment.limit;
	
	React.useEffect(()=>{
		
		setAssignmentDatas(state=>({...state, status: reqStatus.processing}));
		
		Promise.all([assApi.getAll(filterAssignment), classStudentApi.getAll()])
		.then(([ { data: assData }, { data: classStudentData }])=>{
			
			if(assData.error || classStudentData.error ) {
				setAssignmentDatas(state=>({...state, status: reqStatus.error}));	
				console.log(assData)
				console.log(classStudentData)
				return
			}
			
			setAssignmentDatas(state=>({...assData, status: reqStatus.success}));
			setClassStudentData(classStudentData.data)
		})
		.catch(err=>console.log(err))
	},[filterAssignment])
	
	function clickStatus(value){
		if(filterAssignment.status === value) return
		dispatch({type:'status', value})
	}
	function clickClass(className, code_class){
		if(filterAssignment.class === code_class) return
		setClassName(className)
		dispatch({type:'class', code_class})
	}
	
	function filterNav(value){
		return filterAssignment.status === value? style.active: ""
	}
	
	function clickFilter(e){
		
		const dropDown = e.currentTarget.parentElement.querySelector(`.${style.dropDown}`);
		
		dropDown.classList.toggle(style.active)
		
		const classArr = Array.from(dropDown.classList);
		const isActive = classArr.includes(style.active);
		
		if(isActive){
			e.target.classList.add(style.clicked);
		}else{
			e.target.classList.remove(style.clicked);
		}
	}
	
  return (
	<div className={style.container}>
		<div className={style.menuContainer}>
			<div className={style.filter}>
				<div className={style.btnFilter} onClick={clickFilter} >
					<FontAwesomeIcon icon="plus" /> 
					<span>Add Filter</span>
				</div>
				<div className={style.dropDown}>
					<ul className={style.status}>
						<li onClick={()=>clickStatus('none')} className={filterNav('none')} >Tidak Ada</li>
						<li onClick={()=>clickStatus('expired')} className={filterNav('expired')}>Terlambat</li>
						<li onClick={()=>clickStatus('done')} className={filterNav('done')}>Selesai</li>
					</ul>
					<ul className={style.classes}>
						<li 
							className={filterAssignment.class === "" ? style.active: ""} 
							onClick={()=>clickClass('Semua Kelas', '')}
						>Semua Kelas</li>
						{
							classStudentData.map((e,i)=>{
								return(
									<li 
										key={i} 
										onClick={()=>clickClass(e.class_name,e.code_class)}
										className={filterAssignment.class === e.code_class? style.active: ""}
									>
									{e.class_name}
									</li>
								)
							})
						}
					</ul>
				</div>
			
			</div>
			
			<h2 className={style.title}>Tugas Diterima</h2>
		</div>
		<div className={style.content}>
			<div className={style.header}>
				<div className={style.filter}>
					<div className={`${style.setOption} setOption`}>{className}</div>
					<ul className={`${style.option} option`}>
						<li onClick={()=>clickClass('Semua Kelas', '')}>Semua Kelas</li>
						{
							classStudentData.map((e,i)=><li key={i} onClick={()=>clickClass(e.class_name,e.code_class)}>{e.class_name}</li>)
						}
					</ul>
				</div>
			</div>
			<div className={style.assignments}>
				{
					(function(){
						if(assignmentDatas.status === reqStatus.processing || assignmentDatas.status === reqStatus.idle){
							return ""
						}
						if(assignmentDatas.rowCount){
							return assignmentDatas.data.map((e,i)=>{
						
								const status = filterAssignment.status
								const dateToTime = (new Date(e.date)).getTime()
								const durationToTime =  (new Date(e.date)).getTime() + e.duration
								
								return <Link to={`../c/${e.class.code_class}/m/${e.matter.id_matter}/assignment/${e.id_matt_ass}`} key={i} className={`${style.singleAssignment} ${style[status]}`}>
									<p className={style.created}>Dibuat <span>{formateDate(e.date, "id-ID", {weekday: 'long', month: 'short', day: '2-digit', year: 'numeric'})}</span></p>
									<div className={style.detail}>
										<p className={style.title}>{e.title}</p>
										<p className={style.className}>{e.class.class_name}</p>
										
										{
											status === 'done'?
												<div className={style.deadline}>Jawaban Diserahkan</div>
											:
												<div className={style.deadline}>
												Tenggat: 
												{dateToTime === durationToTime? " -": formateDate(durationToTime, "id-ID", {dateStyle: "medium", timeStyle: "short"})}
												</div>
										}
									</div>
								</Link>
							})
							
						}else{
							return <NoData />
						}
					})()
				}
				
			</div>
			{
				filterAssignment.limit >= assignmentDatas.rowCount?
				"":
				<div className={style.paginContainer}>
					<Pagination
						count={pages}
						page={clickedPage}
						shape="rounded"
						onChange={(event,value)=>{
							dispatch({type: 'change_page', page: value})
						}}
					/>
				</div>
			}
		</div>
	</div>
  )
}
