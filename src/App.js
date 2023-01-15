import React from 'react';
import style from './App.module.css';
import './Additional.css';
import headerStyle from './components/HomeHeader/HomeHeader.module.css';
import { HashRouter } from 'react-router-dom';
import Routes from './Routes';
import Context from './Context';

//icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamation, faUserFriends, faUserPlus, faRepeat, faArrowUpFromBracket, faArrowUp, faMessage, faClipboardQuestion, faComments, faPencil, faPaperPlane, faCirclePlus, faWarning, faXmark, faPlus, faUsers, faCircleExclamation, faBan, faCheck, faBars, faLandmark, faClipboardList, faTableList, faEllipsisVertical, faBookReader, faFileDownload, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as faPaperPlane2, faUser, faCommentAlt, faCalendarDays, faFile, faFolderOpen, faFileAlt, faCalendar, faClock, faFileLines, faFileWord, faFilePdf } from '@fortawesome/free-regular-svg-icons'

library.add(
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
	
	function scrollOn(e){
		const homeHeader = document.getElementById('home-header');
		const classList = Array.from(homeHeader.classList);
		const scrollValue = e.currentTarget.scrollTop;
		
		if(scrollValue > 0 ){
			
			if(!classList.includes(headerStyle.scroll)){
				homeHeader.classList.add(headerStyle.scroll);
			}
			
			return;
		}
		
		if(classList.includes(headerStyle.scroll)){
			homeHeader.classList.remove(headerStyle.scroll);
		}
	}
	
	return (
		<React.Suspense fallback={<div>loading...</div>}>
			<Context>
				<div 
					onClick={hideElement}
					onScroll={scrollOn}
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
