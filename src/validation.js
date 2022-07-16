const email = {
		required: { value: true, message: 'This field must be filled' },
		pattern: { value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Invalid email"}
		
	}
const password = {
		required: { value: true, message: 'This field must be filled' },
		minLength: { value: 3, message: 'Must be less than 5 or greater than 255 characters long' },
		maxLength: { value: 255, message: 'Must be less than 5 or greater than 255 characters long' },
	}
const newpassword = function(pwd){
	
	return  {
		required: { value: true, message: 'This field must be filled' },
		minLength: { value: 3, message: 'Must be less than 5 or greater than 255 characters long' },
		maxLength: { value: 255, message: 'Must be less than 5 or greater than 255 characters long' },
		validate: v => v === pwd || 'not the same as the password above'
	}
}
const name = {
		required: { value: true, message: 'This field must be filled' },
		minLength: { value: 3, message: 'Must be less than 5 or greater than 255 characters long' },
		maxLength: { value: 255, message: 'Must be less than 5 or greater than 255 characters long' },
	}

const gender = {
		required: { value: true, message: 'Choose the gender' }
	}

export { email, password, newpassword, name, gender }