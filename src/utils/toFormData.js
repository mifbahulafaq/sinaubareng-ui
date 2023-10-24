export default function toFormData(data){
	
	let formData = new FormData();
	
	for (let key in data){
		if(data[key]) formData.append(key, data[key])
	}
	return formData;
}

// export default function toFormData(data){
	
	// let formData = new FormData();
	
	// for (let key in data){

		// if(Array.isArray(data[key])){

			// data[key].forEach(v=>formData.append(key, v))
			
		// }else{

			// formData.append(key, data[key]);
			
		// }
		
	// }
	// return formData;
// }