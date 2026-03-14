/**
 * 转义正则特殊字符
 * @description 将字符串中的正则表达式特殊字符转义，使其可以安全用于 RegExp 构造
 * @param str - 待转义的字符串
 * @returns 转义后的字符串，无效输入返回空字符串
 * @example
 * escapeRegExp("hello.world") // "hello\\.world"
 * escapeRegExp("$100") // "\\$100"
 * escapeRegExp("a+b*c?") // "a\\+b\\*c\\?"
 * escapeRegExp(null) // ""
 */
export function escapeRegExp(str: string | null | undefined): string {
  if (typeof str !== "string") return "";
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 安全类型判断
 * @description 检查值是否为 RegExp 对象
 * @param value - 待检查的值
 * @returns 如果是 RegExp 返回 true，否则返回 false
 * @example
 * isRegExp(/abc/) // true
 * isRegExp(new RegExp("abc")) // true
 * isRegExp("abc") // false
 * isRegExp(null) // false
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}

/**
 * 全局匹配，返回迭代器数组
 * @description 安全地执行全局正则匹配，返回所有匹配结果数组
 * @param str - 待匹配的字符串
 * @param regex - 正则表达式（必须带 global 标志）
 * @returns 匹配结果数组，无效输入或非全局正则返回空数组
 * @example
 * matchAllSafe("abc123def456", /\d+/g) // [["123"], ["456"]]
 * matchAllSafe("hello", /\d+/g) // []
 * matchAllSafe(null, /\d+/g) // []
 * matchAllSafe("123", /\d+/) // [] (非全局正则)
 */
export function matchAllSafe(
  str: string | null | undefined,
  regex: RegExp,
): RegExpMatchArray[] {
  if (typeof str !== "string" || !isRegExp(regex) || !regex.global) return [];
  return Array.from(str.matchAll(regex));
}
