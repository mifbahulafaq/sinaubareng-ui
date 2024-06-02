import style from 'Answer.module.css';

function Answer(){
	return (
		<div key={i} className={style.answer}>
			<div className={`${style.icon} ${style[ext]}`}>{ext === "pdf"?'P':'W'}</div>
			<span>{e[1]}</span>
		</div>
	)
}