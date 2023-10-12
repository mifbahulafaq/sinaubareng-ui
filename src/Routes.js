import React from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import { useContext } from './Context';
import { useSelector, useDispatch } from 'react-redux';

import * as tokenActions from './features/Token/actions'

//pages
import Main from './pages/Main';
import Home from './pages/Home';
import Classes from './pages/Classes';
import SingleClass from './pages/SingleClass';
import Matter from './pages/Matter';
import Exam from './pages/Exam';
import SingleMatter from './pages/SingleMatter';
import SingleAssignment from './pages/SingleAssignment';
import SingleExam from './pages/SingleExam';
import People from './pages/People';
import AllAssignment from './pages/AllAssignment';
import GivenAssignment from './pages/GivenAssignment';
import Logout from './pages/Logout';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Password from './pages/Password';
import Schedule from './pages/Schedule';
import Verification from './pages/Verification';
import ForgotPassword from './pages/ForgotPassword';

//components
import GuardGuest from './components/GuardGuest';
import GetSingleClass from './components/GetSingleClass';

import getCookie from './utils/getCookie'

function Element() {
	
	const { classData } = useContext();
	const dispatch = useDispatch();
	const token = useSelector(s=>s.token);
	
	React.useEffect(()=>{
		
		if(!token.value){
			dispatch(tokenActions.refresh())
		}
		
	}, [token.value])
	
	return useRoutes([
		{ 
			path: '/',
			element: token.value ? <Home />: <GuardGuest children={<Main />} />,
			children: [
				{index:true, element: <Classes classData={classData} /> },
				{path: 'h', element: <Classes classData={classData} /> },
				{
					path: 'user',
					element: <Outlet />,
					children: [
						{index:true, element: <Navigate to="account/profile" /> },
						{
							path: 'account', 
							element: <Account />,
							children: [
								{path: 'profile', element: <Profile /> },
								{path: 'password', element: <Password/> },
							]
						},
					]
				},
				{
					path:'c/:code_class', 
					element: <GetSingleClass />,
					children: [
						{index:true, element: <SingleClass />},
						{
							path:'m', 
							element: <Outlet />,
							children: [
								{index:true, element: <Matter /> },
								{
									path:':id_matt', 
									element: <Outlet />,
									children: [
										{index: true, element: <SingleMatter />},
										{path: 'assignment/:id_matt_ass', element: <SingleAssignment />}
									]
								}
							]
						},
						{
							path:'e', 
							element: <Outlet />,
							children: [
								{index:true, element: <Exam /> },
								{path:':id_exm/*', element: <SingleExam /> },
							]
						},
						{
							path: 'u',
							element: <People />
						},
						{
							path: 's',
							element: <Schedule />
						}
					]
				},
				{ path: 'assign', element: <GivenAssignment />},
				{ path: 'assignment', element: <AllAssignment />},
				{ path: 'logout', element: <Logout />},
			]
		},
		{ path: 'verify', element: <Verification />},
		{ path: 'forgot-password', element: <ForgotPassword />},
		{ path: "*", element: <>PAGE NOT FOUND</>}
	])
}

export default Element;
