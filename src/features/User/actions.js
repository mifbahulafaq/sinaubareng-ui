import { ADD } from './constants';

export function addUser(user){
	return {
		type: ADD,
		user
	}
}