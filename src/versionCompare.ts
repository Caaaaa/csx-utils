/**
 * 判断两版本号大小
 * @param current 当前版本
 * @param target 对比版本
 * @returns {
 *  1 =
 *  2 >
 *  3 <
 * }
 */
export default function versionCompare(current?: string, target?: string) {
  let result = 1;
  const curVersion = current ? String(current) : "";
  const tarVersion = target ? String(target) : "";
  if (curVersion && tarVersion) {
    if (curVersion === tarVersion) {
      result = 1;
    } else {
      const currentArray = curVersion.split(".");
      const targetArray = tarVersion.split(".");
      const currentLength = currentArray.length;
      const targetLength = targetArray.length;
      const maxLength = Math.max(currentLength, targetLength);
      for (let index = 0; index < maxLength; index += 1) {
        const cur = currentArray[index];
        const tar = targetArray[index];
        if (cur > tar) {
          result = 2;
          break;
        } else if (cur < tar) {
          result = 3;
          break;
        }
      }
    }
  } else if (current && !target) {
    result = 2;
  } else if (target && !current) {
    result = 3;
  } else if (!target && !current) {
    result = 1;
  }
  return result;
}
