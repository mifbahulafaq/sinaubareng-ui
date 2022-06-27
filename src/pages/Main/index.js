import React from 'react';
import style from './Main.module.css';

//components
import MainHeader from '../../components/MainHeader';
import MainContent from '../../components/MainHeader';
import MainFooter from '../../components/MainHeader';


export default function Main() {
  return (
	<div className={style.container}>
		<div className={style.header}><MainHeader /></div>
		<div className={style.content}><MainContent /></div>
		<div className={style.footer}><MainFooter /></div>
	</div>
  )
}
