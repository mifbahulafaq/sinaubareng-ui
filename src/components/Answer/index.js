import React from 'react';
import PropTypes from 'prop-types';
import css from './Answer.module.css';


function Answer({ error, name, className }){
	
	const style = { ...css, ...className};
	console.log(css)
	return (
		<div className={`${style.container} ${error?style.error:""}`}>
			<div
				className={`${style.icon} ${style[name.split('.')[name.split('.').length - 1].toLowerCase()]}`}
			>
				{name.split('.')[name.split('.').length - 1].toLowerCase() === 'pdf'?"P":"W"}
			</div>
			<span className={style.name}>{name}</span>
		</div>
	)
}

Answer.propTypes = {
	error: PropTypes.bool,
	name: PropTypes.string.isRequired
}

export default React.memo(Answer);