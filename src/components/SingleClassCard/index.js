import { Link } from 'react-router-dom';
import style from './SingleClassCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import timeFormat from '../../utils/times';

export default function SingleClassCard({ data, matter }){
	
	const locale = 'en-GB';
	const option = { dateStyle:'short', timeStyle: 'short'};
	
	const attachment = data?.attachment? Array.isArray(data.attachment)? data.attachment.length: 1 : '-';
	const schedule = data?.schedule? new Date(data.schedule).toLocaleString(locale, option): '';
	
	return (
		<div className={style.container} >
			<h4>{matter?'Materi Mendatang':'Ujian Mendatang'}</h4>
			{
				data?.id_matter || data?.id_exm?
				<>
					<h3>{data?.name}</h3>
					<div className={style.detail}>
						<ul className={style.icon}>
							<li>
								<FontAwesomeIcon icon={['far', 'calendar']} />
								<span>{schedule}</span>
							</li>
							{
								!matter?
								<li>
									<FontAwesomeIcon icon={['far', 'clock']} />
									<span>{timeFormat(data?.duration)}</span>
								</li>
								:""
							}
							<li>
								<FontAwesomeIcon icon={['far', 'file-lines']} />
								<span>{attachment} Files</span>
							</li>
						</ul>
						<Link 
							to={`${matter?'m':'e'}/${matter?data.id_matter:data.id_exm}`} 
							className={`${style.getin} ${data.id_matter || data.id_exm? "": style.disabled}`} 
						>Get In</Link>
					</div>
				</>
				:
				<p className={style.nodata}>Tidak ada {matter?"materi":"ujian"} mendatang</p>
			}
		</div>
	)
}

SingleClassCard.defaultProps = {
	matter: false
}