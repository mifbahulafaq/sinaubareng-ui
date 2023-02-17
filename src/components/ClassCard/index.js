import { memo } from 'react';
import { Link } from 'react-router-dom';
import style from './ClassCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../Image';

//utils
import strLimit from '../../utils/strLimit';

export default memo(function ClassCard({classStudentData}){
	
	return (
		<div className={style.container}>
			<div style={{background: classStudentData.color}} className={style.user}>
				<div className={style.image}>
					<Image src="images/user.png" />
				</div>
				<span>{strLimit(classStudentData.tname,0,15)}</span>
				<FontAwesomeIcon icon="ellipsis-vertical" />
			</div>
			<div className={style.class}>
				<div className={style.detail}>
					<Link to={"c/"+classStudentData.code_class}><h3>{classStudentData.class_name}</h3></Link>
					<p>{strLimit(classStudentData.description,0,120)}</p>
				</div>
				<div className={style.btn}>
					<FontAwesomeIcon icon={['far','file']} title="Document" />
					<FontAwesomeIcon icon={['far','folder-open']} title="Tugas" />
				</div>
			</div>
		</div>
	)
})