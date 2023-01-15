import React from 'react';
import style from './AllAssignment.module.css';

//components
import Pagination from '../../components/Pagination'
//apis
import * as assApi from '../../api/matt-ass'
import * as classApi from '../../api/class'

export default function AllAssignment() {
	
	const [ classData, setClassData ] = React.useState([])
	const [ assignmentDatas, setAssignmentDatas ] = React.useState([])
	const [ filterAssignment, setFilterAssignment ] = React.useState({
		by: 'student'
	})
	
	React.useEffect(()=>{
		
		const filterClass = {by:"student"}
		Promise.all([assApi.getAll(filterAssignment), classApi.getAll(filterClass)])
		.then(([ { data: assData }, { data: classData }])=>{
			if(assData.error || classData.error ) {
					
				console.log(assData)
				console.log(classData)
				return
			}
			setAssignmentDatas(assData.data)
			setClassData(classData.data)
		})
		.catch(err=>console.log(err))
	},[])
	console.log(assignmentDatas)
  return (
	<div className={style.container}>
		<div className={style.menuContainer}>
			<ul>
				<li className={style.active} >Tidak Ada</li>
				<li>Terlambat</li>
				<li>Selesai</li>
			</ul>
			<h2 className={style.title}>Tugas Diterima</h2>
		</div>
		<div className={style.content}>
			<div className={style.header}>
				<div className={style.filter}>
					<div className={`${style.setOption} setOption`}>PHP Dasar</div>
					<ul className={`${style.option} option`}>
						{
							classData.map((e,i)=><li key={i}>{e.class_name}</li>)
						}
					</ul>
				</div>
			</div>
			<div className={style.assignments}>
				<div className={`${style.singleAssignment} ${style.isOver}`}>
					<p className={style.created}>Dibuat <span>Selasa, 14 Apr 2017</span></p>
					<div className={style.detail}>
						<p className={style.title}>Tugas membuat fungsi pada PHP</p>
						<p className={style.className}>Teknik Informatika 2017</p>
						<div className={style.deadline}>Tenggat: 13 Apr 2020 20.45</div>
					</div>
				</div>
				<div className={`${style.singleAssignment} ${style.done}`}>
					<p className={style.created}>Dibuat <span>Selasa, 14 Apr 2017</span></p>
					<div className={style.detail}>
						<p className={style.title}>Tugas membuat fungsi pada PHP</p>
						<p className={style.className}>Teknik Informatika 2017</p>
						<div className={style.deadline}>Jawaban Diserahkan</div>
					</div>
				</div>
				<div className={style.singleAssignment}>
					<p className={style.created}>Dibuat <span>Selasa, 14 Apr 2017</span></p>
					<div className={style.detail}>
						<p className={style.title}>Tugas membuat fungsi pada PHP</p>
						<p className={style.className}>Teknik Informatika 2017</p>
						<div className={style.deadline}>Tenggat: 13 Apr 2020 20.45</div>
					</div>
				</div>
			</div>
			<div className={style.paginContainer}>
				<Pagination />
			</div>
		</div>
	</div>
  )
}
