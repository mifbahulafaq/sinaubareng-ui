import axios from 'axios';
import config from '../config';

export async function login(data){
	return await axios.post(`${config.api_host}/auth/login`,data);
}