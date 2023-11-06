import React from 'react';
import { Link } from 'react-router-dom';
import style from './Classes.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bookImage from './book.jpg';

//components
import ClassCard from '../../components/ClassCard';
import ClassCard2 from '../../components/ClassCard2';
import ModalContainer from '../../components/ModalContainer';
import CreateClass from '../../components/CreateClass';
import JoinClass from '../../components/JoinClass';
import Image from '../../components/Image';
import ImageWithAttribute from '../../components/ImageWithAttribute';

import statusReq from '../../utils/req-status';

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
				<Link to="/given-assignment" >
					<FontAwesomeIcon icon="clipboard-list" />
					<span>Tugas Diberikan</span>
				</Link>
			</li>
			<li>
				<Link to="/assignment" >
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
				classData.count?
				<>
					{
						classData.data.created_classes?.map((e,i)=><React.Fragment key={i}><ClassCard2 classData={e} /></React.Fragment>)
					}
					{
						classData.data.joined_classes?.map((e,i)=><React.Fragment key={i}><ClassCard classStudentData={e} /></React.Fragment>)
					}
				</>
				:
				<div className={style.nodata}>
					<ImageWithAttribute 
						width= "150px"
						imgSrc={bookImage}
						attrHref="https://www.freepik.com/free-vector/purple-book-open-isolated-icon_70015830.htm#page=7&query=book&position=27&from_view=search&track=sph"
						attrText="Image by jemastock"
					/>
					<p className={style.info}> Belum ada kelas </p>
					<div className={style.btn}>
						<div onClick={()=>clickContent(0)} className={style.add}>Buat Kelas</div>
						<div onClick={()=>clickContent(1)} className={style.join}>Gabung Kelas</div>
					</div>
				</div>
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
