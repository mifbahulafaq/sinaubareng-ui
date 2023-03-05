import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function TeacherComponent({children, teacherId}){
	
	const user = useSelector(s=>s.user.data)
	
	return <>
		{
			user.user_id === teacherId
			?children
			:""
		}
	</>
}

TeacherComponent.defaultProps = {
	teacherId: 0
}
TeacherComponent.propTypes = {
	teacherId: PropTypes.number.isRequired
}

export default React.memo(TeacherComponent)