/**
 * 判断是否为有效日期
 * @description 检查值是否为有效的 Date 对象
 * @param date - 待检查的值
 * @returns 如果是有效日期返回 true，否则返回 false
 * @example
 * isValidDate(new Date()) // true
 * isValidDate(new Date("invalid")) // false
 * isValidDate("2024-01-01") // false
 * isValidDate(null) // false
 */
export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * 安全解析日期，失败返回 undefined
 * @description 将字符串、数字或 Date 对象转换为有效的 Date 对象
 * @param value - 待解析的值（字符串、时间戳或 Date 对象）
 * @returns 解析后的 Date 对象，失败返回 undefined
 * @example
 * parseDate("2024-01-01") // Date 对象
 * parseDate(1704067200000) // Date 对象
 * parseDate(new Date()) // Date 对象
 * parseDate("invalid") // undefined
 * parseDate(null) // undefined
 */
export function parseDate(
  value: string | number | Date | null | undefined,
): Date | undefined {
  if (value == null) return undefined;
  const date = new Date(value);
  return isValidDate(date) ? date : undefined;
}

/**
 * 简单格式化日期
 * @description 将日期格式化为指定格式的字符串，支持 YYYY/MM/DD/HH/mm/ss 占位符
 * @param date - 待格式化的日期
 * @param format - 格式字符串，默认为 "YYYY-MM-DD"
 * @returns 格式化后的字符串，无效输入返回空字符串
 * @example
 * formatDate(new Date("2024-01-15")) // "2024-01-15"
 * formatDate(new Date("2024-01-15 10:30:45"), "YYYY-MM-DD HH:mm:ss") // "2024-01-15 10:30:45"
 * formatDate(null) // ""
 */
export function formatDate(
  date: Date | null | undefined,
  format = "YYYY-MM-DD",
): string {
  if (!isValidDate(date)) return "";
  const d = date as Date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");
  const second = String(d.getSeconds()).padStart(2, "0");
  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hour)
    .replace("mm", minute)
    .replace("ss", second);
}

/**
 * 日期加减天数
 * @description 在指定日期上增加或减少天数
 * @param date - 基准日期
 * @param days - 要增加的天数（负数表示减少）
 * @returns 计算后的新日期，无效输入返回 Invalid Date
 * @example
 * addDays(new Date("2024-01-15"), 7) // 2024-01-22
 * addDays(new Date("2024-01-15"), -7) // 2024-01-08
 * addDays(null, 7) // Invalid Date
 */
export function addDays(date: Date | null | undefined, days: number): Date {
  const d = parseDate(date);
  if (!d) return new Date(NaN);
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 日期加减月份
 * @description 在指定日期上增加或减少月份
 * @param date - 基准日期
 * @param months - 要增加的月份（负数表示减少）
 * @returns 计算后的新日期，无效输入返回 Invalid Date
 * @example
 * addMonths(new Date("2024-01-15"), 2) // 2024-03-15
 * addMonths(new Date("2024-01-15"), -1) // 2023-12-15
 * addMonths(null, 2) // Invalid Date
 */
export function addMonths(date: Date | null | undefined, months: number): Date {
  const d = parseDate(date);
  if (!d) return new Date(NaN);
  const result = new Date(d);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * 日期加减年份
 * @description 在指定日期上增加或减少年份
 * @param date - 基准日期
 * @param years - 要增加的年份（负数表示减少）
 * @returns 计算后的新日期，无效输入返回 Invalid Date
 * @example
 * addYears(new Date("2024-01-15"), 1) // 2025-01-15
 * addYears(new Date("2024-01-15"), -2) // 2022-01-15
 * addYears(null, 1) // Invalid Date
 */
export function addYears(date: Date | null | undefined, years: number): Date {
  const d = parseDate(date);
  if (!d) return new Date(NaN);
  const result = new Date(d);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * 计算两个日期的毫秒差
 * @description 计算 date1 - date2 的毫秒数
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 毫秒差，任一日期无效返回 undefined
 * @example
 * diffMilliseconds(new Date("2024-01-15"), new Date("2024-01-14")) // 86400000
 * diffMilliseconds(new Date("2024-01-14"), new Date("2024-01-15")) // -86400000
 * diffMilliseconds(null, new Date()) // undefined
 */
export function diffMilliseconds(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
): number | undefined {
  const d1 = parseDate(date1),
    d2 = parseDate(date2);
  if (!d1 || !d2) return undefined;
  return d1.getTime() - d2.getTime();
}

/**
 * 计算两个日期的天数差
 * @description 计算 date1 - date2 的天数（向下取整）
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 天数差，任一日期无效返回 undefined
 * @example
 * diffDays(new Date("2024-01-15"), new Date("2024-01-10")) // 5
 * diffDays(new Date("2024-01-10"), new Date("2024-01-15")) // -5
 * diffDays(null, new Date()) // undefined
 */
export function diffDays(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
): number | undefined {
  const ms = diffMilliseconds(date1, date2);
  return ms === undefined ? undefined : Math.floor(ms / (1000 * 60 * 60 * 24));
}

/**
 * 获取当天开始时间（00:00:00）
 * @description 返回指定日期当天的 00:00:00 时刻
 * @param date - 基准日期
 * @returns 当天开始时间，无效输入返回 Invalid Date
 * @example
 * startOfDay(new Date("2024-01-15 15:30:45")) // 2024-01-15 00:00:00
 * startOfDay(null) // Invalid Date
 */
export function startOfDay(date: Date | null | undefined): Date {
  const d = parseDate(date);
  if (!d) return new Date(NaN);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * 获取当天结束时间（23:59:59.999）
 * @description 返回指定日期当天的 23:59:59.999 时刻
 * @param date - 基准日期
 * @returns 当天结束时间，无效输入返回 Invalid Date
 * @example
 * endOfDay(new Date("2024-01-15 10:30:00")) // 2024-01-15 23:59:59.999
 * endOfDay(null) // Invalid Date
 */
export function endOfDay(date: Date | null | undefined): Date {
  const d = parseDate(date);
  if (!d) return new Date(NaN);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

/**
 * 判断是否为同一天
 * @description 检查两个日期是否为同一天（忽略时间部分）
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 如果是同一天返回 true，否则返回 false
 * @example
 * isSameDay(new Date("2024-01-15 10:00"), new Date("2024-01-15 20:00")) // true
 * isSameDay(new Date("2024-01-15"), new Date("2024-01-16")) // false
 * isSameDay(null, new Date()) // false
 */
export function isSameDay(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
): boolean {
  const d1 = parseDate(date1),
    d2 = parseDate(date2);
  if (!d1 || !d2) return false;
  return d1.toDateString() === d2.toDateString();
}

/**
 * 安全版 toISOString
 * @description 将日期转换为 ISO 8601 格式字符串，失败返回空字符串
 * @param date - 待转换的日期
 * @returns ISO 格式字符串，无效输入返回空字符串
 * @example
 * toISOStringSafe(new Date("2024-01-15")) // "2024-01-15T00:00:00.000Z"
 * toISOStringSafe(null) // ""
 * toISOStringSafe(new Date("invalid")) // ""
 */
export function toISOStringSafe(date: Date | null | undefined): string {
  const d = parseDate(date);
  return d ? d.toISOString() : "";
}
