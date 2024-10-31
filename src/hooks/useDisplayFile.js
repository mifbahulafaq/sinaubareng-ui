import React from 'react';
import * as fileApi from '../api/file';

export default function useDisplayFile(){
	
	return React.useCallback(async (path, setDocs, setDisplayDoc, fileName)=>{
			
		try{
			
			const { data: blob } = await fileApi.get(path);
			
			// console.log(file.type)
			// const blob = new Blob([file], {type: headers["content-type"]})
			let url = window.URL.createObjectURL(blob);
			
			const typeChecking = typeof setDocs === 'function' && typeof setDisplayDoc === 'function';
			
			if(!typeChecking){
				
				const link = document.createElement('a');
				
				link.href = url;
				link.setAttribute('download', fileName)
				document.body.appendChild(link);
				link.click();
				
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			}else{
			
				setDocs([
					{uri:url, fileName}
				])
				setDisplayDoc(true)
			}
			
		}catch(err){
			throw err;
		}
			
			// if(download){

				// const link = document.createElement('a');
				
				// link.href = url;
				// link.setAttribute('download', filename[1])
				// document.body.appendChild(link);
				// link.click();
				// document.body.removeChild(link);
				
			// }else{
				
				// setDocs([
					// {uri:url, fileName: filename[1], fileType: ext}
				// ])
				// setDisplayDoc(true)
			// }
			// fileApi.get(data.path)
			// .then(({ data })=>{
				
				//if(data.error) return console.log(data);
				//create url
				// const blob = new Blob([data], {type: data.type});
				// const url = window.URL.createObjectURL(blob);
				
				
			// })
			// .catch(err=>console.log(err))
	}, [])
}