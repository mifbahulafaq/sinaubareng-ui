import React from 'react';

export default function useHideElement(eClick, e, className){
	
	React.useEffect(()=>{
			if(eClick){
				eClick.onclick = ()=>{
				console.log(eClick === e)
					console.log('Document cluck')
					//const btnClass = document.querySelector(`.${style.btnClass}`);
					//document.stopPropagation()
					e.classList.remove(className)
				}
			}
			
	},[eClick, e, className])
}
