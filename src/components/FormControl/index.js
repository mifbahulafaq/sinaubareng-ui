import style from './FormCntrol.module.css';
import PropTypes from 'prop-types'

export default function FormCntrol({error,children, width, fontSize }){
	
	return <div style={{width: width?width:0, fontSize }} className={style.container}>
		{children}
		<span>{error}</span>
	</div>
}

FormCntrol.propType = {
	
	fontSize: PropTypes.string
	
}

FormCntrol.defaultProps = {
	fontSize: 'initial'
}