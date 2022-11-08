import React from 'react';
import style from './Matter.module.css';
import 'react-calendar/dist/Calendar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

//components
import PreviousLink from '../../components/PreviousLink';
import MatterForm from '../../components/MatterForm'
import Calendar from 'react-calendar';
//utils
import formatDate from '../../utils/id-format-date'

//APIs
import * as matterApi from '../../api/matter';


export default React.memo(function Matter() {
	
	const [matters, setMatters] = React.useState([]);
	const [comments, setComments] = React.useState([]);
	const [ matterForm, setMatterForm ] = React.useState(false)
	const [ date, setDate ] = React.useState(null)
	
	const params = useParams();
	
	const getMatters = React.useCallback(()=>{
		matterApi.getAll(params.code_class, {date})
		.then(res=>{
			const { data : matters } = res;
			if(matters.error) return console.log(matters.message);
			setMatters(matters.data);
		})
	},[params.code_class, date])
	
	React.useEffect(()=>{
		getMatters();
	},[getMatters])
	
	function displayMatterForm(bool){
		setMatterForm(bool)
	}
	console.log(date)
  return (
	<>
		<div className={style.container}>
		
			<div className={style.calendarContainer} >
				<div className={style.previousLink} >
					<PreviousLink to="../119" name="PHP Dasar" />
				</div>
				<Calendar value={date} onChange={value=>setDate(value)} />
				<div className={style.repeat}>
					<div className={style.icon} onClick={()=>setDate(null)}>
						<FontAwesomeIcon icon="repeat" />
					</div>
				</div>
			</div>
			
			<div className={style.matterContainer}>
			
				<div className={style.top}>
					<div className={style.label}>
						<div className={style.icon}> <FontAwesomeIcon icon={['far', 'calendar-days']} /> </div>
						<span>Materi</span>
					</div>
					<div onClick={()=>displayMatterForm(true)} className={style.add}>
						<span>+</span>
						<span>Tambah Materi</span>
					</div>
				</div>
				
				<div className={style.matters}>
					{
						!matters.length?
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
							return <div key={i} className={style.singleMatter}>
								<div className={style.detail}>
									<h2 className={style.title} >{e.name}</h2>
									<p className={style.date} >
										{formatDate(e.schedule, "id-ID",{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
									</p>
									<p className={style.desc} > {e?.description}</p>
									<div className={style.comm}>{e.total_comments} Comments</div>
								</div>
								<div className={style.cover} />
								<Link to={""+e.id_matter} >
									<FontAwesomeIcon icon="arrow-up" />
								</Link>
							</div>
						})
					}
					
					
				</div>
				
			</div>
		</div>
		
		<div className={style.hideAdd} />
		<div className={`${style.addMatter} ${matterForm?style.open:''}`}>
			<div className={style.header}>
				<div className={style.left}>
					<FontAwesomeIcon icon={['far', 'file-alt']} />
					<h2>Materi</h2>
				</div>
				<div className={style.right}>
					<FontAwesomeIcon onClick={()=>displayMatterForm(false)} icon="plus" />
				</div>
			</div>
			<div className={style.formContainer}>
				<MatterForm displayMatters={getMatters} display={displayMatterForm} />
			</div>
		</div>
	</>
  )
})
