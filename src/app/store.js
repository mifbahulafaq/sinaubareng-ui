import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
//reducers
import userReducer from '../features/User/reducer';
import tokenReducer from '../features/Token/reducer';
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
	user: userReducer,
	token: tokenReducer
})

export default createStore(rootReducers, applyMiddleware(thunk));