import React from 'react';
import style from './App.module.css';
import './Additional.css';
import { HashRouter, useNavigate } from 'react-router-dom';
import Routes from './Routes';
import Context from './Context';

import * as authApi from '../src/api/auth'

//icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightLong, faGear, faSignOut, faExclamation, faUserFriends, faUserPlus, faRepeat, faArrowUpFromBracket, faArrowUp, faMessage, faClipboardQuestion, faComments, faPencil, faPaperPlane, faCirclePlus, faWarning, faXmark, faPlus, faUsers, faCircleExclamation, faBan, faCheck, faBars, faLandmark, faClipboardList, faTableList, faEllipsisVertical, faBookReader, faFileDownload, faExternalLink, faEnvelope, faEnvelopeCircleCheck, faCircleUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as faPaperPlane2, faUser, faCommentAlt, faCalendarDays, faFile, faFolderOpen, faFileAlt, faCalendar, faClock, faFileLines, faFileWord, faFilePdf } from '@fortawesome/free-regular-svg-icons'

library.add(
	faEye,
	faEyeSlash,
	faCircleUser,
	faEnvelopeCircleCheck,
	faArrowRightLong,
	faGear,
	faSignOut,
	faEnvelope,
	faPaperPlane2,
	faExclamation,
	faUserFriends,
	faUserPlus,
	faUser,
	faCommentAlt,
	faRepeat,
	faArrowUpFromBracket,
	faCalendarDays,
	faArrowUp,
	faMessage,
	faClipboardQuestion,
	faWarning,
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
	faFolderOpen,
	faFileAlt,
	faBookReader,
	faCalendar,
	faClock,
	faFileLines,
	faCirclePlus,
	faPaperPlane,
	faFileWord,
	faFileDownload,
	faExternalLink,
	faFilePdf,
	faPencil,
	faComments
);

function App() {
	
	function hideElement(clickedE){
		
		//const setOptionE = document.querySelectorAll('.setOption');
		const optionE = document.querySelectorAll('.option');
		
		optionE.forEach((e)=>{
			
			const setOptionE = e.parentElement.querySelector('.setOption')
			
			if(clickedE.target === setOptionE) {
				
				if(e.style.display === "none" || e.style.display === "") return e.style.display = "block";
			}
			
			if(clickedE.target !== e) e.style.display = 'none';
			
			
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
