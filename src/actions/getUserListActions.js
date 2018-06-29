import * as Type from '../constants/ActionType.js';
import { fetchJson } from 'src/utils/fetch.js';
// import { PRODUCT } from 'src/utils/api';

export function getUserList (params) {
    return dispatch => {
        // dispatch({
        //     payload: {a: 2, b: 3},
        //     type: Type.DEMO
        // })
        // dispatch({
        //     payload: {a: 2, b: 3},
        //     type: Type.DEMO
        // })
        fetchJson({
            success: (res) => {
                // if (!res || !res.length) {
                //     // StaticToast.error('暂无数据');
                //     return false;
                // }
                dispatch({
                    type: Type.GET_USER_LIST,
                    payload: res.result
                })
            },
            type: 'GET',
            url: '/api/v1/project/user/list',
            data: {token: window.sessionStorage.getItem('token')}
        })
    }
}

