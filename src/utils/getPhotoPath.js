import config from '../config';

export default function getPhotoPath(photoPath){
	return photoPath? photoPath.includes('http')? photoPath: `${config.api_host}/public/photo/${photoPath}`: 'images/user.png';
}