import { combineReducers } from 'redux';
import demoReducer from './demoReducer.js';
import { routerReducer } from 'react-router-redux';
import listReducer from './listReducer';
import userListReducer from './userListReducer';
import detailReducer from './detailReducer';

const rootReducer = combineReducers({
	demoReducer,
	routerReducer,
	listReducer,
	userListReducer,
  detailReducer
});

export default rootReducer
