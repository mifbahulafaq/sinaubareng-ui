import React from 'react';
import PropTypes from 'prop-types';
import css from './DocumentAnswer.module.css';

import getExt from '../../utils/getExt';

function DocumentAnswer({ error, name, className }){
	
	const style = { ...css, ...className};
	const ext = React.useMemo(()=>getExt(name), [name]);
	
	return (
		<div className={`${style.container} ${error?style.error:""}`}>
			<div
				className={`${style.icon} ${style[ext]}`}
			>
				{ext === 'pdf'?"P":"W"}
			</div>
			<span className={style.name}>{name}</span>
		</div>
	)
}

DocumentAnswer.propTypes = {
	error: PropTypes.bool,
	name: PropTypes.string.isRequired
}

export default React.memo(DocumentAnswer);