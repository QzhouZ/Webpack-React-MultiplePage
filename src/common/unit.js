/**
 * 采用正则表达式获取地址栏参数
 * @param  {[type]} name [参数名称]
 * @return {[type]}      [description]
 */
let getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
};

/**
 * 字符串截取
 * @param  {[type]} str [字符串]
 * @param  {[type]} len [截取长度]
 * @return {[type]}     [description]
 */
let cutStr = (str, len) => {
    var cutStr = str.replace(/\s+/g, "").substring(0, len);
    return cutStr + '...';
};
export {getUrlParam, cutStr}
