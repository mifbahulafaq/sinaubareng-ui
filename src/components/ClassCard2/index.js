import { memo } from 'react';
import { Link } from 'react-router-dom';
import style from './ClassCard2.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//utils
import strLimit from '../../utils/strLimit';

export default memo(function ClassCard2({classData}){
	return (
		<div className={style.container}>
			<div className={style.detail}>
				<h3>{classData.class_name}</h3>
				<p>{classData.description}</p>
				<FontAwesomeIcon icon="ellipsis-vertical" />
			</div>
			<div className={style.btn}>
				<FontAwesomeIcon icon="users" />
				<FontAwesomeIcon icon={['far','file']} />
			</div>
		</div>
	)
})