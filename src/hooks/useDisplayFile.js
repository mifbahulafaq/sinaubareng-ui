import React from 'react';
import * as fileApi from '../api/file';

export default function useDisplayFile(){
	
	return React.useCallback(async (path, setDocs, setDisplayDoc, fileName)=>{
			
		try{
			
			//get the file and convert into blob type
			const { data: blob } = await fileApi.get(path);
			
			// console.log(file.type)
			// const blob = new Blob([file], {type: headers["content-type"]})
			
			//covert the blob file into url
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
	}, [])
}