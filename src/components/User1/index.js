import React from 'react';
import style from './User1.module.css';
import PropTypes from 'prop-types'

//components
import Image from '../Image'

function User1({src, name}){
	// return name and photo only
	
	return (
		<div className={style.container}>
			<div className={style.photo}>
				<Image src={src} />
			</div>
			<div className={style.name}>{name}</div>
		</div>
	)
}

User1.propTypes = {
	src: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default React.memo(User1)