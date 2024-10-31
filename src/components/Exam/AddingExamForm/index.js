import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import ExamForm from '../ExamForm';
//apis
import * as examApi from '../../../api/exam';

function AddingExamForm({
		display,
		setDisplay,
		refreshExam,
		codeClass
	}){
	
	const defaultValues = React.useMemo(()=>{
		
		return {
			text: "",
			attachment: {},
			schedule: {
				date: "",
				time : '00:00'
			},
			duration: {
				date: "",
				time : '00:00'
			},
			code_class: codeClass
		}
	}, [codeClass])
	
	const formHandling = useForm({
		mode: "onChange",
		defaultValues
	});
	const { formState } = formHandling;
	const { errors, isValid, isSubmitting } = formState;
	const disabledSubmit = errors.attachment || !isValid || isSubmitting;
	
	async function submit(input){
		
		// return console.log(input)
		const payload = input;
		payload.schedule = payload.schedule.date+ " " + payload.schedule.time;
		
		if(payload?.duration?.date.length){
			
			const fullScheduleDate = new Date(payload.schedule)
			const fullDurationDate = new Date(payload.duration.date+" "+payload.duration.time)
			
			if(fullDurationDate <= fullScheduleDate){
				delete payload.duration
			}else{
				payload.duration = fullDurationDate.getTime() - fullScheduleDate.getTime()
			}
			
		}else{
			delete payload.duration
		}
		
		let formData = new FormData()
		
		//set form data
		for(let key in payload){
			
			if(key === "attachment"){
				
				if(payload[key][0]) formData.append(key, payload[key][0]);
				
			}else{
				
				formData.append(key, payload[key])
			}
			
		}
		// console.log(formData.get('attachment'))
		const { data } = await examApi.add(formData)
		
		if(data.error) return console.log(data)
			
		setDisplay(false)
		refreshExam()
	}
	
	return <ExamForm
		defaultValues={defaultValues}
		useForm={formHandling}
		disabledSubmit={disabledSubmit}
		submit={submit}
		display={display}
		setDisplay={setDisplay}
	/>
}

AddingExamForm.propTypes = {
	 refreshExam: PropTypes.func, 
	 codeClass: PropTypes.number,
	 setDisplay: PropTypes.func, 
	 display: PropTypes.bool
}

export default React.memo(AddingExamForm);