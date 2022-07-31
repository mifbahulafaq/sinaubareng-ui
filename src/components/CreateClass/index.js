import React from 'react';
import style from './CreateClass.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from 'react-hook-form';


export default function CreateClass(){
	
	const [ schedule, setSchedule ] = React.useState([[]])
	const [ formClass, setFormClass ] = React.useState(true);
	
	function handleSubmit(e){
		e.preventDefault();
		console.log('handleSubmit')
	}
	
	return (
		<div className={style.container}>
			<h2>Buat Kelas</h2>
			<ul className={style.menu}>
				<li onClick={()=>setFormClass(true)} className={formClass? style.active: ""} >Kelas</li>
				<li onClick={()=>setFormClass(false)} className={!formClass? style.active: ""}>Jadwal</li>
			</ul>
			<form onSubmit={handleSubmit} className={style.form}>
				{
					formClass?
					<>
					<input className={style.input} placeholder="Code Class" />
					<textarea rows="5" className={style.input} placeholder="Keterangan"/>
					</>
					:
					<>
					<span className={style.des}>Atur waktu dan hari untuk mengingatkanmu membuat Jadwal Mareri.</span>
					<div className={style.scheduleRelative}>
						<div className={style.scheduleScroll}>
							{
								schedule.map((current_e,current_i)=>{
									
									function remove(){
										
										let newSchedule = schedule.filter((e,i)=>{
											return current_i!==i;
										})
										setSchedule(newSchedule.length? newSchedule: [[]])
									}
									
									return <div key={current_i} className={style.schedule}>
												<div 
													className={`toggle ${style.input2} ${style.dropdown}`}
													onClick={(e)=>{
														e.currentTarget.classList.toggle(style.active);
														e.stopPropagation();
													}}
												>
													<span className={style.value}>Pilih hari</span>
												</div>
												<input type="time" className={style.input2} />
												<FontAwesomeIcon onClick={remove} className={style.removeTime} icon="xmark" />
												<ul style={{top:`${(current_i+1)*40}px`}} className={style.select}>
													<li>Minggu</li>
													<li>Senin</li>
													<li>Selasa</li>
													<li>Rabu</li>
													<li>Kamis</li>
													<li>Jum'at</li>
													<li>Sabtu</li>
												</ul>
											</div>
								})
							}
							<FontAwesomeIcon onClick={()=>setSchedule([...schedule, []])} className={style.addTime} icon="plus" />
						</div>
					</div>
					</>
				}
				<div className={style.btnContainer}>
					{
					formClass?
					<div type="button" className={style.btn} onClick={()=>setFormClass(false)} >Next</div>
					:
					<button type="submit" className={style.btn} >Submit</button>
					}
				</div>
			</form>
		</div>
	)
}