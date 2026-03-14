/**
 * 判断字符串是否为空或仅包含空白字符
 * @description 检查字符串是否为 null、undefined、空字符串或仅包含空白字符
 * @param str 要检查的字符串
 * @returns 是否为空白字符串
 * @example
 * ```ts
 * isBlank(''); // true
 * isBlank('   '); // true
 * isBlank(null); // true
 * isBlank('hello'); // false
 * ```
 */
export function isBlank(
  str: string | null | undefined,
): str is "" | null | undefined {
  return str == null || str.trim() === "";
}

/**
 * 判断字符串是否非空（与 isBlank 相反）
 * @description 类型守卫，收窄类型为非空字符串
 * @param str 要检查的字符串
 * @returns 是否为非空字符串
 * @example
 * ```ts
 * isNotBlank('hello'); // true
 * isNotBlank(''); // false
 * isNotBlank(null); // false
 * ```
 */
export function isNotBlank(str: string | null | undefined): str is string {
  return !isBlank(str);
}

/**
 * 截断字符串并添加省略号
 * @description 如果字符串超过指定长度，截断并添加省略号
 * @param str 目标字符串
 * @param length 最大长度（包含省略号）
 * @param omission 省略号字符串，默认为 '...'
 * @returns 截断后的字符串
 * @example
 * ```ts
 * truncate('hello world', 8); // 'hello...'
 * truncate('hello', 10); // 'hello'
 * truncate('hello world', 8, '…'); // 'hello w…'
 * ```
 */
export function truncate(
  str: string | null | undefined,
  length: number,
  omission = "...",
): string {
  if (typeof str !== "string") return "";
  if (str.length <= length) return str;
  return str.slice(0, Math.max(0, length - omission.length)) + omission;
}

/**
 * 安全截取子串
 * @description 安全地截取字符串的一部分，自动处理边界情况
 * @param str 目标字符串
 * @param start 起始位置
 * @param end 结束位置（可选）
 * @returns 截取的子串
 * @example
 * ```ts
 * safeSubstring('hello', 1, 4); // 'ell'
 * safeSubstring('hello', -1, 10); // 'hello'
 * safeSubstring(null, 0, 5); // ''
 * ```
 */
export function safeSubstring(
  str: string | null | undefined,
  start: number,
  end?: number,
): string {
  if (typeof str !== "string") return "";
  const s = Math.max(0, start);
  const e =
    end === undefined ? str.length : Math.min(Math.max(0, end), str.length);
  if (s >= e) return "";
  return str.slice(s, e);
}

/**
 * 安全截取子串（safeSubstring 的别名）
 */
export const safeSlice = safeSubstring;

/**
 * 首字母大写
 * @description 将字符串的首字母转为大写，其余字母转为小写
 * @param str 目标字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * capitalize('hello'); // 'Hello'
 * capitalize('HELLO'); // 'Hello'
 * capitalize(''); // ''
 * ```
 */
export function capitalize(str: string | null | undefined): string {
  if (typeof str !== "string" || str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 转换为驼峰命名
 * @description 将字符串转换为 camelCase 格式
 * @param str 目标字符串
 * @returns 驼峰命名格式的字符串
 * @example
 * ```ts
 * camelCase('hello-world'); // 'helloWorld'
 * camelCase('hello_world'); // 'helloWorld'
 * camelCase('hello world'); // 'helloWorld'
 * ```
 */
export function camelCase(str: string | null | undefined): string {
  if (typeof str !== "string") return "";
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
}

/**
 * 转换为中划线命名
 * @description 将字符串转换为 kebab-case 格式
 * @param str 目标字符串
 * @returns 中划线命名格式的字符串
 * @example
 * ```ts
 * kebabCase('helloWorld'); // 'hello-world'
 * kebabCase('hello_world'); // 'hello-world'
 * kebabCase('HelloWorld'); // 'hello-world'
 * ```
 */
export function kebabCase(str: string | null | undefined): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * 转换为蛇形命名
 * @description 将字符串转换为 snake_case 格式
 * @param str 目标字符串
 * @returns 蛇形命名格式的字符串
 * @example
 * ```ts
 * snakeCase('helloWorld'); // 'hello_world'
 * snakeCase('hello-world'); // 'hello_world'
 * snakeCase('HelloWorld'); // 'hello_world'
 * ```
 */
export function snakeCase(str: string | null | undefined): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
}

/**
 * 检查字符串是否包含子串
 * @description 安全地检查字符串是否包含指定子串
 * @param str 目标字符串
 * @param search 要查找的子串
 * @param fromIndex 开始查找的位置，默认为 0
 * @returns 是否包含子串
 * @example
 * ```ts
 * contains('hello world', 'world'); // true
 * contains('hello world', 'foo'); // false
 * contains(null, 'test'); // false
 * ```
 */
export function contains(
  str: string | null | undefined,
  search: string,
  fromIndex = 0,
): boolean {
  if (typeof str !== "string" || typeof search !== "string") return false;
  return str.indexOf(search, fromIndex) !== -1;
}

/**
 * 忽略大小写比较字符串
 * @description 比较两个字符串是否相等（忽略大小写）
 * @param a 第一个字符串
 * @param b 第二个字符串
 * @returns 是否相等
 * @example
 * ```ts
 * equalsIgnoreCase('Hello', 'hello'); // true
 * equalsIgnoreCase('Hello', 'world'); // false
 * equalsIgnoreCase(null, null); // true
 * ```
 */
export function equalsIgnoreCase(
  a: string | null | undefined,
  b: string | null | undefined,
): boolean {
  if (a == null || b == null) return a === b;
  if (typeof a !== "string" || typeof b !== "string") return false;
  return a.toLocaleLowerCase() === b.toLocaleLowerCase();
}

/**
 * 去除首尾空格，若结果为空则返回 null
 * @description 修剪字符串并在结果为空时返回 null，便于数据库存储
 * @param str 目标字符串
 * @returns 修剪后的字符串或 null
 * @example
 * ```ts
 * trimToNull('  hello  '); // 'hello'
 * trimToNull('   '); // null
 * trimToNull(''); // null
 * ```
 */
export function trimToNull(str: string | null | undefined): string | null {
  if (typeof str !== "string") return null;
  const trimmed = str.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * 安全重复字符串
 * @description 安全版的 String.prototype.repeat，处理非法输入
 * @param str 目标字符串
 * @param count 重复次数
 * @returns 重复后的字符串
 * @example
 * ```ts
 * repeatSafe('a', 3); // 'aaa'
 * repeatSafe('ab', 2); // 'abab'
 * repeatSafe(null, 3); // ''
 * repeatSafe('a', -1); // ''
 * ```
 */
export function repeatSafe(
  str: string | null | undefined,
  count: number,
): string {
  if (
    typeof str !== "string" ||
    typeof count !== "number" ||
    count < 0 ||
    !Number.isInteger(count)
  ) {
    return "";
  }
  return str.repeat(count);
}

/**
 * 在字符串开头填充字符
 * @description 安全版的 String.prototype.padStart
 * @param str 目标字符串
 * @param targetLength 目标长度
 * @param padString 填充字符串，默认为空格
 * @returns 填充后的字符串
 * @example
 * ```ts
 * padStart('5', 3, '0'); // '005'
 * padStart('hello', 10); // '     hello'
 * ```
 */
export function padStart(
  str: string | null | undefined,
  targetLength: number,
  padString = " ",
): string {
  if (typeof str !== "string") return "";
  return str.padStart(targetLength, padString);
}

/**
 * 在字符串末尾填充字符
 * @description 安全版的 String.prototype.padEnd
 * @param str 目标字符串
 * @param targetLength 目标长度
 * @param padString 填充字符串，默认为空格
 * @returns 填充后的字符串
 * @example
 * ```ts
 * padEnd('5', 3, '0'); // '500'
 * padEnd('hello', 10); // 'hello     '
 * ```
 */
export function padEnd(
  str: string | null | undefined,
  targetLength: number,
  padString = " ",
): string {
  if (typeof str !== "string") return "";
  return str.padEnd(targetLength, padString);
}
