import React from 'react';
import style from './App.module.css';
import { Route, HashRouter, Routes} from 'react-router-dom';

//pages
import Main from './pages/Main';
import Login from './pages/Main';
import Home from './pages/Main';

function App() {
	return (
		<div className={style.app}>
			<HashRouter>
				<Routes>
					<Route exact path='/' element={<Main />} />
					<Route exact path='/home' element={<Home />} />
					<Route exact path='/login' element={<Login />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
