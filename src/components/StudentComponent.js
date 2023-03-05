import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function StudentComponent({children, teacherId}){
	
	const user = useSelector(s=>s.user.data)
	
	return <>
		{
			user.user_id !== teacherId
			?children
			:""
		}
	</>
}

StudentComponent.defaultProps = {
	teacherId: 0
}
StudentComponent.propTypes = {
	teacherId: PropTypes.number.isRequired
}

export default React.memo(StudentComponent)