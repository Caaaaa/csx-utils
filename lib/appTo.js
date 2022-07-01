/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAndroid, isIOS, versionCompare } from "./index";
/**
 * 调用app指令
 * @param cmd 指令
 * @param param 指令参数
 * @param appVersion app版本
 * @param iosFixVersion ios下指令调用方法修复
 */
export default function appTo(cmd, param, appVersion, iosFixVersion) {
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
