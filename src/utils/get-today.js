import formatDate from './id-format-date'
export default function getToday(date, comparedTo){
		
		if(!date) return ""
		
		return comparedTo === formatDate(date, "id-ID", {dateStyle:"medium"})? formatDate(date, "id-ID", {timeStyle:"short"}) : formatDate(date, "id-ID", {timeStyle:"short", dateStyle: "medium"})
}