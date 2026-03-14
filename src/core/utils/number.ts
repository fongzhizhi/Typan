/**
 * 严格数字验证（排除 NaN/Infinity）
 * @description 检查值是否为有效的数字类型，排除 NaN 和 Infinity
 * @param value - 待检查的值
 * @returns 如果是有效数字返回 true，否则返回 false
 * @example
 * isValidNumber(42) // true
 * isValidNumber(NaN) // false
 * isValidNumber(Infinity) // false
 * isValidNumber("123") // false
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

/**
 * 是否为可转换为数字的字符串
 * @description 检查字符串是否可以安全转换为有效数字
 * @param value - 待检查的字符串
 * @returns 如果可转换为有效数字返回 true，否则返回 false
 * @example
 * isNumeric("123") // true
 * isNumeric("12.34") // true
 * isNumeric("abc") // false
 * isNumeric("") // false
 * isNumeric(null) // false
 */
export function isNumeric(value: string | null | undefined): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed === "") return false;
  return !isNaN(Number(trimmed)) && isFinite(Number(trimmed));
}

/**
 * 安全转换为整数
 * @description 将任意值转换为整数，失败时返回默认值或 undefined
 * @param value - 待转换的值
 * @param defaultValue - 转换失败时的默认值（可选）
 * @returns 转换后的整数或默认值
 * @example
 * toInt("42") // 42
 * toInt("12.9") // 12
 * toInt("abc") // undefined
 * toInt("abc", 0) // 0
 * toInt(null, -1) // -1
 */
export function toInt(
  value: unknown,
  defaultValue?: number,
): number | undefined {
  const num = Number(value);
  if (isValidNumber(num)) {
    const intValue = Math.trunc(num);
    return intValue;
  }
  return defaultValue;
}

/**
 * 安全转换为浮点数
 * @description 将任意值转换为浮点数，失败时返回默认值或 undefined
 * @param value - 待转换的值
 * @param defaultValue - 转换失败时的默认值（可选）
 * @returns 转换后的浮点数或默认值
 * @example
 * toFloat("3.14") // 3.14
 * toFloat("abc") // undefined
 * toFloat("abc", 0.0) // 0.0
 * toFloat(null, 1.5) // 1.5
 */
export function toFloat(
  value: unknown,
  defaultValue?: number,
): number | undefined {
  const num = Number(value);
  if (isValidNumber(num)) return num;
  return defaultValue;
}

/**
 * 限制数字范围
 * @description 将数字限制在指定的最小值和最大值之间
 * @param value - 待限制的数字
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数字，无效输入返回 0
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 * clamp(NaN, 0, 10) // 0
 */
export function clamp(value: number, min: number, max: number): number {
  if (!isValidNumber(value)) return 0;
  return Math.min(Math.max(value, min), max);
}

/**
 * 判断是否在区间内（包含边界）
 * @description 检查数字是否在指定范围内（包含边界值）
 * @param value - 待检查的数字
 * @param min - 最小值（包含）
 * @param max - 最大值（包含）
 * @returns 如果在范围内返回 true，否则返回 false
 * @example
 * inRange(5, 0, 10) // true
 * inRange(0, 0, 10) // true
 * inRange(10, 0, 10) // true
 * inRange(-1, 0, 10) // false
 * inRange(NaN, 0, 10) // false
 */
export function inRange(value: number, min: number, max: number): boolean {
  if (!isValidNumber(value)) return false;
  return value >= min && value <= max;
}

/**
 * 随机整数 [min, max]
 * @description 生成指定范围内的随机整数（包含边界）
 * @param min - 最小值（包含）
 * @param max - 最大值（包含）
 * @returns 随机整数，无效输入返回 NaN
 * @example
 * randomInt(1, 10) // 1-10 之间的随机整数
 * randomInt(0, 0) // 0
 * randomInt(NaN, 10) // NaN
 */
export function randomInt(min: number, max: number): number {
  if (!isValidNumber(min) || !isValidNumber(max)) return NaN;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机浮点数 [min, max)
 * @description 生成指定范围内的随机浮点数（不包含最大值）
 * @param min - 最小值（包含）
 * @param max - 最大值（不包含）
 * @returns 随机浮点数，无效输入返回 NaN
 * @example
 * randomFloat(0, 1) // 0-1 之间的随机浮点数
 * randomFloat(1.5, 2.5) // 1.5-2.5 之间的随机浮点数
 * randomFloat(NaN, 10) // NaN
 */
export function randomFloat(min: number, max: number): number {
  if (!isValidNumber(min) || !isValidNumber(max)) return NaN;
  return Math.random() * (max - min) + min;
}

/**
 * 判断是否为偶数
 * @description 检查数字是否为偶数
 * @param n - 待检查的数字
 * @returns 如果是偶数返回 true，否则返回 false
 * @example
 * isEven(2) // true
 * isEven(3) // false
 * isEven(0) // true
 * isEven(NaN) // false
 */
export function isEven(n: number): boolean {
  return isValidNumber(n) && n % 2 === 0;
}

/**
 * 判断是否为奇数
 * @description 检查数字是否为奇数
 * @param n - 待检查的数字
 * @returns 如果是奇数返回 true，否则返回 false
 * @example
 * isOdd(3) // true
 * isOdd(2) // false
 * isOdd(1) // true
 * isOdd(NaN) // false
 */
export function isOdd(n: number): boolean {
  return isValidNumber(n) && n % 2 !== 0;
}

/**
 * 格式化数字（千分位）
 * @description 将数字格式化为带千分位分隔符的字符串
 * @param n - 待格式化的数字
 * @param options - 格式化选项
 * @param options.precision - 小数位数（可选）
 * @param options.thousandsSeparator - 千分位分隔符，默认为 ","
 * @returns 格式化后的字符串，无效输入返回空字符串
 * @example
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234.5678, { precision: 2 }) // "1,234.57"
 * formatNumber(1234567, { thousandsSeparator: " " }) // "1 234 567"
 * formatNumber(null) // ""
 */
export function formatNumber(
  n: number | null | undefined,
  options?: { precision?: number; thousandsSeparator?: string },
): string {
  if (!isValidNumber(n)) return "";
  const num = n as number;
  const { precision, thousandsSeparator = "," } = options || {};
  let formatted =
    precision !== undefined ? num.toFixed(precision) : String(num);
  const parts = formatted.split(".");
  if (parts[0]) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }
  return parts.join(".");
}

/**
 * 安全版 toFixed
 * @description 将数字格式化为固定小数位数的字符串，失败时返回 "0.00"
 * @param n - 待格式化的数字
 * @param digits - 小数位数（可选）
 * @returns 格式化后的字符串
 * @example
 * toFixedSafe(3.14159, 2) // "3.14"
 * toFixedSafe(10, 2) // "10.00"
 * toFixedSafe(null) // "0.00"
 * toFixedSafe(NaN, 2) // "0.00"
 */
export function toFixedSafe(
  n: number | null | undefined,
  digits?: number,
): string {
  if (!isValidNumber(n)) return "0.00";
  return (n as number).toFixed(digits);
}
