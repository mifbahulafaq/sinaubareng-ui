import { memo } from 'react';
import { Link } from 'react-router-dom';
import style from './ClassCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../Image';

//utils
import strLimit from '../../utils/strLimit';

export default memo(function ClassCard({studentData}){
	return (
		<div className={style.container}>
			<div className={style.user}>
				<div className={style.image}>
					<Image src="images/user.png" />
				</div>
				<span>{strLimit(studentData.tname,0,15)}</span>
				<FontAwesomeIcon icon="ellipsis-vertical" />
			</div>
			<div className={style.class}>
				<div className={style.detail}>
					<h3>{strLimit(studentData.class_name,0,13)}</h3>
					<p>{studentData.description}</p>
				</div>
				<div className={style.btn}>
					<FontAwesomeIcon icon={['far','file']} title="Document" />
					<FontAwesomeIcon icon={['far','folder-open']} title="Tugas" />
				</div>
			</div>
		</div>
	)
})