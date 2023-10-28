import style from './Image.module.css';

export default function Image(props){
	return <img {...props} className={style.image} />
}