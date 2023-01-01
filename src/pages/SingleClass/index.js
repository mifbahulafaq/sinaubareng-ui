import React from 'react';
import style from './SingleClass.module.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config'
import { useContext } from '../../Context'

//APIs
import * as classDiscuss from '../../api/class-discussion';
import * as classes from '../../api/class';
import * as fetchMatter from '../../api/matter';
import * as fetchExam from '../../api/exam';

//components
import Image from '../../components/Image';
import SingleClassCard from '../../components/SingleClassCard';

export default React.memo(function SingleClass() {
	
	const params = useParams();
	const { singleClass } = useContext()
	const [ discussData, setDiscussData ] = React.useState([]);
	const [ examMatter, setExamMatter ] = React.useState({
		matter: {},
		exam: {}
	});
	
	const [ textInput, setTextInput ] = React.useState('');
	const textInputElement = React.useRef(null)
	
	const fetchDiscuss = React.useCallback( async ()=>{
		
		const { data } = await classDiscuss.getAll(params.code_class);
		if(data.error) return console.log(data)
		setDiscussData(data.data);
	
	},[params.code_class])
	
	React.useEffect(()=>{
		
		fetchDiscuss();
		Promise.all([
			fetchExam.getAll(params.code_class, {latest:1}),
			fetchMatter.getAll(params.code_class, {latest:1})
		])
		.then(([{ data: examResult }, { data: matterResult } ])=>{
			if(examResult.error){
				console.log(examResult)
				return ;
			}
			if(matterResult.error){
				console.log(matterResult)
				return ;
			}
			setExamMatter({
				exam: examResult.data[0],
				matter: matterResult.data[0]
			})
		})
		.catch(err=>console.log(err))
		
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
		
		const { data } = await classDiscuss.add(payload);
		
		if(data.error) {
			return console.log(data);
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
	
  return (
	<div className={style.container}>
		<div className={style.detail} >
			<div className={style.title}>
				<h1>{singleClass.class_name}</h1>
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
						}
						
						let sortDateElement =  date.getDate() !== previousDate?.getDate() ?
							<div className={`${style.sortDate} ${hiddenDiv? style.hidden: ""}`} ><span>{sortDate}</span></div>:
							"";
						
						if(data.user === singleClass.teacher){
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
									<span className={style.name}>Mifbhaul afaq, {formatDate}</span>
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
	</div>
  )
})
