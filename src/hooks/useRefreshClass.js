import React from 'react';
import { useContext } from '../Context';

//APIs
import { getAll as getClass } from '../api/class';
import { getAll as getClassStudent } from '../api/class-student';

export default function useRefreshClass(){
	
	const { setClassData } = useContext();
	
	return React.useCallback(()=>{
		
		Promise.all([ getClass(), getClassStudent()])
		.then(([{data : dataClasses }, {data: dataClassStudents}])=>{
			
			if(dataClasses.error){
				return console.log(dataClasses)
			}
			if(dataClassStudents.error){
				return console.log(dataClassStudents)
			}
			
			setClassData({
				created_classes: dataClasses.data,
				joined_classes: dataClassStudents.data
			})
			
		})
		
	},[setClassData])
	
}