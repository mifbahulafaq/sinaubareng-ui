import React from 'react';
import style from './GivenAssignment.module.css';
import { Link } from 'react-router-dom'
import { assignmentFilter } from '../../reducers'
import nodataImg from './2958290.jpg';

//components
import Pagination from '../../components/Pagination'
import ImageWithAttribute from '../../components/ImageWithAttribute';
//apis
import * as assApi from '../../api/matt-ass'
import * as classApi from '../../api/class'
//utils
import formateDate from '../../utils/id-format-date'

function NoData(){
	return <div className={style.noData}>
		<ImageWithAttribute 
			height= "220px"
			attrRight={"-5px"}
			imgSrc={nodataImg}
			attrHref="https://www.freepik.com/free-vector/transfer-files-concept-landing-page_5632211.htm#query=file%20sent&position=6&from_view=search&track=ais"
			attrText="Image by Freepik"
		/>
		<p className={style.info} >Have no assigments</p>
	</div>
}

export default function GivenAssignment() {
	
	const [ classData, setClassData ] = React.useState([])
	const [ assignmentDatas, setAssignmentDatas ] = React.useState({data: [], rowCount: 0})
	const [ className, setClassName ] = React.useState('Semua Kelas')
	const [ filterAssignment, dispatch ] = React.useReducer(assignmentFilter, {
		by: 'teacher',
		class: "",
		skip: 0,
		limit: 4
	})
	
	React.useEffect(()=>{
		
		Promise.all([assApi.getAll(filterAssignment), classApi.getAll()])
		.then(([ { data: assData }, { data: classData }])=>{
			console.log(assData)
			if(assData.error || classData.error ) {
					
				console.log(assData)
				console.log(classData)
				return
			}
			setAssignmentDatas(assData)
			setClassData(classData.data)
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
	console.log(assignmentDatas)
  return (
	<div className={style.container}>
		<div className={style.menuContainer}>
			<div className={style.filter}>
				<div className={`${style.setOption} setOption`}>{className}</div>
				<ul className={`${style.option} option`}>
					<li onClick={()=>clickClass('Semua Kelas', '')}>Semua Kelas</li>
					{
						classData.map((e,i)=><li key={i} onClick={()=>clickClass(e.class_name,e.code_class)}>{e.class_name}</li>)
					}
				</ul>
			</div>
			<h2 className={style.title}>Tugas Diberikan</h2>
		</div>
		<div className={style.content}>
			<div className={style.assignments}>
				{
					
					assignmentDatas.data.length?"":<NoData />
				}
				{
					assignmentDatas.data.map((e,i)=>{
						const status = filterAssignment.status
						const dateToTime = (new Date(e.date)).getTime()
						const durationToTime =  (new Date(e.date)).getTime() + e.duration
						
						return <div key={i} className={style.singleAssignment} >
							<Link to={`../c/${e.class.code_class}/m/${e.matter.id_matter}/assignment/${e.id_matt_ass}`} className={style.leftDetail}>
								<p className={style.created}>Dibuat <span>{formateDate(e.date, "id-ID", {weekday: 'long', month: 'short', day: '2-digit', year: 'numeric'})}</span></p>
								<div className={style.midDetail}>
									<p className={style.title}>{e.title}</p>
									<p className={style.className}>{e.class.class_name}</p>
								</div>
							</Link>
							<div className={style.rightDetail}>
								<Link to="#" className={style.ansAmount}><span>{e.total_answers}</span> Jawaban</Link>
								<p className={style.deadline}>
									Tenggat:&nbsp;
									{dateToTime === durationToTime? " -": formateDate(durationToTime, "id-ID", {dateStyle: "medium", timeStyle: "short"})}
								</p>
							</div>
							
						</div>
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
