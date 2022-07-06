import isType from "./isType";
/**
 * url拼接参数
 * @param url 传入url
 * @param querys 传入拼接参数
 * @returns
 */
export default function stringifyUrl(url, querys) {
    let search = "";
    if (!url) {
        throw new Error("无效的url!");
    }
    if (isType(querys, "Object")) {
        search = Object.keys(querys || {})
            .reduce((pre, cur) => {
            let previsous = pre;
            const val = querys ? querys[cur] : "";
            previsous = `${cur}=${val}&`;
            return previsous;
        }, "")
            .replace(/&$/, "");
    }
    else if (isType(querys, "String")) {
        search = querys;
    }
    const result = url.indexOf("?") ? `${url}?${search}` : `${url}&${search}`;
    return result;
}
