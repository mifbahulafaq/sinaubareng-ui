import style from './NumberOfWeek.module.css';
import { useDayRender } from 'react-day-picker';

export default function NumberOfWeek(props){
	console.log(props)
	return(
		<div style={{background: 'red'}} className={style.wrapper}>
			dsaads
		</div>
	)
}

// InputDate.propTypes = {
	// margin: PropTypes.string,
	// fontSize: PropTypes.string,
	// initialText:PropTypes.string,
	// width: PropTypes.string,
	// minDate: PropTypes.string,
	// dateInput: PropTypes.string,
	// timeInput: PropTypes.string,
	// dateRegistration: PropTypes.object.isRequired,
	// timeRegistration: PropTypes.object.isRequired,
	// active: PropTypes.bool,
// }
// InputDate.defaultProps = {
	// margin: "0",
	// fontSize: "1rem",
	// initialText: "-",
	// width: "100%",
	// minDate: "",
	// active: PropTypes.bool,
// }