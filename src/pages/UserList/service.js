import { fetchJson } from 'src/utils/fetch.js';
export const editUser = (data, cb) => {
  const callback = cb;
  fetchJson({
      success: (res) => {
          if(cb){
              callback(res);
          }
          // dispatch({
          //     type: Type.ADD_TRADING_PAIR,
          //     payload: res
          // })
      },
      type: 'POST',
      url: '/api/v1/project/user/check',
      data: {
          token: window.sessionStorage.getItem('token'),
          data: data
      }
  })
}