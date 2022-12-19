export default function uppercase([...letter], index){
	letter[index] = letter[index].toUpperCase()
	return letter.join('')
}