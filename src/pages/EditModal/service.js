import { fetchFile } from 'src/utils/fetch.js';
export const uploadImgArray = (formData, cb) => {


    fetch('/lotteryForAdmin/uploadImgArray', {
      method: 'POST',
      body: formData
    }).then(resData => toJson(resData))
      .then((resData) => {
        console.log(resData);
        if(typeof cb == 'function'){
            cb.call(null, resData)
        }
      })
}

function toJson(resp) {
    return resp.json();
}

