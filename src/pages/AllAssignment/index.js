import React from 'react';
import style from './AllAssignment.module.css';
import { Link } from 'react-router-dom'
import { assignmentFilter } from '../../reducers'

//components
import Pagination from '../../components/Pagination'
//apis
import * as assApi from '../../api/matt-ass'
import * as classStudentApi from '../../api/class-student'
//utils
import formateDate from '../../utils/id-format-date'

export default function AllAssignment() {
	
	const [ classStudentData, setClassStudentData ] = React.useState([])
	const [ assignmentDatas, setAssignmentDatas ] = React.useState({data: [], rowCount: 0})
	const [ className, setClassName ] = React.useState('Semua Kelas')
	const [ filterAssignment, dispatch ] = React.useReducer(assignmentFilter, {
		status: 'none',
		by: 'student',
		class: "",
		skip: 0,
		limit: 4
	})
	
	React.useEffect(()=>{
		
		Promise.all([assApi.getAll(filterAssignment), classStudentApi.getAll()])
		.then(([ { data: assData }, { data: classStudentData }])=>{
			
			if(assData.error || classStudentData.error ) {
					
				console.log(assData)
				console.log(classStudentData)
				return
			}
			setAssignmentDatas(assData)
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
	
  return (
	<div className={style.container}>
		<div className={style.menuContainer}>
			<ul>
				<li onClick={()=>clickStatus('none')} className={filterNav('none')} >Tidak Ada</li>
				<li onClick={()=>clickStatus('expired')} className={filterNav('expired')}>Terlambat</li>
				<li onClick={()=>clickStatus('done')} className={filterNav('done')}>Selesai</li>
			</ul>
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
					assignmentDatas.data.length?"":<p>No Data</p>
				}
				{
					assignmentDatas.data.map((e,i)=>{
						
						const status = filterAssignment.status
						const dateToTime = (new Date(e.date)).getTime()
						const durationToTime =  (new Date(e.date)).getTime() + e.duration
						
						return <Link to={`../c/${e.class.code_class}/m/${e.matter.id_matt}/assignment/${e.matter.id_matt_ass}`} key={i} className={`${style.singleAssignment} ${style[status]}`}>
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
				}
				
			</div>
			{
				filterAssignment.limit >= assignmentDatas.rowCount?
				"":
				<div className={style.paginContainer}>
					<Pagination 
						rowCount={assignmentDatas.rowCount} 
						dispatch={dispatch}  
						limit={filterAssignment.limit}  
						skip={filterAssignment.skip} 
						hidden_total={2} 
					/>
				</div>
			}
		</div>
	</div>
  )
}
