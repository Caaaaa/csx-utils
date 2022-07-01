export default function stringifyUrl(
  url: string,
  querys?: Record<string, string | number>
) {
  if (!url) {
    throw new Error("无效的url!");
  }

  const search = Object.keys(querys || {})
    .reduce((pre, cur) => {
      let previsous = pre;
      const val = querys ? querys[cur] : "";
      previsous = `${cur}=${val}&`;
      return previsous;
    }, "")
    .replace(/&$/, "");

  const result = url.indexOf("?") ? `${url}&${search}` : `${url}?${search}`;

  return result;
}
