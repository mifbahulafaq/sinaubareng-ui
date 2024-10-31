import React from 'react';
import { Link } from 'react-router-dom';
import style from './Assignment.module.css';

import formatDate from '../../../utils/id-format-date';

function Assignment({data, isTeacher}){
	
	const [ tenggat, setTeggat ] = React.useState(undefined);
	
	let additionalClassName =  React.useMemo(()=>{
		
		if(!data) return style.nodata;
	
		if(data.duration){
			
			const rawDuration = new Date((new Date(data.date)).getTime() + data.duration)
			setTeggat(formatDate(rawDuration, "id-ID",{dateStyle:"medium", timeStyle: 'short'}))
			
			if(!isTeacher){
				if(new Date() > rawDuration && Number(data.total_answers) > 0){
					return style.done
				}else if(new Date() > rawDuration && Number(data.total_answers) < 1){
					return style.expired
				}
			}
			
		}
	}, [data, isTeacher])
	
	return(
		<div className={`${style.container} ${additionalClassName}`}>
			{
				!data?
					<p className={style.textInfo} > Tidak ada tugas diberikan</p>
				:
				<>
					<div className={style.cover}/>
					<Link to={`assignment/${data.id_matt_ass}`} ><h4>{data.title}</h4></Link>
					<span className={style.duration} >
						Tenggat: <span>{tenggat? tenggat : "-"}</span>
					</span>
					{
						!isTeacher?
							Number(data.total_answers) > 0?
								<span className={style.answered}>
									Answered 
									<span>&#10004;</span>
								</span>
							:""
						:""
					}
				</>
			}
		</div>
	)
}

export default React.memo(Assignment)