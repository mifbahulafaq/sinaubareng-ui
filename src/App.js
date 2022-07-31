import React from 'react';
import style from './App.module.css';
import { HashRouter } from 'react-router-dom';
import Routes from './Routes';
import Context from './Context';

//icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faPlus, faUsers, faCircleExclamation, faBan, faCheck, faBars, faLandmark, faClipboardList, faTableList, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFolderOpen } from '@fortawesome/free-regular-svg-icons'

library.add(
	faXmark,
	faPlus,
	faUsers,
	faCircleExclamation, 
	faBan, 
	faCheck, 
	faBars, 
	faLandmark, 
	faClipboardList, 
	faTableList, 
	faEllipsisVertical,
	faFile,
	faFolderOpen
);

function App() {
	
	function hideElement(){
		
		const toggle = document.querySelectorAll('.toggle');
		
		toggle.forEach((e)=>{
			
			let classList = [...e.classList];
			let removedClass = classList.find(clas=>{
				return clas.includes('active');
			})
			
			e.classList.remove(removedClass)
		})
	}
	
	return (
		<React.Suspense fallback={<div>loading...</div>}>
			<Context>
				<div 
					onClick={hideElement}
					className={style.app}
				>
					<HashRouter>
						<Routes />
					</HashRouter>
				</div>
			</Context>
		</React.Suspense>
	);
}

export default App;
