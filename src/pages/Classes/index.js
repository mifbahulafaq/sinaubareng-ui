import React from 'react';
import { Link } from 'react-router-dom';
import style from './Classes.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import ClassCard from '../../components/ClassCard';
import ClassCard2 from '../../components/ClassCard2';
import ModalContainer from '../../components/ModalContainer';
import CreateClass from '../../components/CreateClass';
import JoinClass from '../../components/JoinClass';

function Classes({ classData, iconBar }) {
	
	const [modal, setModal] = React.useState(false); 
	const [indexContent, setIndexContent] = React.useState(0);
	
	const content = [<CreateClass setModal={setModal} />, <JoinClass setModal={setModal} />];
	const styleContent = {
		gridTemplateColumns: iconBar? "auto auto auto": "auto auto auto auto"
	}
	
	function clickContent(content){
		setModal(true);
		setIndexContent(content);
	}
	
  return (
	<div className={style.container}>
		<ModalContainer displayed={modal} setDisplayed={setModal} >
			{content[indexContent]}
		</ModalContainer>
		<ul className={style.menu}>
			<li>
				<Link to="../../unread-assignment" >
					<FontAwesomeIcon icon="clipboard-list" />
					<span>Perlu Diperiksa</span>
				</Link>
			</li>
			<li>
				<Link to="../../assignment" >
					<FontAwesomeIcon icon="table-list" />
					<span>Semua Tugas</span>
				</Link>
			</li>
			<div title="Add" className={`${style.btnClass} select`} >
				+
				<ul onClick={e=>e.stopPropagation()} className={`${style.addClass} option`} >
					<li onClick={()=>clickContent(0)} >Buat Kelas</li>
					<li onClick={()=>clickContent(1)}>Gabung Kelas</li>
				</ul>
			</div>
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
