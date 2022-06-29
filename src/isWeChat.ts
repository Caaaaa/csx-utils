import userAgent from "./userAgent";

/**
 * 判断是否是微信浏览器环境
 * @returns boolean
 */
export default function isWeChat() {
  const wnu = userAgent().toLowerCase();
  return /micromessenger/i.test(wnu);
}
