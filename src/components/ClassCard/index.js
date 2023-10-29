import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ClassCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config'

//api
import * as fetchStudent from '../../api/class-student'
//hooks
import useRefreshClass from '../../hooks/useRefreshClass'
//components
import Image from '../Image';
import ModalContainer from '../../components/ModalContainer';
//utils
import strLimit from '../../utils/strLimit';
import uppercase from '../../utils/uppercase';
import getPhotoPath from '../../utils/getPhotoPath';

export default memo(function ClassCard({classStudentData}){
	
	const [ modal, setModal ] = useState(false);
	const tphoto =  getPhotoPath(classStudentData.tphoto);
	const setClasses = useRefreshClass();
	
	async function unenrol(){
		
		try{
			
			const { data: deleteResult } = await fetchStudent.unenrol(classStudentData.id_class_student)
			
			if(deleteResult.error){
				return console.log('404')
			}
			
			setClasses()
			
		}catch(err){
			console.log(err)
		}
	}
	
	return (
		<div className={style.nonOverflow}>
			<div className={style.container}>
				<div style={{background: classStudentData.color}} className={style.user}>
					<div className={style.image}>
						<Image src={tphoto} />
					</div>
					<span>{uppercase(strLimit(classStudentData.tname,0,15),0)}</span>
				</div>
				<div className={style.class}>
					<div className={style.detail}>
						<Link to={"c/"+classStudentData.code_class}><h3>{classStudentData.class_name}</h3></Link>
						<p>{uppercase(strLimit(classStudentData.description,0,120),0)}</p>
					</div>
					<div className={style.btn}>
						<Link replace={true} to={`c/${classStudentData.code_class}/u`}>
							<FontAwesomeIcon title="Orang" icon="users" />
						</Link>
					</div>
				</div>
			</div>
			
			<div className={`${style.ellipse} setOption`}>
				<FontAwesomeIcon icon="ellipsis-vertical" />
			</div>
			<ul className={`${style.settingList} option`} >
				<li onClick={()=>setModal(true)} >Batal Pendaftaran</li>
			</ul>
			
			<ModalContainer displayed={modal} setDisplayed={setModal} >
				<div className={style.confirmUnenrol}>
					<p className={style.textAlert}>Keluar dari kelas {uppercase(classStudentData.class_name, 0)} ?</p>
					<p className={style.info}>
						Semua data atau file yang berada di kelas ini juga ikut terhapus
					</p>
					<ul className={style.deletionOpt}>
						<li onClick={()=>setModal(false)}>Batal</li>
						<li onClick={unenrol}>Keluar</li>
					</ul>
				</div>
			</ModalContainer>
			
		</div>
	)
})