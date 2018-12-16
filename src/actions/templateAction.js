import * as Type from '../constants/ActionType.js';
import { fetchJson, fetchFile } from 'src/utils/fetch.js';
// import { PRODUCT } from 'src/utils/api';

export function getTemplateList(params) {
  return dispatch => {
    fetchJson({
      success: (res) => {
        // if (!res || !res.length) {
        //     // StaticToast.error('暂无数据');
        //     return false;
        // }
        dispatch({
          type: Type.GET_TEMPLATE_LIST,
          payload: res
        })
      },
      type: 'POST',
      url: '/lotteryForAdmin/template/templateInfoList'
    })
  }
}
export function getLotteryListPro(params) {
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

            },
            type: 'POST',
            url: '/lotteryForAdmin/listPro'
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
                robortAccount: 260
                // control:{
                //     limit:100,
                //     sort:{timestamp:-1}
                // }
            }
        })
    }
}
export function delRobort(lotteryId) {
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
            url: '/lotteryForAdmin/delRobort',
            data: {
                // token: window.sessionStorage.getItem('token'),

                lotteryId: lotteryId,
                // control:{
                //     limit:100,
                //     sort:{timestamp:-1}
                // }
            }
        })
    }
}


// export const changeOpenType = (value) => {
//     return {
//         type: Type.CHANGE_OPEN_TYPE,
//     }
// }

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

export const createTemplate = (values) => {
  return dispatch => {
    fetchJson({
      success: (res) => {
        console.log('createLottery', res);
      },
      type: 'POST',
      url: '/lotteryForAdmin/template/edit',
      data: values,
    });
  }
}
export function getTemplateDetail(id) {
  return dispatch => {
    fetchJson({
      success: (res) => {
        console.log(res, 'resres');
        dispatch({
          type: Type.GET_TEMPLATE_DETAIL,
          payload: res
        });
      },
      data:{
        templateId: id
      },
      type: 'POST',
      url: '/lotteryForAdmin/template/detail',
    })
  }
}

