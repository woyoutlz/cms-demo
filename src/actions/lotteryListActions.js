import * as Type from '../constants/ActionType.js';
import { fetchJson } from 'src/utils/fetch.js';
// import { PRODUCT } from 'src/utils/api';

export function getLotteryList(params) {
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
                    type: Type.LIST,
                    payload: res
                })
            },
            type: 'GET',
            url: '/api/lotteryForAdmin/list',
            data: {
                // token: window.sessionStorage.getItem('token'),
                // data: {
                //     page: 1,
                //     limit: 100,
                //     "order_by": "created_at",
                //     "asc": false,
                // },
                // control:{
                //     limit:100,
                //     sort:{timestamp:-1}
                // }
            }
        })
    }
}
export function getForm(params) {
    if (!params.id) {
        return
    }
    return dispatch => {
        fetchJson({
            success: (res) => {
                console.log(2, res)
                const data = res.result.data || [];
                const newData = data.filter((e) => e.id == params.id);
                dispatch({
                    type: Type.GET_FORM,
                    payload: { data: newData }
                })
            },
            type: 'POST',
            url: '/api/v1/project/list',
            data: {
                token: window.sessionStorage.getItem('token'),
                data: {
                    query: {
                        id: params.id
                    }
                }
            }
        })
    }
}

