import React from 'react';
import style from './SingleClass.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from '../../Context'
import { useSelector } from 'react-redux'
import classImage from './class.png';

//APIs
import * as classDiscuss from '../../api/class-discussion';
import * as fetchMatter from '../../api/matter';
import * as fetchExam from '../../api/exam';
import * as fetchClass from '../../api/class';
import * as fetchSchedule from '../../api/schedule';

//components
import Image from '../../components/Image';
import SingleClassCard from '../../components/SingleClassCard';
import ModalContainer from '../../components/ModalContainer';
import ImageWithAttribute from '../../components/ImageWithAttribute'

//pages
import ServerError from '../../pages/ServerError'
//hooks
import useRefreshClass from '../../hooks/useRefreshClass'
import useIsTeacher from '../../hooks/useIsTeacher'
import useDay from '../../hooks/useDay'
//utils
import days from '../../utils/days'
import formatDate from '../../utils/id-format-date'
import dayDesc from '../../utils/day_desc'

export default React.memo(function SingleClass(props) {
	
	const navigate = useNavigate()
	const setClasses = useRefreshClass()
	const params = useParams();
	const user = useSelector(s=>s.user)
	const [ error, setError ] = React.useState(null)
	const { singleClass, scheduleClass, setScheduleClass } = useContext()
	const isTeacher = useIsTeacher(singleClass.teacher)
	const [ discussData, setDiscussData ] = React.useState([]);
	const [ scheduleData, setScheduleData ] = React.useState(null);
	const [ searchDate, setSearchDate ] = React.useState(new Date())
	const [ modal, setModal ] = React.useState(false)
	const [ examMatter, setExamMatter ] = React.useState({
		matter: {},
		exam: {}
	});
	
	const textDay = useDay(scheduleData)
	console.log(textDay)
	const textDateTime = React.useMemo(()=>{
		
		if(scheduleData){
			
			const date = new Date(scheduleData)
			
			return date.toLocaleString('id-ID',{ month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'}) 
		}
		return null
		
	}, [scheduleData])
	
	const [ textInput, setTextInput ] = React.useState('');
	const textInputElement = React.useRef(null)
	
	const fetchDiscuss = React.useCallback( async ()=>{
		
		const { data } = await classDiscuss.getAll(params.code_class);
		if(data.error){
			console.log(data)
			return setError(data)
		}
		setDiscussData(data.data);
	
	},[params.code_class])
	
	React.useEffect(()=>{

		if(isTeacher){
			
			const searchDay = searchDate.getDay()
			const searchMS= searchDate.getTime()
			const timeToSearch = searchDate.toLocaleString('en-GB', {timeStyle: 'medium'})
			const filterSchedule = {
				latest: 1,
				day: searchDay, 
				time: timeToSearch,
				limit: 1
			}
			
			fetchSchedule.getSchedules(params.code_class, filterSchedule)
			.then( async ({ data: result})=>{
				console.log(result)
				if(result.error) return console.log(result.error)
				if(result.data.length){
					
					let scheduleResult = result.data[0]
					const { day, time } = scheduleResult
						
					let dayOfSchedule = parseInt(day)
					const oneDay = 86400000
						
					//set day
					dayOfSchedule = dayOfSchedule < searchDay? dayOfSchedule + 7: dayOfSchedule
					scheduleResult = new Date(searchMS + (oneDay * (dayOfSchedule - searchDay)))
					//add time
					scheduleResult = formatDate(scheduleResult, "en-CA", {dateStyle: "short"}) + " " + time
					
					try{
						
						const { data : matter} = await fetchMatter.getAll(params.code_class, {schedule: scheduleResult })
						
						if(matter.error) return console.log(matter.error)
							console.log(matter)
						if(matter.data.length){
							
							let schedule =  new Date(matter.data[0].schedule)
							schedule = new Date(schedule.getTime() + 1000)
							setSearchDate(schedule)
							
						}
						
						setScheduleData(scheduleResult)
						
					}catch(err){
						console.log(err)
					}
					
					
				}
			})
		}
		
	}, [scheduleData, searchDate, isTeacher, scheduleClass, params.code_class])
	React.useEffect(()=>{
		
		fetchDiscuss();
		Promise.all([
			fetchExam.getAll(params.code_class, {cs:1}),
			fetchMatter.getAll(params.code_class, {cs:1})
		])
		.then(([{ data: examResult }, { data: matterResult } ])=>{
			if(examResult.error){
				console.log(examResult)
				setError(examResult)
				return ;
			}
			if(matterResult.error){
				console.log(matterResult)
				setError(matterResult)
				return ;
			}
			
			setExamMatter({
				exam: examResult.data[0],
				matter: matterResult.data[0]
			})
		})
		.catch(err=>{
			console.log(err)
			setError(err)
		})
		
		
	},[params.code_class, fetchDiscuss])
	
	async function discussSubmit(event){
		
		event.preventDefault();
		
		const d = new Date();
		const newDate = [
			d.getFullYear(),
			("0"+(d.getMonth()+1)).slice(-2),
			("0"+d.getDate()).slice(-2)
		]
		const newTime = [
			("0"+d.getHours()).slice(-2),
			("0"+d.getMinutes()).slice(-2),
			("0"+d.getSeconds()).slice(-2)
		]
		const date = newDate.join("-")+" "+ newTime.join(":")+'+07:00';
		
		const payload = {
			code_class: params.code_class,
			date ,
			text: textInput
		}
		
		let formData = new FormData();
			
		for (let key in payload){
			formData.append(key, payload[key])
		}
		
		const { data } = await classDiscuss.add(formData);
		
		if(data.error) {
			console.log(data)
			return setError(data);
		}
		fetchDiscuss();
		textInputElement.current.innerHTML = ""
	}	
	
	function textValid(value){
		if(value.length < 1 || value.length > 255 ){
			return true;
		}
		return false;
	}
	
	async function deleteClass(){
		
		try{
			
			const { data: deleteResult } = await fetchClass.deleteClass(singleClass.code_class)
			
			if(deleteResult.error){
				return console.log('404')
			}
			
			setClasses()
			navigate("/", { replace: true })
			
		}catch(err){
			console.log(err)
		}
	}
	if(error) return <ServerError />
	
  return (
	<div className={style.container}>
	
		{
			isTeacher ?
				textDay > 0?
			<div className={style.scheduleContainer}>
			
				<p className={style.info}>
					Materi Pada Jadwal:
					<span> {dayDesc[textDay]}, {textDateTime}</span>  belum dibuat
				</p>
				<div className={style.nav}>
					<Link 
						to="m"
						className={style.add} 
						state={{
							schedule: scheduleData
						}} 
					>
						Buat Materi
					</Link>
					<Link className={style.scheduleNav} to="s">
						<p>Lihat Semua Jadwal </p>
						<FontAwesomeIcon icon="arrow-right-long" />
					</Link>
				</div>
				<div 
					className={style.hiding} 
					onClick={e=>{
						e.currentTarget.parentElement.classList.toggle(style.off)
					}}/>
			</div>
				:""
			:""
		}
		<div className={style.detail} style={{ background: singleClass.color }} >
			<div className={style.title}>
				<h1>
					{singleClass.class_name} 
					{
						isTeacher?
						<span title="Code"> ( {singleClass.code_class} )</span>
						:""
					}
				</h1>
				<p>{singleClass.description}</p>
			</div>
			<ul className={style.menu} >
				<li>
					<div className={style.icon} ><FontAwesomeIcon icon={["far","file-alt"]} title="Matter" /></div>
					<Link to="m">
						<h4>Materi</h4>
					</Link>
				</li>
				<li>
					<div className={style.icon}><FontAwesomeIcon icon="book-reader" title="Matter" /></div>
					<Link to="e">
						<h4>Ujian</h4>
					</Link>
				</li>
				<li>
					<div className={`${style.icon} ${style.user}`}><FontAwesomeIcon icon={['far', 'user']} title="Orang" /></div>
					<Link to="u">
						<h4>Orang</h4>
					</Link>
				</li>
			</ul>
			{
				isTeacher?
				<div className={style.settingAbsolute}>
					<div title="Setting" className={`${style.settingContainer} setOption`}>
						<div className={style.setting}>
						
							<FontAwesomeIcon icon="gear" />
							
						</div>
					</div>
					<ul className={`${style.settingList} option`} >
						<li onClick={()=>setModal(true)} >Hapus Kelas</li>
					</ul>
				</div>
				:""
			}
		</div>
		
		<div className={style.task} >
			<SingleClassCard data={examMatter.matter} matter={true} />
			<SingleClassCard data={examMatter.exam} />
		</div>
		
		<div className={style.chatting} >
			<div className={style.words}>
			
				{
					discussData.map((data,i)=>{
						
						const previousData = discussData[i-1];
						const previousDate = new Date(previousData?.date);
						
						//this date
						const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
						const today = new Date().getDate();
						const yesterday = today-1;
						
						//the date of discuss data
						const date = new Date(data.date);
						const formatDate = date.toLocaleString('en-US',{hour: '2-digit', minute: '2-digit'});
						let sortDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
						let hiddenDiv = false;
						
						switch(date.getDate()){
							case today:
								sortDate = "Today";
								hiddenDiv = !previousData && true; 
								break;
							case yesterday:
								sortDate = "yesterday"
								break;
							default:
						}
						
						let sortDateElement =  date.getDate() !== previousDate?.getDate() ?
							<div className={`${style.sortDate} ${hiddenDiv? style.hidden: ""}`} ><span>{sortDate}</span></div>:
							"";
						
						if(data.user === user.data?.user_id){
							return <React.Fragment key={i}>
										{
											sortDateElement
										}
										<div className={style.chat2} >
											<p className={style.name}>You, {formatDate}</p>
											<div className={style.text} >
												{data.text}
											</div>
										</div>
						</ React.Fragment>
						}
						
						return <React.Fragment key={i}>
							{
								sortDateElement
							}
							<div className={style.chat1} key={i}>
								<div className={style.photo}>
									<Image src="images/user.png" />
								</div>
								<div className={style.post} >
									<span className={style.name}>{data.name} {data.user === singleClass.teacher? "(Pengajar)": ""}, {formatDate}</span>
									<div className={style.text} >
										{data.text}
									</div>
								</div>
							</div>
						</ React.Fragment>
					})
				}
				
			</div>
			
			<div className={style.sender}>
				<form onSubmit={discussSubmit} >
					<div 
						className={style.customInput}
						contentEditable="true"
						onPaste={e=>e.preventDefault()}
						onKeyPress={e=>{if(e.target.textContent.length > 255 ) return e.preventDefault()}}
						onInput={(e)=>setTextInput(e.target.innerText.replace(/(^\s*)|(\s*$)/g, ""))}
						ref={textInputElement}
					/>
					<span className={style.placeHolder}>Enter your message here</span>
					<button disabled={textValid(textInput)} >
						<span>Send</span>
						<FontAwesomeIcon className={style.sendIcon} icon="paper-plane" />
					</button>
				</form>
			</div>
		</div>
		
		<ModalContainer displayed={modal} setDisplayed={setModal} >
			<div className={style.confirmDeletion}>
				<p className={style.textAlert}>Hapus {singleClass.class_name} ?</p>
				<p className={style.info}>
					Anda tidak dapat mengakses lagi postingan atau komentar apapun yang telah ditambahkan ke kelas ini
				</p>
				<ul className={style.deletionOpt}>
					<li onClick={()=>setModal(false)}>Batal</li>
					<li onClick={deleteClass}>Hapus</li>
				</ul>
			</div>
		</ModalContainer>
		
	</div>
  )
})
