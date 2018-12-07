import { combineReducers } from 'redux';
import demoReducer from './demoReducer.js';
import { routerReducer } from 'react-router-redux';
import listReducer from './listReducer';
import userListReducer from './userListReducer';
import detailReducer from './detailReducer';
import uploadImgArrayReducer from './uploadImgArrayReducer';
import getUserInfos from './userInfosReducer';
const rootReducer = combineReducers({
  getUserInfos,
	demoReducer,
	routerReducer,
	listReducer,
	userListReducer,
  detailReducer,
  uploadImgArrayReducer
});

export default rootReducer
