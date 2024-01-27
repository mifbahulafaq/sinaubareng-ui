import React from 'react'
import style from './PreviousLink.module.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PreviousLink = function ({to, name, fontSize }){
	return <div style={{fontSize:fontSize}} className={style.container}>
			<Link to={to} className={style.arrow} />
			<h4><span>Kelas</span> {name}</h4>
		</div>
}

PreviousLink.propTypes = {
	to: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	fontSize: PropTypes.string
}

PreviousLink.defaultProps = {
	fontSize: "1rem"
}

export default React.memo(PreviousLink)


