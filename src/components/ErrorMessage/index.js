import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import style from './ErrorMessage.module.css';

function ErrorMessage({ message }){
	return <div className={style.container} >
		<FontAwesomeIcon icon="warning" />
		<span>{message}</span>
	</div>
}

ErrorMessage.propTypes = {
	message: PropTypes.string
}

export default ErrorMessage;