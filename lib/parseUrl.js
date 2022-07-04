/**
 * 提取url上的参数
 * @param url 传入的链接
 * @returns
 */
export default function parseUrl(url) {
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
