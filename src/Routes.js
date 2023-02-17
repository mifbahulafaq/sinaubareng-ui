import React from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import { useContext } from './Context';

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

//components
import GuardGuest from './components/GuardGuest';
import GuardPage from './components/GuardPage';
import GetSingleClass from './components/GetSingleClass';

function Element() {
	
	const { classData } = useContext();
	
	return useRoutes([
		{ 
			path: '/',
			element: <GuardPage children={<Home />} />,
			children: [
				{index:true, element: <Classes classData={classData} /> },
				{path: 'h', element: <Classes classData={classData} /> },
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
						}
					]
				},
				{ path: 'assign', element: <GivenAssignment />},
				{ path: 'assignment', element: <AllAssignment />},
			]
		},
		{ path: 'login', element: <GuardGuest children={<Main />} />},
		{ path: "*", element: <>PAGE NOT FOUND</>}
	])
}

export default Element;
