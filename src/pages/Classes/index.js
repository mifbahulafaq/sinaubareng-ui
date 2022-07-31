import React from 'react';
import { Link } from 'react-router-dom';
import style from './Classes.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//hooks
import useHideElement from '../../hooks/useHideElement';

//components
import ClassCard from '../../components/ClassCard';
import ClassCard2 from '../../components/ClassCard2';
import ModalContainer from '../../components/ModalContainer';
import CreateClass from '../../components/CreateClass';

function Classes({ classData, iconBar }) {
	
	const styleContent = {
		gridTemplateColumns: iconBar? "auto auto auto": "auto auto auto auto"
	}
	
  return (
	<div className={style.container}>
		<ModalContainer>
			<CreateClass />
		</ModalContainer>
		<ul className={style.menu}>
			<li>
				<Link to="../unread-assignment" >
					<FontAwesomeIcon icon="clipboard-list" />
					<span>Perlu Diperiksa</span>
				</Link>
			</li>
			<li>
				<Link to="../assignment" >
					<FontAwesomeIcon icon="table-list" />
					<span>Semua Tugas</span>
				</Link>
			</li>
			<div 
				title="Add" 
				className={`${style.btnClass} toggle`}
				onClick={e=>{
					e.currentTarget.classList.toggle(style.active)
					e.stopPropagation();
				}}
			>+</div>
			<ul className={style.addClass} >
				<li>Buat Kelas</li>
				<li>Gabung Kelas</li>
				<li>Tambah Anggota</li>
			</ul>
		</ul>
		
		<div style={styleContent} className={style.content}>
			{
				classData.classes?.map((e,i)=><React.Fragment key={i}><ClassCard2 classData={e} /></React.Fragment>)
			}
			{
				classData.students?.map((e,i)=><React.Fragment key={i}><ClassCard studentData={e} /></React.Fragment>)
			}
		</div>
		
	</div>
  )
}

export default React.memo(Classes);

Classes.propTypes = {
	classData: PropTypes.object,
	iconBar: PropTypes.bool
}
