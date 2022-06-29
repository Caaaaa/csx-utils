import userAgent from "./userAgent";

/**
 * 判断是否是鸿蒙系统
 * @returns boolean
 */
export default function isHOS() {
  const wnu = userAgent().toLowerCase();
  return /harmonyos|huawei/i.test(wnu);
}
