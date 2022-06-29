import userAgent from "./userAgent";

/**
 * 判断是否是安卓系统
 * @returns boolean
 */
export default function isAndroid() {
  const wnu = userAgent().toLowerCase();
  return /android/i.test(wnu);
  // return userAgent().match(/Android/i);
}
