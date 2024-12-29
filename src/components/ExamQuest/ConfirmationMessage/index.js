import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './ConfirmationMessage.module.css';

function ConfirmationMessage({ cancel, submit}){
	return <div className={style.container}>
		<h2>Sudah yakin dengan jawabanmu?</h2>
		<p>
			Setelah dikirim jawaban tidak bisa dirubah, jadi pastikan jawaban anda sudah benar.
		</p>
		<div className={style.button}>
			<div onClick={cancel} >Batal</div>
			<div 
				onClick={()=>{
					submit();
					cancel();
				}} 
			>Kirimkan</div>
		</div>
	</div>
}

ConfirmationMessage.propTypes = {
	cancel: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
}

export default memo(ConfirmationMessage);