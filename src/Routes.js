import React from 'react';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';
import { useContext } from './Context';

//pages
import Main from './pages/Main';
import User from './pages/User';
import Home from './pages/Home';
import ContainerClass from './pages/ContainerClass';
import Classes from './pages/Classes';
import SingleClass from './pages/SingleClass';
import Matter from './pages/Matter';
import Exam from './pages/Exam';
import SingleMatter from './pages/SingleMatter';
import SingleAssignment from './pages/SingleAssignment';
import SingleExam from './pages/SingleExam';
import People from './pages/People';

//components
import Guard from './components/GuardRoute';
import GetSingleClass from './components/GetSingleClass';

function Element() {
	
	const { classData, iconBar } = useContext();
	const auth = JSON.parse(localStorage.getItem('auth'));
	const e = auth?.token? <Home />: <Main />;
	
	return useRoutes([
		{ 
			path: '/',
			element: e,
			children: [
				{ index:true, element: <Navigate to="c" replace />},
				{ 
					path: 'c', 
					element: <ContainerClass />,
					children: [
						{index:true, element: <Classes classData={classData} /> },
						{
							path:':code_class', 
							element: <GetSingleClass />,
							children: [
								{index:true, element: <SingleClass /> },
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
						{path:'*', element: <>not found</> },
					]
				},
				{ path: 'unread-assignment', element: <>unread-assignment</>},
				{ path: 'assignment', element: <>assignment</>},
			]
		},
		{ path: "*", element: <>not found</>}
	])
}

export default Element;
