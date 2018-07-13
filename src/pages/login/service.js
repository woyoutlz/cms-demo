import { fetchJson } from 'src/utils/fetch.js';
export const login = (account, password, cb) => {
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
        url: '/api/account/login',
        data: {
            account: account,
            password: password
        }
    })
}