import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function GuardComponent({children, teacherId}){
	
	const user = useSelector(s=>s.user.data)
	
	return <>
		{
			user.user_id === teacherId
			?children
			:""
		}
	</>
}

GuardComponent.propTypes = {
	teacherId: PropTypes.number.isRequired
}