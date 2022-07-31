import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useContext } from './Context';

//pages
import Main from './pages/Main';
import User from './pages/User';
import Home from './pages/Home';
import Classes from './pages/Classes';

//components
import Guard from './components/GuardRoute';

function Element() {
	
	const { classData, iconBar } = useContext();
	const auth = JSON.parse(localStorage.getItem('auth'));
	const e = auth?.token? <Home />: <Main />;
	
	return useRoutes([
		{ 
			path: '/',
			element: e,
			children: [
				{ path: '/', element: <Navigate to="class" replace />},
				{ path: 'class/*', element: <Classes classData={classData} iconBar={iconBar} />},
				{ path: 'unread-assignment', element: <>unread-assignment</>},
				{ path: 'assignment', element: <>assignment</>},
			]
		},
		{ path: "*", element: <>not found</>}
	])
}

export default Element;
