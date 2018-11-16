import { fetchJson } from 'src/utils/fetch.js';
export const login = (userName, password, cb) => {
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
        url: '/lotteryForAdmin/login',
        data: {
            userName: userName,
            password: password
        }
    })
}