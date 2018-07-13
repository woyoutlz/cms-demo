import { fetchJson } from 'src/utils/fetch.js';

export const adminService = (url, data, cb) => {
    const callback = cb;
    let params = {
        token: window.sessionStorage.getItem('token')
    }
    Object.assign(params, data)
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
        url: url,
        data: params
    })
}