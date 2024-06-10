import React from 'react';
import styling from './InputFile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

const InputFile = React.forwardRef(function({ onChange, style }, ref){
	
	React.useEffect(function(){
		
		const inputE = ref.current;
		
		if(inputE){
			inputE.onclick = e=> e.target.value = null;
			inputE.onchange = onChange
		}
		
	},[ref, onChange])
	
	return(
		<div style={style} onClick={e=>e.currentTarget.querySelector("input").click()} className={styling.container} >
			<input 
				type="file" 
				ref={ref}
				accept=".pdf, .docx, doc, .PDF, .DOCX, DOC" 
			/>
			<FontAwesomeIcon className={styling.icon} icon='arrow-up-from-bracket' />
			<span>Upload</span>
		</div>
	)
})

export default InputFile;

InputFile.propTypes = { onChange: PropTypes.func, style: PropTypes.object }