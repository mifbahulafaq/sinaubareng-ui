import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

//reducers
import userReducer from '../features/User/reducer';

const rootReducers = combineReducers({
	user: userReducer
})

export default createStore(rootReducers);