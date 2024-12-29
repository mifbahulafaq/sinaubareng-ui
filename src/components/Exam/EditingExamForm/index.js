import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import ExamForm from '../ExamForm';
//apis
import * as examApi from '../../../api/exam';
//utils
import formatDate from '../../../utils/id-format-date';

function EditingExamForm({
		singleExam,
		display,
		setDisplay,
		refreshExam
	}){
	
	const defaultValues = React.useMemo(()=>{
		
		if(!singleExam) return {};
		let { text, schedule, attachment } = singleExam;
		
		attachment = attachment?.length? { 0: { filename: attachment[0], name: attachment[1]}} : {}
		schedule = new Date(schedule);
		
		const duration = {
			date:"",
			time : "00:00:00"
		}
		
		if(parseInt(singleExam.duration)){

			const date = new Date(schedule.getTime() + parseInt(singleExam.duration));
			duration.date = formatDate(date, 'en-CA',{dateStyle: 'short'});
			duration.time = formatDate(date, 'en-GB',{timeStyle: 'short'}) + ":00";
		}
		
		return {
			text,
			attachment,
			schedule: {
				date: formatDate(schedule, 'en-CA',{dateStyle: 'short'}),
				time : formatDate(schedule,'en-GB',{timeStyle: 'short'}) + ":00"
			},
			duration
		}
		
	}, [singleExam])
	
	const formHandling = useForm({
		mode: "onChange",
		defaultValues
	});
	const { formState, watch } = formHandling;
	const { errors, isValid, isSubmitting, dirtyFields } = formState;
	const dirtyFieldArr = Object.keys(dirtyFields);
	const disabledSubmit = errors.attachment || !isValid || isSubmitting || !dirtyFieldArr.length;
	
	async function submit(input){
		
		const payload = input;
		payload.schedule = payload.schedule.date+ " " + payload.schedule.time;
		
		if(payload?.duration?.date.length){
			
			const fullScheduleDate = new Date(payload.schedule)
			const fullDurationDate = new Date(payload.duration.date+" "+payload.duration.time)
			
			if(fullDurationDate <= fullScheduleDate){
				payload.duration = 0;
			}else{
				payload.duration = fullDurationDate.getTime() - fullScheduleDate.getTime()
			}
			
		}else{
			payload.duration = 0;
		}
		
		let formData = new FormData()
		
		dirtyFieldArr.forEach((key)=>{
			
			if(key === 'attachment'){
				if(!payload.attachment[0]){
					formData.append(key, 'null')
				}else{
					formData.append(key, payload.attachment[0])
				}
			}else{
				formData.append(key, payload[key])
			}
		})
		
		const { data } = await examApi.edit(singleExam.id_exm, formData);
		
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

EditingExamForm.propTypes = {
	 refreshExam: PropTypes.func,
	 setDisplay: PropTypes.func, 
	 display: PropTypes.bool,
	 singleExam: PropTypes.object
}

export default React.memo(EditingExamForm);