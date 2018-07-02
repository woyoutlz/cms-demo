import * as Type from '../constants/ActionType.js';
import { fetchJson } from 'src/utils/fetch.js';
// import { PRODUCT } from 'src/utils/api';

export function getUserList(params) {
    console.log(1, params)
    return dispatch => {
        // dispatch({
        //     payload: {a: 2, b: 3},
        //     type: Type.DEMO
        // })
        // dispatch({
        //     payload: {a: 2, b: 3},
        //     type: Type.DEMO
        // })
        let data = {
            "query": {
                "project_id": params.id,
            }
        }
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
            type: 'POST',
            url: '/api/v1/project/user/list',
            data: { token: window.sessionStorage.getItem('token') ,data:data}
        })
    }
}

