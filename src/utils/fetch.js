let isFlag = false;

export const fetchJson = (options) => {
    const { url, type, data, ...others } = options;

    isFlag = true;

    let opts = {
        ...others,
        method: type || 'get',
        credentials: 'include',
            headers: options.headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
     
    };
    if(['POST','PUT'].indexOf(opts.method.toUpperCase()) >= 0){
        let params = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }).join("&");
        opts.body = params;
    }
    var newUrl = url;
    if(opts.method.toUpperCase() == 'GET' && data){
        newUrl+='?';
        let params = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }).join("&");
        newUrl+=params;
    }

    fetch(newUrl, opts)
        .then(resData => toJson(resData, opts))
        .catch(error => errorHandler(error,opts))
        .then(resData => resHandler(resData, opts))
        .catch(error => errorHandler(error, opts))
};

function toJson(resp, options) {
    return resp.json();
    
    
}
function resHandler(resData, options){
    options.success(resData)
}
function errorHandler(error, options, status) {
    isFlag=false;
    if(options.error){
        options.error(error);
    }else{
      console.error(error)
    }
    return false;
}
