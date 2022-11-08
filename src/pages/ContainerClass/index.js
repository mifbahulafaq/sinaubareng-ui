import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useContext } from '../../Context';

//pagess
//import Classes from '../Classes';

export default function ContainerClass() {
	
	const { classData, iconBar } = useContext();
	/*return <Routes>
		<Route path="/" element={<Classes classData={classData} iconBar={iconBar} />} />
	</Routes>
	*/
	return <Outlet />
}
