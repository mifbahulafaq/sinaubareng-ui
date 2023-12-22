import { memo } from 'react';
import { Link } from 'react-router-dom';
import style from './ClassCard2.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

//utils
import strLimit from '../../utils/strLimit';

const ClassCard2 = function({classData, width}){
	
	return (
		<div style={{borderTop: `3px solid ${classData.color}`, width }} className={style.container}>
			<div className={style.detail}>
				<Link to={"/c/"+classData.code_class}><h3>{strLimit(classData.class_name,0,13)}</h3></Link>
				<div className={style.desc} >{strLimit(classData.description,0,120)}</div>
			</div>
			<div className={style.btn}>
				<Link replace={true} to={`c/${classData.code_class}/u`}>
					<FontAwesomeIcon title="Orang" icon="users" />
				</Link>
			</div>
		</div>
	)
}

ClassCard2.propType = {
	width: PropTypes.string
}
ClassCard2.defaultProps = {
	width: "300px"
}

export default memo(ClassCard2)