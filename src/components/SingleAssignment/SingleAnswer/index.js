import React from 'react';
import { useParams, Link } from 'react-router-dom';
import style from './SingleAnswer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";

import { ModalContainer, ModalChild } from '../../../components/Modal';

import * as answerApi from '../../../api/ass-answer';

import getExt from '../../../utils/getExt';
import displayFile from '../../../utils/displayFile';

function SingleAnswer(){
	
	const [ displayDoc, setDisplayDoc ] = React.useState(false);
	const [ docs, setDocs ] = React.useState([]);
	const [ answer, setAnswer ] = React.useState({});
	const params = useParams();
	
	React.useEffect(()=>{
		answerApi.getSingle(params.id_ass_answer)
		.then(({ data })=>{
			setAnswer(data.data[0])
		})
		.catch((err)=>{
			throw err
		})
	}, [params.id_ass_answer])
	
	function readFile(fileName){
		answerApi.getaDocument(params.id_ass_answer, fileName[0])
		.then( async ({ data })=>{
			
			if(data.error) return console.log(data);
			
			const docs = await displayFile(data.path, setDisplayDoc, fileName[1]);
			setDocs(docs);
		})
		.catch(err=>console.log(err))
	}
	
	return <div className={style.container}>
	
		
		<ModalContainer displayed={displayDoc} hideModal={setDisplayDoc}>
			
			<DocViewer 
				pluginRenderers={DocViewerRenderers }
				documents={docs}
				theme={{
					primary: "#5296d8",
					secondary: "#ffffff",
					tertiary: "#5296d899",
					textPrimary: "#black",
					textSecondary: "#5296d8",
					textTertiary: "#00000099",
					disableThemeScrollbar: false,
				}}
				style={{width: '60vw'}}
			/>
		</ ModalContainer>
		
		<div className={style.header}>
			<div className={style.detail}>
				<p className={style.name}>{ answer.user?.name }</p>
				<p className={style.total}>{ answer.content?.length} files</p>
			</div>
			<Link className={style.listIcon} title="list" to=".." replace={true} >
				<FontAwesomeIcon icon="list" />
			</Link>
		</div>
		{
			answer.content?.map((e,i)=>{
				
				const ext = getExt(e[1]);
				
				return <React.Fragment key={i}>
					<div className={style.answer}>
						<div className={`${style.icon} ${style[ext]}`}>
							{
								ext === 'pdf'
								? <FontAwesomeIcon icon="file-pdf" />
								: <FontAwesomeIcon icon="file-word" />
							}
						</div>
						<div className={style.detail}>
							<p onClick={()=>readFile(e)} className={style.name}>{e[1]}</p>
						</div>
					</div>
				</React.Fragment>
			})
		}
	</div>
}

export default SingleAnswer;