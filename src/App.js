import React from 'react';
import style from './App.module.css';
import { HashRouter } from 'react-router-dom';
import Routes from './Routes';
import Context from './Context';

//icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCircleExclamation, faBan, faCheck);

function App() {
	
	return (
		<React.Suspense fallback={<div>loading...</div>}>
			<Context>
				<div className={style.app}>
					<HashRouter>
						<Routes />
					</HashRouter>
				</div>
			</Context>
		</React.Suspense>
	);
}

export default App;
