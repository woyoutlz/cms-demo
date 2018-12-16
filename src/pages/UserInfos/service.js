import { fetchJson } from 'src/utils/fetch.js';

export const deleteProjectServiece = (data, cb) => {
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
        url: '/api/v1/project/delete',
        data: {
            token: window.sessionStorage.getItem('token'),
            data: { ...data }
        }
    })
}
export const sendRemindWinnerMsg = (userId, lotteryId, cb) => {
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
        url: '/lotteryForAdmin/remindWinner',
        data: {
          userId,
          lotteryId
        }
    })

}
