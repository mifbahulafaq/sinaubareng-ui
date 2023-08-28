import React from 'react';

export default function useCookie(cookieName){

	return React.useMemo(()=>{
		
		const name = cookieName + "=";
		const cookieArr = document.cookie.split(';')
		
		for(let i = 0; i < cookieArr.length; i++){
			
			let c = cookieArr[i];
			
			while(c.charAt(0) === ' '){
				c = c.substring(1)
			}
			
			if(c.indexOf(name) === 0) return c.substring(name.length, c.length);
			
		}
		
	},[cookieName])
	
}