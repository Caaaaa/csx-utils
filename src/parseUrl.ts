/**
 * 提取url上的参数
 * @param url 传入的链接
 * @returns
 */
export default function parseUrl(url?: string) {
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
      return parameters[args as unknown as string];
    }
    if (argsLength > 1) {
      const resultParameters = [...new Set(...args)].reduce((pre, cur) => {
        const previsous: Record<string, string | undefined> = pre as Record<
          string,
          string | undefined
        >;
        previsous[cur as string] = parameters[cur as string];
        return previsous;
      }, {});
      return resultParameters;
    }
    return parameters;
  };
}
