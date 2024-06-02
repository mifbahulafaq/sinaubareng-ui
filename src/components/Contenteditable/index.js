import React from 'react';
import PropTypes from 'prop-types';

function Contenteditable({ className, onChange, value }){
	
	const editableE = React.useRef(null);
	
	React.useEffect(()=>{
		const currentE = editableE.current
		
		const s = window.getSelection();
		s.removeAllRanges();
		
		if(currentE.childNodes.length){
			
			const textNode = currentE.childNodes[0];
			
			const range = document.createRange();
			range.setStart(textNode, textNode.length);
			range.setEnd(textNode, textNode.length);
			
			s.addRange(range);
		}
		
	}, [value, editableE])
	
	return <div 
			onInput={onChange}
			ref={editableE}
			className={className}
			contentEditable
			dangerouslySetInnerHTML={{__html: value}}
		/>
	
}

Contenteditable.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
}

export default React.memo(Contenteditable)