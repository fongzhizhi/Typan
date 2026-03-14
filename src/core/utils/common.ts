/**
 * 通用空值判断
 * @description 判断值是否为 null、undefined 或空字符串
 * @param value 要检查的值
 * @returns 是否为空值
 * @example
 * ```ts
 * isNone(null); // true
 * isNone(undefined); // true
 * isNone(''); // true
 * isNone(0); // false
 * isNone(false); // false
 * isNone('hello'); // false
 * ```
 */
export function isNone(value: unknown): value is null | undefined | "" {
  return value == null || value === "";
}

/**
 * 非空值判断（与 isNone 相反）
 * @description 判断值是否不为 null、undefined 或空字符串，类型守卫收窄为非空类型
 * @template T 值类型
 * @param value 要检查的值
 * @returns 是否为非空值
 * @example
 * ```ts
 * isNotNone('hello'); // true
 * isNotNone(0); // true
 * isNotNone(false); // true
 * isNotNone(null); // false
 * isNotNone(''); // false
 * ```
 */
export function isNotNone<T>(
  value: T,
): value is Exclude<T, null | undefined | ""> {
  return !isNone(value);
}

/**
 * 空函数
 * @description 什么都不做的函数，常用作默认回调或占位符
 * @returns undefined
 * @example
 * ```ts
 * const callback = someCondition ? realCallback : noop;
 * callback(); // 安全调用，不会报错
 * ```
 */
export const noop = (): void => {};
