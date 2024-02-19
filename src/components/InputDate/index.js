import style from './InputDate.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//utils
import formatDate from '../../utils/id-format-date';

export default function InputDate({
	margin,
	fontSize,
	width,
	minDate,
	dateInput, 
	timeInput,
	dateRegistration,
	timeRegistration,
	active
}){
	
	
	return(
		<div style={{width, fontSize, margin}} className={style.inputDate}>
			<div style={{fontSize}} className={`${style.setOption} ${active ?"":style.disabled} setOption`}>
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
			
			<div onClick={e=>e.stopPropagation()} className={`${style.opt} ${active ?"option":""}`}>
				<div className={style.desc} > Tanggal & Waktu</div>
				<div className={style.formOpt}>
					<div className={style.date}>
						<FontAwesomeIcon icon={['far','calendar-alt']} />
						<div className={style.content} >
							{ dateInput && dateInput.length ? formatDate(dateInput,"id-ID", {dateStyle:"medium"}) : "Masukkan tanggal"}
						</div>
						<input 
							type="date"
							min={minDate}
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

InputDate.propTypes = {
	margin: PropTypes.string,
	fontSize: PropTypes.string,
	width: PropTypes.string,
	minDate: PropTypes.string,
	dateInput: PropTypes.string,
	timeInput: PropTypes.string,
	dateRegistration: PropTypes.object.isRequired,
	timeRegistration: PropTypes.object.isRequired,
	active: PropTypes.bool,
}