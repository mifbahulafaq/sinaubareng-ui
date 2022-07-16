import { Navigate } from 'react-router-dom';
export default function GuardRoute({children}){
	
	const auth = JSON.parse(localStorage.getItem('auth'));
	
	return <>
		{
			auth?
				auth.token? 
					children
				:
					<Navigate to='/' replace />
			:
			<Navigate to='/' replace />
		}
	</>
}