import userAgent from "./userAgent";

/**
 * 判断是否是ios系统
 * @returns boolean
 */
export default function isIOS() {
  const wnu = userAgent().toLowerCase();
  return /iphone|ipad|ipod/i.test(wnu);
  // return userAgent().match(/iPhone|iPod|iPad/i);
}
