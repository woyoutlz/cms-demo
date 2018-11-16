import { fetchJson } from 'src/utils/fetch.js';
export const createProject = (data, cb) => {
    const callback = cb;
    fetchJson({
        success: (res) => {
            if (cb) {
                callback(res);
            }
            // dispatch({
            //     type: Type.ADD_TRADING_PAIR,
            //     payload: res
            // })
        },
        type: 'POST',
        url: '/api/v1/project/create',
        data: {
            token: window.sessionStorage.getItem('token'),
            data: { ...data }
        }
    })
}

export const demoFunc = () => {
    const data = {userId: 1};
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
        type: 'GET',
        url: '/api/lottery/lotteryGet',
        data: data,
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

export const editProject = (data, cb) => {
    const callback = cb;
    fetchJson({
        success: (res) => {
            if (cb) {
                callback(res);
            }
            // dispatch({
            //     type: Type.ADD_TRADING_PAIR,
            //     payload: res
            // })
        },
        type: 'POST',
        url: '/api/v1/project/edit',
        data: {
            token: window.sessionStorage.getItem('token'),
            data: { ...data }
        }
    })
}