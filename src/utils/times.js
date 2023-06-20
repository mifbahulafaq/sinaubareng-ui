const jamak = (value)=>{
	return value <= 1 ? '': 's';
}

export default function minutes(value){
	
	const minute = Math.floor(value / 60000);
	const hour = Math.floor(value / 3600000);
	
	const desc = hour? 'hour'+jamak(hour): minute? 'minute'+jamak(minute): '';
	const number = hour || minute;
	
	return `${number} ${desc}`;
}