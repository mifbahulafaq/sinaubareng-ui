import React from 'react';
import style from './Schedule.module.css';
import { useParams } from 'react-router-dom'
import { useContext } from '../../Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import PreviousLink from '../../components/PreviousLink';
//pages
import ServerError from '../ServerError'
//APIs
import * as fetchSchedule from '../../api/schedule';


export default React.memo(function Schedule() {
	
	const { singleClass } = useContext()
	const params = useParams();
	const [ error, setError ] = React.useState(null)
	const [ scheduleDatas, setScheduleDatas ] = React.useState(null)
	
	React.useEffect(()=>{
		
		fetchSchedule.getSchedules(params.code_class)
		.then(({ data: schedulesResult})=>{
			
			if(schedulesResult.error){
				console.log(schedulesResult)
				setError(schedulesResult)
				return ;
			}
			
			let initialValue = [[],[],[],[],[],[],[]]
			schedulesResult.data.forEach(e=>{
				initialValue[parseInt(e.day)] = [...initialValue[parseInt(e.day)], e]
			})
			
			setScheduleDatas(initialValue)
			
		})
		.catch(err=>{
			console.log(err)
			setError(err)
		})
	}, [params.code_class])
	
  return (
	<div className={style.container}>
		<div className={style.previousLink} >
			<PreviousLink to=".." name={singleClass.class_name} />
		</div>
		<table>
			<thead>
				<tr>
					<th className={style.title} colSpan={7}>Jadwal Pengingat</th>
				</tr>
				<tr>
					<th>Minggu</th>
					<th>Senin</th>
					<th>Selasa</th>
					<th>Rabu</th>
					<th>Kamis</th>
					<th>Jumat</th>
					<th>Sabtu</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				{
					scheduleDatas?.map((e1,i1)=>{
						return <td key={i1} >
						<div className={style.timeWrapper}>
							{
								e1.map((e2,i2)=>{
									
									const date = new Date((new Date()).toDateString()+ " " + e2.time)
									
									return <span key={i2} className={style.time}>{date.toLocaleString('en-US', {timeStyle: 'short'})}</span>
								})
							}
						</div>
					</td>
					})
				}
					
					
				</tr>
			</tbody>
		</table>
	</div>
  )
})
