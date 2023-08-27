import React from 'react';
import { useContext } from '../Context';
import statusList from '../utils/req-status'

//APIs
import { getAll as getClass } from '../api/class';
import { getAll as getClassStudent } from '../api/class-student';

export default function useRefreshClass(){
	
	const { setClassData } = useContext();
	
	return React.useCallback(()=>{
		
		Promise.all([ getClass(), getClassStudent()])
		.then(([{data : dataClasses }, {data: dataClassStudents}])=>{
			
			if(dataClasses.error){
				console.log(dataClasses)
				return setClassData({status: statusList.error})
			}
			if(dataClassStudents.error){
				console.log(dataClassStudents)
				return setClassData({status: statusList.error})
			}
			
			setClassData({
				status: statusList.success,
				data: {
					created_classes: dataClasses.data,
					joined_classes: dataClassStudents.data
				}
			})
			
		})
		
	},[setClassData])
	
}