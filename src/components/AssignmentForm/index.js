import { useState, useRef, useEffect, memo } from 'react';
import style from './AssignmentForm.module.css';
import { useForm } from 'react-hook-form';
import * as val from '../../validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'

//components
import Image from '../Image'

//apis
import * as apiMatter from '../../api/matter';
//utils
import formatDate from '../../utils/id-format-date';

 const AssignmentForm = memo(function ({displayMatters, display}){
	
	return (
		<div className={style.formContainer}>
			<div className={style.header}>
				<div className={style.icon}>
					<FontAwesomeIcon icon={["far","file-lines"]} />
				</div>
				<span>Tugas</span>
			</div>
			<form>
				<div className={style.formSection1}>
				
					<input className={style.inputMargin} placeholder="Judul" />
					
					<div className={style.customInputContainer}>
						<div contentEditable="true" className={style.inputMargin} />
						<p>Isi (Opsional)</p>
					</div>
					
					<div className={`${style.inputDateContainer} ${style.inputMargin}`}>
						<h4>Tenggat</h4>
						<div className={style.inputDate}>
							<p>-</p>
							<div className={style.selectContainer}>
								<div className={style.title}></div>
								<div className={style.select}>
									<div className={style.singleSelect} ></div>
								</div>
							</div>
						</div>
					</div>
					
					
				</div>
				<div className={style.formSection2}>
					<input type="file" className={style.inputMargin} />
				</div>
			</form>
		</div>
	)
})

AssignmentForm.propTypes = {
	display: PropTypes.func,
	displayMatters: PropTypes.func
}

export default AssignmentForm;