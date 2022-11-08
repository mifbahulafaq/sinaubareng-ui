import style from './PreviousLink.module.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PreviousLink({to, name}){
	return <div className={style.container}>
			<Link to={to} className={style.arrow} />
			<h4><span>Kelas</span> {name}</h4>
		</div>
}

PreviousLink.propTypes = {
	to: PropTypes.string.isRequired
}

