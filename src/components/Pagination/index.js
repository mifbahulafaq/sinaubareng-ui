import React from 'react';
import style from './Pagination.module.css';
import PropTypes from 'prop-types';

const Pagination =  React.memo(({error, ...rest})=>{
	return (
		<ul className={style.container}>
			<li></li>
			<li className={style.active}>1</li>
			<li>20</li>
			<li>...</li>
			<li>200</li>
			<li></li>
		</ul>
	)
})

Pagination.defaultProps = {
	error: false
}
Pagination.propTypes = {
	error: PropTypes.bool
}

export default Pagination;