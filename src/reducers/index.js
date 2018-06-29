import { combineReducers } from 'redux';
import demoReducer from './demoReducer.js';
import { routerReducer } from 'react-router-redux';
import listReducer from './listReducer';
import userListReducer from './userListReducer';

const rootReducer = combineReducers({
	demoReducer,
	routerReducer,
	listReducer,
	userListReducer
});

export default rootReducer
