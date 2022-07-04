import isType from "./isType";
/**
 * url拼接参数
 * @param url 传入url
 * @param querys 传入拼接参数
 * @returns
 */
export default function stringifyUrl(
  url: string,
  querys?: Record<string, string | number> | string
) {
  let search = "";
  if (!url) {
    throw new Error("无效的url!");
  }
  if (isType(querys, "object")) {
    search = Object.keys(querys || {})
      .reduce((pre, cur) => {
        let previsous = pre;
        const val = querys ? querys[cur] : "";
        previsous = `${cur}=${val}&`;
        return previsous;
      }, "")
      .replace(/&$/, "");
  } else if (isType(querys, "string")) {
    search = querys as string;
  }

  const result = url.indexOf("?") ? `${url}&${search}` : `${url}?${search}`;

  return result;
}
