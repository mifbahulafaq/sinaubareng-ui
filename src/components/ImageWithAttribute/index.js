import style from './ImageWithAttribute.module.css';
import PropTypes from 'prop-types';


export default function ImageWithAttribute({ height, width, imgSrc, attrRight, attrHref, attrText }){
	return <div style={{ height, width }} className={style.container}>
		<img src={imgSrc}  className={style.image} />
		<a className={style.attr} style={{ right: attrRight }} href={attrHref} >{attrText}</a>
	</div>
}

ImageWithAttribute.propTypes = {
	
	attrRight: PropTypes.string,
	height: PropTypes.string,
	width: PropTypes.string,
	imgSpace: PropTypes.string,
	imgSrc: PropTypes.string.isRequired,
	attrHref: PropTypes.string.isRequired,
	attrText: PropTypes.string.isRequired,
}
ImageWithAttribute.defaultProps = {
	
	attrRight: "0",
	height: 'auto',
	width: 'auto',
}