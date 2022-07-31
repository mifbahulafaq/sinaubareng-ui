import style from './ModalContainer.module.css';

export default function ModalContainer({ children }){
	
	return (
		<div
			id="ModalContainer"
			className={style.container}
			onClick={e=>{
				
			}}
		>
			{children}
		</div>
	)
}