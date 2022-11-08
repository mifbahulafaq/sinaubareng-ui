import React from 'react';
import { useContext } from '../Context';

//APIs
import { getAll as getClass } from '../api/class';
import { getAll as getStudent } from '..//api/student';

export default function useRefreshClass(){
	
	const { setClassData } = useContext();
	
	return React.useCallback(()=>{
		
		Promise.all([getClass(), getStudent()])
		.then(([{data : dataClasses }, { data : dataStudents }])=>{
			
			if(dataClasses.error || dataStudents.error){
				return console.log(dataClasses.message || dataStudents.message)
			}
			
			setClassData({
				classes: dataClasses.data,
				students: dataStudents.data
			})
			
		})
		
	},[setClassData])
	
}