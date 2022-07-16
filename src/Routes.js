import React from 'react';
import { useRoutes } from 'react-router-dom';

//pages
import Main from './pages/Main';
import User from './pages/User';
import Home from './pages/Home';

//components
import Guard from './components/GuardRoute';

function Element() {
	
	return useRoutes([
		{ path: '/', element: <Main /> },
		{ 
			path: 'home',
			element: <Guard><Home /></Guard>,
			children: [
				{ path: 'user', element: <User />}
			]
		},
		{ path: '*', element: <>not found</>}
	])
}

export default Element;
