export default function uppercase(letter, index){
	const [...arrayLetter] = letter? letter: ""
	arrayLetter[index] = arrayLetter[index]?.toUpperCase()
	return arrayLetter.join('')
}