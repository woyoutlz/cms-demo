import env from 'src/utils/env';
import { browserHistory } from 'react-router';

module.exports = {

    jsGetAge: function (strBirthday) {
        if (!strBirthday) {
            return null;
        }
        let returnAge;
        let strBirthdayArr = strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;//返回周岁年龄

    },
    jsGetAgeCodey: function (strBirthday) {
        if (!strBirthday) {
            return null;
        }
        let returnAge;
        let strBirthdayArr = strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;//返回周岁年龄

    },

    chineseDateFormat: function (date) {
        let _date = date.replace('年', '-').replace('月', '-').replace('日', '');
        let dateArr = _date.split('-');
        if (dateArr[1] < 10) {
            dateArr[1] = '0' + dateArr[1];
        }
        if (dateArr[2] < 10) {
            dateArr[2] = '0' + dateArr[2];
        }
        _date = dateArr.join('-');
        return _date;
    },

    handleDate: function (y, d) {
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        if (typeof d != "undefined") {
            let newDate1 = new Date(newDate - d * 24 * 3600 * 1000);
            year = newDate1.getFullYear();
            month = newDate1.getMonth() + 1;
            day = newDate1.getDate();
        }
        if (typeof y != "undefined") {
            year = year - y;
        }
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return year + "-" + month + "-" + day;
    },

    toDecimal2: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return '';
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    returnFloat: function (value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    },

    erMsgHandler: function (obj) {
        obj.errorMsg = [];

        obj.error = function (msg) {
            this.errorMsg.push(msg);
        };

        obj.clearError = function (msg) {
            if (msg) {
                const i = this.errorMsg.findIndex((item) => { return item == msg });
                if (i >= 0) {
                    this.errorMsg.splice(i, 1);
                }
            } else {
                this.errorMsg = [];
            }
        };
    },

    hrefTo: function (url) {
        // window.localStorage.setItem('postUrl', `${window.location.pathname}`)
        // window.localStorage.setItem('nextUrl', `/${env.ROOT_ROUTE_PATH}${url}`)
        browserHistory.push('/' + env.ROOT_ROUTE_PATH + url);
    },

    hrefToHard: function (url) {
        // window.localStorage.setItem('postUrl', `${window.location.pathname}`)
        // window.localStorage.setItem('nextUrl', `/${env.ROOT_ROUTE_PATH}${url}`)
        location.href = location.origin + '/' + env.ROOT_ROUTE_PATH + url;

    },

    hrefToGruop: function (url) {
        location.href = location.origin + '/' + 'sit/jdtg' + url;
    },

    getHrefUrl: function (url) {
        return location.origin + '/' + env.ROOT_ROUTE_PATH + url;
    },

    getRouteUrl: function (url) {
        return '/' + env.ROOT_ROUTE_PATH + url;
    },

    getLCalendarUrl: function () {
        if (env.ENVIRONMENT == 'prd') {
            return env.DOMAIN;
        } else {
            return env.DOMAIN + '/' + env.ENVIRONMENT
        }
    },

    //签名页面URL
    getAnysignUrl: function () {
        if (env.ENVIRONMENT == 'prd') {
            return env.DOMAIN;
        } else {
            return env.DOMAIN + '/' + env.ENVIRONMENT
        }
    },

    isEmptyObject: function (obj) {
        for (let key in obj) {
            return false
        }
        return true
    },

    deepCopy: function (oldObj) {
        if (oldObj instanceof Array) {
            var newObj = [];
            for (var i = 0; i < oldObj.length; i++) {
                if (typeof (oldObj[i]) !== 'object') {
                    newObj.push(oldObj[i])
                } else {
                    newObj[i] = this.deepCopy(oldObj[i]);
                }
            }
        } else if (oldObj instanceof Object) {
            var newObj = {}
            for (var key in oldObj) {
                if (typeof (oldObj[key]) !== 'object') {
                    newObj[key] = oldObj[key]
                } else {
                    newObj[key] = this.deepCopy(oldObj[key]);
                }
            }
        }
        return newObj;
    },

    extendObj: function (a, b) {
        var newA = this.deepCopy(a);
        return Object.assign(newA, b);
    },
	/**
	 * 
	 * @param {Object} p 省份code
	 * @param {Object} c 市code
	 * @param {Object} a 区域code
	 * @param {Object} dict 省市全量数据
	  返回code对应的省市区列表{P:[],C:[],A:[]},code为空默认返回北京
	 */
    getCityProvince: function (p, c, a, dict) {
        var pList = [];
        var cList = [];
        var aList = [];
        dict && dict.map(function (item, key) {//省份循环迭代
            pList.push({ key: item.key, value: item.value });
            if (p) { //省份code存在
                if (item.key == p) {
                    //循环迭代市列表
                    item.subList && item.subList.map(function (cItem, cKey) {
                        cList.push({ key: cItem.key, value: cItem.value });
                        //过滤区列表
                        if (c) {//市code存在,那么过滤出该市下的区
                            if (c == cItem.key) {
                                cItem.subList && cItem.subList.map(function (aItem, cKey) {
                                    aList.push({ key: aItem.key, value: aItem.value });
                                })
                            }
                        } else {//市code不存在,那么区默认为该省份下的第一个市下的第一个区
                            aList = [];
                            item.subList[0].subList.map(function (aItem, key) {
                                aList.push({ key: aItem.key, value: aItem.value });
                            })
                        }
                    })
                }
            } else {//省份code不存在,默认第一个省市区
                cList = [];
                aList = [];
                dict && dict[0] && dict[0].subList.map(function (cItem, key) {
                    cList.push({ key: cItem.key, value: cItem.value });
                });
                dict && dict[0] && dict[0].subList && dict[0].subList[0] && dict[0].subList[0].subList.map(function (aItem, key) {
                    aList.push({ key: aItem.key, value: aItem.value });
                })
            }
        });

        return {
            pList: pList,
            cList: cList,
            aList: aList
        }
    }
    ,
	/**
	 * 获取cookie
	 */
    getCookie (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return '';
    },
	/**
	 * 根据身份证号码计算性别
	 */
    getSexById (idNum) {
        if (idNum.length === 15) {
            return idNum.substr(14, 1) % 2 === 0 ? 'F' : 'M'
        }
        if (idNum.length === 18) {
            return idNum.substr(16, 1) % 2 === 0 ? 'F' : 'M'
        }
        return ''
    }

}
