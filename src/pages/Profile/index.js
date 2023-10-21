import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../../features/User/actions'
import style from './Profile.module.css'
import config from '../../config'
import * as val from '../../validation'

//api
import * as userApi from '../../api/user'

// components
import Image from '../../components/Image'
import FormControl from '../../components/FormControl'
import ModalContainer from '../../components/ModalContainer'
import SuccessAlert2 from '../../components/SuccessAlert2'

export default function Profile() {
	
	const { reset, register, setError, handleSubmit, formState, clearErrors } = useForm({reValidateMode: "onSubmit"})
	const { errors, isSubmitSuccessful, dirtyFields, isSubmitting } = formState
	const user = useSelector(s=>s.user.data)
	const dispatch = useDispatch()
	let [ imgSrc, setImgSrc ] = React.useState('')
	const [ displayAlert, setDisplayAlert ] = React.useState(false)
	
	React.useEffect(()=>{

		const { user_id, photo, ...remainder} = user
		
		reset(remainder)
		if(user.photo){
			setImgSrc(`${config.api_host}/public/photo/${user.photo}`)
		}
		
	}, [reset ,user, isSubmitSuccessful])
	
	async function submit(input){
		
		const keys = Object.keys(dirtyFields)
		//console.log(keys)
		//console.log(input)
		//return 
		if(keys.length){
			
			let payload = new FormData()
			input.photo = input.photo?.[0]
			
			for (let key in input){
				if(dirtyFields[key]){
					payload.append(key, input[key])
				}
			}
			
			//return console.log(payload.get('photo'))
			try{
				const { data } = await userApi.update(payload, user.user_id)
				console.log(data)
				if(data.error){
					
					if(data.field){
						
						const keys = Object.keys(data.field)
						keys.forEach((key,i)=>{
							
							let message = data.field[key].msg
							setError(key, {type: 'manual', message})
						})
						return ;
					}
					
					setError('profil', {type: 'manual', message: data.message})
					return;
				}
				
				setDisplayAlert(true)
				dispatch(userActions.add(user.user_id))
				
			}catch(err){
				console.log(err)
			}
			
		}
		
		
	}
	
	function validateFile(e){
		
		for(let key in e.target.files){
			if( key < e.target.files.length ) {
				
				if(e.target.files[key].size > 500000 ) break;
				
				//Showing thumbnail uploaded
				
				const windUrl = window.URL.createObjectURL(e.target.files[key])
				setImgSrc(windUrl)
				
				//OR
				
				// const reader = new FileReader()
				
				//window.URL.revokeObjectURL(windUrl);
				// reader.onload = e=>{
					// setImgSrc(e.target.result)
				// }
				// reader.readAsDataURL(e.target.files[key])
				
			}
		}
	}
	
	function resetError(field){
		if(errors[field]) clearErrors(field)
	}
	function customRegister(field){
		return {...register(field, {...val[field], onChange: ()=>resetError(field)})}
	}
	
	return (
		<>
			<ModalContainer displayed={displayAlert} setDisplayed={setDisplayAlert}>
				<SuccessAlert2 msg="Profil Changed" />
			</ModalContainer>
			<form onSubmit={handleSubmit(submit)} className={style.container}>
				<div className={style.photoContainer}>
					<div className={style.photo}>
						<Image src={imgSrc?imgSrc:'images/user.png'}  />
					</div>
					<p className={style.info} > JPG or PNG no larger than 500 KB </p>
					<div className={style.inputImage}>
						<input {...register('photo', { onChange: validateFile })} type="file" accept=".jpg, .jpeg, .png" />
					</div>
				</div>
				<div className={style.detail}>
				
					<div className={style.fieldContainer} >
						<label>Name:</label>
						<FormControl width="380px" error={errors.name?.message} >
							<input {...customRegister('name')} />
						</FormControl>	
					</div>
					<div className={style.fieldContainer} >
						<label>Email:</label>
						<FormControl width="380px" error={errors.email?.message} >
							<input {...customRegister('email')} />
						</FormControl>	
					</div>
					<div className={style.fieldContainer}>
						<label>Gender:</label>
						<FormControl width="380px" error={errors.gender?.message} >
							<div className={style.radioContainer}>
								<input {...register('gender', val.gender)} value="Male" name="gender" type="radio" placeholder="Your Name" />
								<p className={style.genderDesc}>Male</p>
								<input {...register('gender', val.gender)} value="Female" name="gender" type="radio" placeholder="Your Name" />
								<p className={style.genderDesc}>Female</p>
							</div>
						</FormControl>
					</div>
					
					<div className={style.buttons}>
						<button className={style.save} disabled={isSubmitting || errors.email}>Save</button>
						<Link to="../password" className={style.pwd}>Change Password</Link>
					</div>
					
				</div>
			</form>
		</>
	)
}
