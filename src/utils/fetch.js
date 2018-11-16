let isFlag = false;
export const api_post = (url, data, istoken, cb) => {
    let in_data = data
    if (istoken) {
        in_data.token = window.sessionStorage.getItem('token')
    }
    const callback = cb
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
        data: in_data
    })
}
export const api_get = (url, data, cb) => {
    let in_data = data
    const callback = cb
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
        type: 'GET',
        url: url,
        data: in_data
    })
}
export const fetchJson = (options) => {
    const { url, type, data, ...others } = options;

    isFlag = true;

    let opts = {
        ...others,
        method: type || 'get',
        credentials: 'include',
        headers: options.headers || {
            'x-access-token': window.sessionStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    };
    if (['POST', 'PUT'].indexOf(opts.method.toUpperCase()) >= 0) {
        // let params = Object.keys(data).map(function (key) {
        //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        // }).join("&");
        console.log(data);
        opts.body = JSON.stringify(data);
    }
    var newUrl = url;
    if (opts.method.toUpperCase() == 'GET' && data) {
        newUrl += '?';
        let params = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }).join("&");
        newUrl += params;
    }
    fetch(newUrl, opts)
        .then(resData => toJson(resData, opts))
        .catch(error => errorHandler(error, opts))
        .then(resData => resHandler(resData, opts))
        .catch(error => errorHandler(error, opts))
};

function toJson(resp, options) {
    return resp.json();


}
function resHandler(resData, options) {
    options.success(resData)
}
function errorHandler(error, options, status) {
    isFlag = false;
    if (options.error) {
        options.error(error);
    } else {
        console.error(error)
    }
    return false;
}
