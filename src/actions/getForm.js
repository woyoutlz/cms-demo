import * as Type from '../constants/ActionType.js';
// import { PRODUCT } from 'src/utils/api';

export function demo (params) {
return dispatch => {
        dispatch({
            type: Type.DEMO,
            // payload: res.result
        })
    }
}


