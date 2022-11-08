export default function idFormatDate(date, locale, opt=""){
	
	const theDate = new Date(date);
	return theDate.toLocaleString(locale, opt);
	
}