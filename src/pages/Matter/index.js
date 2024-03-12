import React from 'react';
import style from './Matter.module.css';
import calendarStyling from 'react-day-picker/dist/style.module.css';
import customCalendarStyling from './day-picker.module.css';
import { useContext } from '../../Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
 

//components
import PreviousLink from '../../components/PreviousLink';
import AddingMatterForm from '../../components/AddingMatterForm';
import RowOfDaypicker from '../../components/RowOfDaypicker';
import NumberOfWeek from '../../components/NumberOfWeek';
import MonthOfDaypicker from '../../components/MonthOfDaypicker';
import CustomCaption from '../../components/CustomCaption';
import CustomHeadRow from '../../components/CustomHeadRow';
//pages
import ServerError from '../ServerError'
//utils
import formatDate from '../../utils/id-format-date'
//APIs
import * as matterApi from '../../api/matter';
//hooks
import useIsTeacher from '../../hooks/useIsTeacher'


export default React.memo(function Matter() {
	
	const [matters, setMatters] = React.useState(null);
	const [errorPage, setErrorPage] = React.useState(false);
	const [ matterForm, setMatterForm ] = React.useState(false)
	const [ date, setDate ] = React.useState(null)
	const { singleClass } = useContext()
	const params = useParams();
	const isTeacher = useIsTeacher(singleClass.teacher)
	const { state: urlState } = useLocation();
	
	const dayPickerClassNames = {
		...calendarStyling,
		...customCalendarStyling
	}
	
	const getMatters = React.useCallback(()=>{
		
		matterApi.getAll(params.code_class, {date, latest: 1})
		.then(res=>{
			const { data : matters } = res;
			if(matters.error) return setErrorPage(true);
			setMatters(matters.data);
		})
		.catch(()=>setErrorPage(true))
		
	},[params.code_class, date])
	React.useEffect(()=>{
		if(urlState?.schedule) setMatterForm(true)
	}, [urlState])

	React.useEffect(()=>{
		getMatters();
	},[getMatters])
	
	function displayMatterForm(bool){
		setMatterForm(bool)
	}
	
	if(errorPage) return <ServerError />
	// console.log(DayOfWeek())
  return (
	<>
		<div className={style.container}>
			<div className={style.calendarContainer} >
				<div className={style.previousLink} >
					<PreviousLink to="../.." name={singleClass.class_name} />
				</div>
				<DayPicker 
					mode="single"
					classNames={dayPickerClassNames}
					selected={date}
					onSelect={setDate}
					components={{
						Caption: CustomCaption,
						Row: RowOfDaypicker,
						HeadRow: CustomHeadRow,
					}}
					modifiers={{
						selectedMonth: ''
					}}
					onDayClick={(day, modifiers)=>{
						console.log(day)
					}}
					showOutsideDays
				/>
				
			</div>
			
			<div className={style.matterContainer}>
			
				<div className={style.top}>
					<div className={style.label}>
						<div className={style.icon}> <FontAwesomeIcon icon={['far', 'calendar-days']} /> </div>
						<span>Materi</span>
					</div>
					{
						isTeacher?
						<div onClick={()=>displayMatterForm(true)} className={style.add}>
							<span>+</span>
							<span>Tambah Materi</span>
						</div>
						:""
					}
				</div>
				
				<div className={style.matters}>
					{
						matters?.length === 0?
							<div className={style.emptyData} >
								{
									date === null?
									"Anda belum membuat tugas sama sekali."
									:
									`Tidak ada tugas, pada ${(new Date(date)).toLocaleString("id-ID", {dateStyle:"medium"})}`
								}
							
							</div>
						:
						""
					}
				
					{
						matters?.map((e,i)=>{
							
							const schedule = new Date(e.schedule);
							const isClosed = !isTeacher && new Date() < schedule;
							
							return <div key={i} className={style.singleMatter}>
								<div className={style.detail}>
									<h2 className={style.title} >{e.name}</h2>
									<p className={style.date} >
										{formatDate(e.schedule, "id-ID",{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
									</p>
									<p className={style.desc} > {e?.description?.trim()}</p>
									<div className={style.comm}>{e.total_comments} Comments</div>
								</div>
								<div className={style.cover} />
								<Link 
									className={isClosed? "": style.open} 
									to={isClosed? "./": ""+e.id_matter} 
								>
									<FontAwesomeIcon icon="arrow-up" />
								</Link>
							</div>
						})
					}
					
					
				</div>
				
			</div>
		</div>
		<AddingMatterForm 
			fetchMatters={getMatters} 
			setDisplay={displayMatterForm} 
			display={matterForm} 
			codeClass={params.code_class}
			autoSchedule={urlState?.schedule || ""}
		/>
	</>
  )
})
