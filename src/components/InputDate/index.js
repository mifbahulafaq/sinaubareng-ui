import style from './InputDate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//utils
import formatDate from '../../utils/id-format-date';

export default function InputDate(
	dateInput, 
	timeInput,
	defaultDateInput,
	dateRegistration,
	timeRegistration,
	active
){
	
	
	return(
		<div className={style.inputDate}>
			<div className={`${style.setOption} setOption`}>
				<span className={style.value} >
					{
						dateInput?
						formatDate(
							dateInput+" "+timeInput,
							"id-ID",
							{weekday:"long",  month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"}
						)
						:
						active? "Tidak ada jadwal": "-"
					}
				</span>
			</div>
			
			<div onClick={e=>e.stopPropagation()} className={`${style.opt} option`}>
				<div className={style.desc} > Tanggal & Waktu</div>
				<div className={style.formOpt}>
					<div className={style.date}>
						<FontAwesomeIcon icon={['far','calendar-alt']} />
						<div className={style.content} >
							{ dateInput && dateInput.length ? formatDate(dateInput,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
						</div>
						<input 
							type="date"
							min={
								defaultDateInput 
								|| 
								(new Date()).toLocaleString('en-CA',{dateStyle: 'short'})
							}
							{ ...dateRegistration } 
						/>
						
					</div>
					<div className={`${style.time} ${dateInput && dateInput.length?"":style.hidden}`}>
						<FontAwesomeIcon icon={['far','clock']} />
						<div className={style.content} >
							{ timeInput && timeInput.length ? formatDate(dateInput+" "+timeInput,"id-ID", {timeStyle:"short"}) : ""}
						</div>
						<input
							type="time" 
							{ ...timeRegistration } 
						/>
					</div>
				</div>
			</div>
			
		</div>
	)
}