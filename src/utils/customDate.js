export default function CustomDate(value){
	this.date = value? new Date(value): new Date();
}

CustomDate.prototype.setLocale = function(locale){
	this.date = this.date.toLocaleString(locale)
}
CustomDate.prototype.getDate = function(locale){
	const arrayOfDate = this.date.split(' ');
	return arrayOfDate[0];
}
CustomDate.prototype.getDate = function(locale){
	const arrayOfDate = this.date.split(' ');
	return arrayOfDate[1];
}