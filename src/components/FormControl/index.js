import style from './FormCntrol.module.css';

export default function FormCntrol({error,children}){
	
	return <div className={style.container}>
		{children}
		<span>{error}</span>
	</div>
}