export default function strLimit(str, start, end){
	
	if(str.length > end){
		const result = str.slice(start, end - 3);
		return result + "..."
	}
	return str;
}