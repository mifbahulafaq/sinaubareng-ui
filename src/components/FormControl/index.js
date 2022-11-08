import style from './FormCntrol.module.css';

export default function FormCntrol({error,children, width}){
	
	return <div style={{width: width?width:0}} className={style.container}>
		{children}
		<span>{error}</span>
	</div>
}