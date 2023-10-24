import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
//reducers
import userReducer from '../features/User/reducer';
import tokenReducer from '../features/Token/reducer';
import errorReducer from '../features/Error/reducer';
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
	user: userReducer,
	token: tokenReducer,
	errorServer: errorReducer
})

export default createStore(rootReducers, applyMiddleware(thunk));