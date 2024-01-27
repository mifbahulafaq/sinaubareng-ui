import { useMemo} from 'react';
import { useForm } from 'react-hook-form';

//compnents
import MatterForm from '../MatterForm';

//apis
import * as apiMatter from '../../api/matter';
//utils
import formatDate from '../../utils/id-format-date';

export default function EditingMatterForm({fetchMatters, setDisplay, display, singleMatter}){
	
	const defaultValues = useMemo(()=>{
		
		const attachment = singleMatter.attachment?.map((e,i)=>({ fileName: e[0], name: e[1]}))
		const schedule = new Date(singleMatter.schedule);
		
		const duration = {
			date:"",
			time : "00:00:00"
		}
		
		if(singleMatter.duration){

			const date = new Date(schedule.getTime() + singleMatter.duration);
			duration.date = formatDate(date, 'en-CA',{dateStyle: 'short'});
			duration.time = formatDate(date, 'en-GB',{timeStyle: 'short'}) + ":00";
		}
		
		return {
			class: singleMatter.class,
			name: singleMatter.name,
			description: singleMatter.description || "",
			id_matter: singleMatter.id_matter,
			status: singleMatter.status,
			schedule: {
				date: formatDate(schedule, 'en-CA',{dateStyle: 'short'}),
				time : formatDate(schedule,'en-GB',{timeStyle: 'short'}) + ":00"
			},
			duration,
			attachment: attachment || []
		}
	}, [singleMatter])
	
	const formHandling = useForm({
		mode: "onChange",
		defaultValues
	});
	const setError = formHandling.setError;
	const { isSubmitting, isValid, isDirty, errors } = formHandling.formState;
	const errorAttachment = errors.attachment?.length;
	const disabledSubmit = errorAttachment || isSubmitting || !isValid || !isDirty;
	
	async function submit(input){
		
		input.schedule = input.schedule.date + " " + input.schedule.time;
		
		if(!input.description.length) delete input.description;
		
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
		// delete input.attachment
		for(let key in input){
			
			if(key === 'attachment'){
				
				let i = 0;
				
				input.attachment.forEach(e=>{
					
					if(e.lastModified){
						
						payload.append('new_attachment',e);
					}else{
						payload.append(`attachment[${i}][name]`,e.name);
						i++;
					}
				})
				
			}else{
				payload.append(key, input[key]);
			}
		}
		// for(let key in input){
			
			// if(key === 'attachment'){
				
				// input.new_attachment = input.attachment.filter(e=>e.lastModified);
				// input.coba = input.new_attachment[0]
				// delete input.new_attachment
				// input.attachment = input.attachment.filter(e=>!e.lastModified);
				
			// }
		// }
		console.log(input)
		try{
			
			const { data } = await apiMatter.edit(input.id_matter, payload);
			
			if(data.error){
				console.log(data)
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
			disabledSubmit={disabledSubmit}
			submit={submit}
	/>
	
}