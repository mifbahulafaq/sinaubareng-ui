import moment from 'moment'

const email = {
		required: { value: true, message: 'This field must be filled' },
		pattern: { value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Invalid email"}
		
	}
const password = {
		required: { value: true, message: 'This field must be filled' },
		minLength: { value: 3, message: 'Must be greater than 3 characters long' },
		maxLength: { value: 255, message: 'Must be less than 255 characters long' },
	}
const newpassword = function(pwd){
	
	return  {
		required: { value: true, message: 'This field must be filled' },
		minLength: { value: 3, message: 'Must be greater than 3 characters long' },
		maxLength: { value: 255, message: 'Must be less than 255 characters long' },
		validate: v => v === pwd || " Password entered is different"
	}
}
const name = { ...password }
const className = { ...password, setValueAs: v=>v.replace(/(^\s*)|(\s*$)/g, "") }
const description = { minLength: password.minLength, maxLength: password.maxLength, setValueAs: v=>v.replace(/(^\s*)|(\s*$)/g, "") }
const description2 = { 
	maxLength: { value: 255, message: 'Must be less than 255 characters long'} 
}
const title = { required: { value: true, message: 'This field must be filled' }, ...description2 }
const gender = {
		required: { value: true, message: 'Choose the gender' }
	}
const day = {
	required: { value: true, message: 'Choose the day' }
}
const time = {
	required: { value: true, message: 'Choose the time' }
}
const time2 = (day)=>{
	return {
		validate: () => Boolean(day) || 'Choose the time'
	}
}
const timeNoTimezone = {
	required: { value: true, message: 'Choose the time' },
	validate: v=>moment.parseZone(v, "HH:mm:ss", true).isValid() || `The format of ${v} isn't a time`,
	setValueAs: v=>{
		if(!v) return;
		return (v).slice(0,5) + ':00'
	}
}
const dateNoTimezone = {
	required: { value: true, message: 'Choose the date' },
	validate: v=> moment.parseZone(v, "YYYY-MM-DD", true).isValid() || `The format of ${v} isn't a date`
}
const codeClass = {
	required: { value: true},
	maxLength: { value: 5, message: 'Must be less than 5 characters long' },
	validate: v=>Number.isInteger(Number(v)) || "Must be number"
}
const userId = {
	required: { value: true},
	maxLength: { value: 6, message: 'Must be less than 6 characters long' },
	validate: v=>{
		return Number.isInteger(Number(v)) || "Must be number"
	}
}
const multipleUpload = (files)=>{
	return {
		setValueAs: v=>{
			
			return true
		}
	}
}

export { 
	dateNoTimezone, 
	timeNoTimezone, 
	email, 
	password, 
	newpassword, 
	name, 
	gender, 
	className, 
	description, 
	day, 
	time, 
	time2, 
	codeClass, 
	userId, 
	description2,
	multipleUpload,
	title
}