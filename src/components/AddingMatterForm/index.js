import { useState, useEffect, useMemo} from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'

//compnents
import MatterForm from '../MatterForm';

//apis
import * as apiMatter from '../../api/matter';
//utils
import formatDate from '../../utils/id-format-date';

export default function AddingMatterForm({fetchMatters, setDisplay, display, codeClass}){
	
	const defaultValues = useMemo(()=>{
		return {
			name: "",
			code_class: codeClass,
			status: "active",
			schedule: {
				date: "",
				time : "00:00"
			},
			duration: {
				date:"",
				time : "00:00"
			}
		}
	}, [codeClass])
	
	const formHandling = useForm({
		mode: "onChange",
		defaultValues
	});
	const setError = formHandling.setError;
	const { isSubmitting, isValid, errors } = formHandling.formState;
	const errorAttachment = errors.attachment?.length;
	const disabledSubmit = errorAttachment || isSubmitting || !isValid;
	
	const { state: locState } = useLocation();
	const [ inputSchedule, setInputSchedule ] = useState(null);
	
	useEffect(()=>{
		
		if(!locState?.schedule) return
		
		setInputSchedule(new Date(locState.schedule))
		
	},[locState])
	
	async function submit(input){
		
		console.log(input)
		if(inputSchedule){
			input.schedule = formatDate(inputSchedule, "sv-SE")
		}else{
			input.schedule = input.schedule.date + " " + input.schedule.time;
		}
		console.log(input.description.length)
		//if(!input.description.length) delete input.description;
		
		if(input.duration?.date?.length){
			
			const fullScheduleDate = new Date(input.schedule)
			const fullDurationDate = new Date(input.duration.date+" "+input.duration.time)
			
			if(fullDurationDate <= fullScheduleDate){
				delete input.duration
			}else{
				input.duration = fullDurationDate.getTime() - fullScheduleDate.getTime()
			}
			
		}else{
			delete input.duration;
		}
		
		let payload = new FormData();
		for(let key in input){
			
			if(key === 'attachment'){
				
				input.attachment.forEach(e=>{
					payload.append('attachment',e)
				})
				
			}else{
				payload.append(key, input[key]);
			}
		}
		
		try{
			
			const { data } = await apiMatter.add(payload);
			
			if(data.error){
				
				if(data.field){
					
					const key = Object.keys(data.field)[0];
					setError(key, {type: "manual"});
					return;
					
				}
				
				setError('adding', {type:'manual'});
				return;
				
			}
			
			fetchMatters()
			setDisplay(false)
			
		}catch(err){
			console.log(err)
		}
	}
	
	return <MatterForm 
			fetchMatters={fetchMatters} 
			setDisplay={setDisplay} 
			display={display} 
			defaultValues={defaultValues}
			useForm = {formHandling}
			inputSchedule={inputSchedule}
			setInputSchedule={setInputSchedule}
			disabledSubmit={disabledSubmit}
			submit={submit}
	/>
	
}