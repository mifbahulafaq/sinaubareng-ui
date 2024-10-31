import React from 'react';
import PropTypes from 'prop-types'
import style from './UploadedFile.module.css';
import Image from '../Image'

function UploadedFile({data, display }){
	
	const extAttachment = {pdf: "document", doc: "word", docx: "word"}
	
	return (
		<div className={style.container}>
			<div className={style.icon}>
				<div className={style.img}>
					<Image src="images/attachment.png" />
				</div>
			</div>
			<div className={style.fileName}>
				<h3 onClick={display} >{data[1]}</h3>
				<p>{extAttachment[data[1].split('.')[1]]}</p>
			</div>
		</div>
	)
}
UploadedFile.propTypes = {
	data: PropTypes.array.isRequired
}

export default React.memo(UploadedFile)


