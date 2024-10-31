export default function getExt(fileName){
	if(!fileName) return undefined;
	return fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
}