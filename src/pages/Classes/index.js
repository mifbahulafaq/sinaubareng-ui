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
	
	const content = [<CreateClass setModal={setModal} modal={modal} />, <JoinClass setModal={setModal} />];
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
				<Link to="../../assign" >
					<FontAwesomeIcon icon="clipboard-list" />
					<span>Tugas Diberikan</span>
				</Link>
			</li>
			<li>
				<Link to="../../assignment" >
					<FontAwesomeIcon icon="table-list" />
					<span>Tugas Diterima</span>
				</Link>
			</li>
			<div title="Add" className={`${style.btnClass}`} >
				<div className={`${style.plus} setOption`}> +</div>
				<ul className={`${style.addClass} option`} >
					<li onClick={()=>clickContent(0)} >Buat Kelas</li>
					<li onClick={()=>clickContent(1)}>Gabung Kelas</li>
				</ul>
			</div>
		</ul>
		
		<div style={styleContent} className={style.content}>
			{
				classData.data.created_classes?.map((e,i)=><React.Fragment key={i}><ClassCard2 classData={e} /></React.Fragment>)
			}
			{
				classData.data.joined_classes?.map((e,i)=><React.Fragment key={i}><ClassCard classStudentData={e} /></React.Fragment>)
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
