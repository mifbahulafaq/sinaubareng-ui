import React from 'react';
import style from './Main.module.css';

//components
import MainHeader from '../../components/MainHeader';
import MainContent from '../../components/MainContent';
import MainFooter from '../../components/MainHeader';


export default function Main() {
  const backgroundImage = "url('images/main.png')";
  return (
	<div style={{backgroundImage}} className={style.container}>
		<div className={style.header}><MainHeader /></div>
		<div className={style.content}><MainContent /></div>
	</div>
  )
}
