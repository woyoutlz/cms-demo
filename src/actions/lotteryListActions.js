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
            type: 'POST',
            url: '/lotteryForAdmin/list',
            data: {
                token: window.sessionStorage.getItem('token'),
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

export function createRobort(lotteryId) {
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
                console.log(res);
                // if (!res || !res.length) {
                //     // StaticToast.error('暂无数据');
                //     return false;
                // }
                // dispatch({
                //     type: Type.LIST,
                //     payload: res
                // })
            },
            type: 'POST',
            url: '/lotteryForAdmin/createRobort',
            data: {
                // token: window.sessionStorage.getItem('token'),

                lotteryId: lotteryId,
                robortAccount: 50
                // control:{
                //     limit:100,
                //     sort:{timestamp:-1}
                // }
            }
        })
    }
}

export const editLottery = (values) => {
    return dispatch => {
        fetchJson({
            success: (res) => {
                console.log('editLottery', res);
                // console.log(2, res)
                // const data = res.result.data || [];
                // const newData = data.filter((e) => e.id == params.id);
                // dispatch({
                //     type: Type.GET_FORM,
                //     payload: { data: newData }
                // })
            },
            type: 'PUT',
            url: '/lotteryForAdmin/edit',
            data: values,
            // data: {
            //     token: window.sessionStorage.getItem('token'),
            //     data: {
            //         query: {
            //             id: params.id
            //         }
            //     }
            // }
        });
    }
}

export const delLotteryByLotteryId = (id) => {
    console.log(id, 'ddddddddddd');
    return dispatch => {
        fetchJson({
            success: (res) => {
                console.log('delLottery', res);
            },
            type: 'POST',
            url: '/lotteryForAdmin/deleteLottery',
            data: {
                lotteryId: id
            },
        });
    }
}

export const createLottery = (values) => {
    return dispatch => {
        fetchJson({
            success: (res) => {
                console.log('createLottery', res);
                // console.log(2, res)
                // const data = res.result.data || [];
                // const newData = data.filter((e) => e.id == params.id);
                // dispatch({
                //     type: Type.GET_FORM,
                //     payload: { data: newData }
                // })
            },
            type: 'POST',
            url: '/lotteryForAdmin/add',
            data: values,
            // data: {
            //     token: window.sessionStorage.getItem('token'),
            //     data: {
            //         query: {
            //             id: params.id
            //         }
            //     }
            // }
        });
    }
}
export function getLotteryDetail(id) {

    if (!id) {
        return
    }
    return dispatch => {
        fetchJson({
            success: (res) => {
                console.log(res);
                // console.log(2, res)
                // const data = res.result.data || [];
                // const newData = data.filter((e) => e.id == params.id);
                dispatch({
                    type: Type.GET_FORM,
                    payload: res
                })
            },
            type: 'POST',
            url: '/lotteryForAdmin/detail/'+id,
            // data: {
            //     token: window.sessionStorage.getItem('token'),
            //     data: {
            //         query: {
            //             id: params.id
            //         }
            //     }
            // }
        })
    }
}

