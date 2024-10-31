import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './FormFile.module.css';
import Image from '../Image'

function FileUpload({data, removeFile, error }){
	
	return (
		<div className={`${style.container} ${error?style.error:""}`}>
			<div className={style.icon}>
				<div className={style.img}>
					<Image src="images/attachment.png" />
				</div>
			</div>
			<div className={style.fileName}>{data.name}</div>
			<div 
				onClick={()=>removeFile()} 
				className={style.removeFile}
			>
				<FontAwesomeIcon icon="plus" />
			</div>
		</div>
	)
}
FileUpload.propTypes = {
	data: PropTypes.object.isRequired,
	removeFile: PropTypes.func.isRequired,
	error: PropTypes.object
}

export default React.memo(FileUpload)


