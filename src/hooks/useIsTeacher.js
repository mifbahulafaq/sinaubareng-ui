import { useSelector } from 'react-redux'

export default function useIsTeacher(teacherId){
	
	return useSelector(({ user })=> teacherId?  teacherId === user.data.user_id: false )
}