import React from 'react';
import style from './Verification.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import WebTitle from '../../components/WebTitle';
//APIs
import * as authAPI from '../../api/auth';
//hooks
import useQuery from '../../hooks/useQuery';


export default function Verification() {
	
	const [ error, setError ] = React.useState('');
	const [ user, setUser ] = React.useState({});
	const qs = useQuery();
	const navigate = useNavigate();
	
	const redirectUrl = React.useCallback(()=>{
		
		setTimeout(()=>{
			navigate('/', {replace: true});
			
		}, 2000)
		
	}, [navigate])
	
	const verifyEmail = React.useCallback(async ()=>{
		
		const token = qs.get('t');
		
		if(token){
			
			try{
				const { data: verification } = await authAPI.verify({t: token});
				
				if(!verification.error){
					
					setUser(verification.data);
					
					return; //ended successfully
				}
				//set Error
				setError(verification.message);
				
				
			}catch(err){
				//set Error
				setError('server error');
				
			}
		}
		//redirect after error
		if(!error.length) setError("Couldn't verify your email")
		redirectUrl()
		
	},[qs, redirectUrl, error])
	
	React.useEffect(()=>{verifyEmail()}, [verifyEmail]);
	
	
	return (
		<div className={style.container}>
		
			<div className={style.title}>
				<WebTitle/>
			</div>
			<div className={style.content}>
				{
					user.name?
					<>
						<h2>Account Activated</h2>
						<FontAwesomeIcon icon="fa-solid fa-envelope-circle-check" />
						<h3 className={style.greeting}>Hello {user.name},</h3>
						<p className={style.info}>Thank you, your email has been verified. your account is now active.
						<br />Please use the link below to login to your account.</p>
						<Link to="/" className={style.link}>
							<span>Login to this site</span>
						</Link>
					</>
					:
						error.length?
							<>
								<p className={style.info} >{error} <br />Redirecting...</p>
							</>
						:
						<></>
				}
			</div>
			
		</div>
	)
}
