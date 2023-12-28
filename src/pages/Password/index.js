import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import style from './Password.module.css'
import * as val from '../../validation'

//api
import * as userApi from '../../api/user'

// components
import FormControl from '../../components/FormControl'
import ModalContainer from '../../components/ModalContainer'
import SuccessAlert2 from '../../components/SuccessAlert2'

export default function Password() {
	
	const [ displayAlert, setDisplayAlert ] = React.useState(false)
	const { reset, register, setError, handleSubmit, formState, watch } = useForm({mode: "onChange"})
	const { new_password, retype_password } = watch()
	const { errors, isSubmitSuccessful, isSubmitting, isValid } = formState
	const errorLength = Object.keys(errors).length
	const user = useSelector(s=>s.user.data)
	
	React.useEffect(()=>reset(), [reset, isSubmitSuccessful])
	
	async function submit(input){
		
		delete input.retype_password
		let payload = new FormData()
		
		for (let key in input){
			payload.append(key, input[key])
		}
		
		try{
			const { data } = await userApi.updatePwd(payload, user.user_id)
			
			if(data.error){
				
				if(data.field){
						
					const keys = Object.keys(data.field)
					keys.forEach((key,i)=>{
						
						let message = data.field[key].msg
						setError(key, {type: 'manual', message})
					})
					return ;
				}
				
				setError('password', {type: 'manual', message: data.message})
				return;
			}
			
			setDisplayAlert(true)
			
		}catch(err){
			console.log(err)
		}
		
	}
	
	function ChangePwd(e){
		const message = "Password entered is different"
		if(e.target.value !== retype_password && retype_password && !errors.retype_password) {
			setError('retype_password', {type: 'manual', message})
		}
			
	}
	
	return (
		<>
			<ModalContainer displayed={displayAlert} setDisplayed={setDisplayAlert}>
				<SuccessAlert2 msg="Password Changed" />
			</ModalContainer>
			<form onSubmit={handleSubmit(submit)} className={style.container}>
			
				<div className={style.fieldContainer} >
					<label>Current Password</label>
					<FormControl fontSize="0.9em" width="100%" error={errors.old_password?.message} >
						<input type="password" {...register('old_password', val.password)} />
					</FormControl>	
				</div>
				<div className={style.fieldContainer} >
					<label>New Password</label>
					<FormControl fontSize="0.9em" width="100%" error={errors.new_password?.message} >
						<input type="password" {...register('new_password', {...val.password, onChange:ChangePwd})} />
					</FormControl>	
				</div>
				<div className={style.fieldContainer} >
					<label>Re-Type Password</label>
					<FormControl fontSize="0.9em" width="100%" error={errors.retype_password?.message} >
						<input type="password" {...register('retype_password', val.newpassword(new_password))} />
					</FormControl>	
				</div>
				
				<div className={style.buttons}>
					<button className={style.save} disabled={isSubmitting || errorLength || !isValid}>Save</button>
				</div>
				
			</form>
		</>
	)
}
