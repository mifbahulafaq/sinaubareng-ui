import React from 'react';
import style from './RowOfDaypicker.module.css';
import { useDayPicker, Row, useSelectSingle } from 'react-day-picker';
import { format } from 'date-fns';

export default function RowOfDaypicker(props){
	
	const [ days, setDays ] = React.useState([]);
	const { selected, today, ...others } = useDayPicker();
	const selectSingle = useSelectSingle();
	// console.log(others)
	const today2 = React.useMemo(()=>format(new Date(), 'MM/dd/yyyy'), [today])
	const dates2 = React.useMemo(()=>props.dates.map(e=>format(e, 'MM/dd/yyyy')), [props.dates])
	const selected2 = React.useMemo(()=>selected && format(selected, 'MM/dd/yyyy'), [selected])
	
	return dates2.includes(selected2 || today2)? <Row {...props} />: <></>
	// return <Row {...props} />
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