import userAgent from "./userAgent";

/**
 * 判断是否是微信小程序环境
 * @returns boolean
 */
export default function isMiniProgram() {
  const wnu = userAgent().toLowerCase();
  // eslint-disable-next-line no-underscore-dangle
  return (
    /miniprogram/i.test(wnu) ||
    (window as any).__wxjs_environment === "miniprogram"
  );
}
