
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 调用app指令
 * @param cmd 指令
 * @param param 指令参数
 * @param appVersion app版本
 * @param iosFixVersion ios下指令调用方法修复
 */
function appTo(cmd, param, appVersion, iosFixVersion) {
    if (isIOS()) {
        const cmdParam = `${cmd}:${param}`;
        if (versionCompare(appVersion, iosFixVersion) <= 2) {
            const windowWebkit = window.webkit;
            if (windowWebkit) {
                windowWebkit.messageHandlers.sendCommand.postMessge(cmdParam);
            }
            else {
                throw new Error("不支持！");
            }
        }
        else {
            window.location.href = cmdParam;
        }
    }
    else if (isAndroid()) {
        const windowJavaScriptHelper = window.javaScriptHelper;
        if (windowJavaScriptHelper) {
            windowJavaScriptHelper.sendCommand(cmd, param);
        }
        else {
            throw new Error("不支持！");
        }
    }
    else {
        throw new Error("不在APP环境内!");
    }
}

/**
 * 获取浏览器环境
 * @returns string
 */
function userAgent() {
    return window.navigator.userAgent;
}

/**
 * 判断是否是安卓系统
 * @returns boolean
 */
function isAndroid() {
    const wnu = userAgent().toLowerCase();
    return /android/i.test(wnu);
    // return userAgent().match(/Android/i);
}

/**
 * 判断是否是鸿蒙系统
 * @returns boolean
 */
function isHOS() {
    const wnu = userAgent().toLowerCase();
    return /harmonyos|huawei/i.test(wnu);
}

/**
 * 判断是否是ios系统
 * @returns boolean
 */
function isIOS() {
    const wnu = userAgent().toLowerCase();
    return /iphone|ipad|ipod/i.test(wnu);
    // return userAgent().match(/iPhone|iPod|iPad/i);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 判断是否是微信小程序环境
 * @returns boolean
 */
function isMiniProgram() {
    const wnu = userAgent().toLowerCase();
    return (/miniprogram/i.test(wnu) ||
        // eslint-disable-next-line no-underscore-dangle
        window.__wxjs_environment === "miniprogram");
}

/**
 * 判断是否是微信浏览器环境
 * @returns boolean
 */
function isWeChat() {
    const wnu = userAgent().toLowerCase();
    return /micromessenger/i.test(wnu);
}

function parseUrl(url) {
    const initUrl = url || window.location.search;
    const parameters = initUrl
        .replace("?", "")
        .split("&")
        .reduce((pre, cur) => {
        const query = pre;
        const [key, val] = cur.split("=");
        query[key] = decodeURIComponent(val);
        return query;
    }, {});
    return function returnParameter(...args) {
        const argsLength = args.length;
        if (argsLength === 1) {
            return parameters[args];
        }
        if (argsLength > 1) {
            const resultParameters = [...new Set(...args)].reduce((pre, cur) => {
                const previsous = pre;
                previsous[cur] = parameters[cur];
                return previsous;
            }, {});
            return resultParameters;
        }
        return parameters;
    };
}

/**
 * 判断两版本号大小
 * @param current 当前版本
 * @param target 对比版本
 * @returns {
 *  1 =
 *  2 >
 *  3 <
 * }
 */
function versionCompare(current, target) {
    let result = 1;
    const curVersion = current ? String(current) : "";
    const tarVersion = target ? String(target) : "";
    if (curVersion && tarVersion) {
        if (curVersion === tarVersion) {
            result = 1;
        }
        else {
            const currentArray = curVersion.split(".");
            const targetArray = tarVersion.split(".");
            const currentLength = currentArray.length;
            const targetLength = targetArray.length;
            const maxLength = Math.max(currentLength, targetLength);
            for (let index = 0; index < maxLength; index += 1) {
                const cur = currentArray[index];
                const tar = targetArray[index];
                if (cur > tar) {
                    result = 2;
                    break;
                }
                else if (cur < tar) {
                    result = 3;
                    break;
                }
            }
        }
    }
    else if (current && !target) {
        result = 2;
    }
    else if (target && !current) {
        result = 3;
    }
    else if (!target && !current) {
        result = 1;
    }
    return result;
}

exports.appTo = appTo;
exports.isAndroid = isAndroid;
exports.isHOS = isHOS;
exports.isIOS = isIOS;
exports.isMiniProgram = isMiniProgram;
exports.isWeChat = isWeChat;
exports.parseUrl = parseUrl;
exports.userAgent = userAgent;
exports.versionCompare = versionCompare;
