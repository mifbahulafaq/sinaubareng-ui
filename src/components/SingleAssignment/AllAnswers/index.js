import React from 'react';
import { useParams, Link } from 'react-router-dom';
import style from './AllAnswers.module.css';
import config from '../../../config'

import Image from '../../Image';

import uppercase from '../../../utils/uppercase';
import plural from '../../../utils/plural';
import formatDate from '../../../utils/id-format-date';

import * as answerApi from '../../../api/ass-answer';

function AllAnswers(){
	
	const [ ansData, setAnsData ] = React.useState([])
	const params = useParams();

	React.useEffect(()=>{
		answerApi.getByAss(params.id_matt_ass)
		.then(({ data })=>{
			
			if(data.error){
				throw data.error 
			}
			
			setAnsData(data.data)
		})
		.catch(err=>{throw err})
		
	},[params.id_matt_ass, params.code_class])
	
	return(
		<div className={style.container}>
			{
				ansData.map((e,i)=>{
					
					let created = Date.now() - (new Date(e.date)).getTime();
					
					const days = created / 86400000
					
					if(days > 1 && days < 2){
						created = "Yesterday";
					}else if( days < 1){
						const hours = created / 3600000
						created = `${Math.floor(hours)}hr${plural(hours)} ago `;
					}else{
						created = formatDate(e.date, "id-ID", {dateStyle: "medium", timeStyle: "short"});
					}
					
					return <Link to={`a/${e.id_ass_answer}`} key={i} className={style.singleAnsw}>
						<div className={style.detail}>
							<div className={style.photo } >
								<Image src={e.user.photo?`${config.api_host}/public/photo/${e.user.photo}`:"images/user.png"} />
							</div>
							<div className={style.status}>
								<h5>{uppercase(e.user.name, 0)}</h5>
								<p>{created}</p>
							</div>
						</div>
					</Link>
				})
			}
		</div>
	)
}

export default AllAnswers;