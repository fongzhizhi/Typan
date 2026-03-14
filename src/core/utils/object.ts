/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 深度读取对象属性
 * @description 安全地读取对象的深层嵌套属性，支持路径字符串或数组形式
 * @template T 返回值类型
 * @param obj 目标对象
 * @param path 属性路径，可以是字符串（如 'a.b.c'）或数组（如 ['a', 'b', 'c']）
 * @param defaultValue 默认值，当路径不存在时返回
 * @returns 属性值或默认值
 * @example
 * ```ts
 * const obj = { a: { b: { c: 42 } } };
 * safeGet(obj, 'a.b.c'); // 42
 * safeGet(obj, ['a', 'b', 'c']); // 42
 * safeGet(obj, 'a.b.x', 'default'); // 'default'
 * safeGet(null, 'a.b', 'default'); // 'default'
 * ```
 */
export function safeGet<T = any>(
  obj: any,
  path: string | string[],
  defaultValue?: T,
): T | undefined {
  if (obj == null) return defaultValue;
  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result == null || !Object.prototype.hasOwnProperty.call(result, key)) {
      return defaultValue;
    }
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}

/**
 * 深度设置对象属性
 * @description 安全地设置对象的深层嵌套属性，中间路径不存在时自动创建
 * @param obj 目标对象，如果为 null/undefined 会创建新对象
 * @param path 属性路径，可以是字符串（如 'a.b.c'）或数组（如 ['a', 'b', 'c']）
 * @param value 要设置的值
 * @returns 修改后的对象
 * @example
 * ```ts
 * const obj = {};
 * safeSet(obj, 'a.b.c', 42);
 * console.log(obj); // { a: { b: { c: 42 } } }
 *
 * safeSet(null, 'x.y', 10); // { x: { y: 10 } }
 * ```
 */
export function safeSet(
  obj: any,
  path: string | string[],
  value: unknown,
): any {
  if (obj == null) obj = {};
  const keys = Array.isArray(path) ? path : path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!key) continue;
    if (current[key] == null || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];
  if (lastKey) {
    current[lastKey] = value;
  }
  return obj;
}

/**
 * 递归合并多个对象
 * @description 深度合并对象，嵌套对象会递归合并而非覆盖。忽略 null/undefined 源对象
 * @template T 目标对象类型
 * @param target 目标对象
 * @param sources 源对象列表
 * @returns 合并后的对象
 * @example
 * ```ts
 * const target = { a: 1, b: { c: 2 } };
 * const source = { b: { d: 3 }, e: 4 };
 * deepMerge(target, source);
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * deepMerge({ x: 1 }, null, { y: 2 }); // { x: 1, y: 2 }
 * ```
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: (Partial<T> | null | undefined)[]
): T {
  if (target == null) target = {} as T;
  const result = { ...target };
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      const val = source[key];
      if (val && typeof val === "object" && !Array.isArray(val)) {
        result[key] = deepMerge(result[key] || ({} as any), val as any) as any;
      } else {
        result[key] = val as any;
      }
    }
  }
  return result;
}

/**
 * 选取对象的指定属性
 * @description 创建一个新对象，只包含指定的属性
 * @template T 对象类型
 * @template K 属性键类型
 * @param obj 目标对象
 * @param keys 要选取的属性键列表
 * @returns 只包含指定属性的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, 'a', 'c'); // { a: 1, c: 3 }
 * pick(null, 'a'); // {}
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  ...keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  if (!obj) return result;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

/**
 * 排除对象的指定属性
 * @description 创建一个新对象，排除指定的属性
 * @template T 对象类型
 * @template K 属性键类型
 * @param obj 目标对象
 * @param keys 要排除的属性键列表
 * @returns 排除指定属性后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, 'b'); // { a: 1, c: 3 }
 * omit(obj, 'a', 'c'); // { b: 2 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  ...keys: K[]
): Omit<T, K> {
  if (!obj) return {} as Omit<T, K>;
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * 根据谓词函数选取属性
 * @description 创建一个新对象，只包含满足谓词条件的属性
 * @template T 对象类型
 * @param obj 目标对象
 * @param predicate 判断函数，返回 true 的属性会被保留
 * @returns 包含满足条件属性的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * pickBy(obj, (val) => val > 1); // { b: 2, c: 3 }
 * pickBy(obj, (val, key) => key !== 'b'); // { a: 1, c: 3 }
 * ```
 */
export function pickBy<T extends object>(
  obj: T | null | undefined,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};
  if (!obj) return result;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (predicate(value, key)) result[key] = value;
    }
  }
  return result;
}

/**
 * 根据谓词函数排除属性
 * @description 创建一个新对象，排除满足谓词条件的属性
 * @template T 对象类型
 * @param obj 目标对象
 * @param predicate 判断函数，返回 true 的属性会被排除
 * @returns 排除满足条件属性后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * omitBy(obj, (val) => val > 1); // { a: 1 }
 * omitBy(obj, (val, key) => key === 'b'); // { a: 1, c: 3 }
 * ```
 */
export function omitBy<T extends object>(
  obj: T | null | undefined,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};
  if (!obj) return result;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!predicate(value, key)) result[key] = value;
    }
  }
  return result;
}

/**
 * 映射对象的值
 * @description 创建一个新对象，键保持不变，值通过映射函数转换
 * @template T 对象类型
 * @template U 新值类型
 * @param obj 目标对象
 * @param fn 值映射函数
 * @returns 值被映射后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * mapValues(obj, (val) => val * 2); // { a: 2, b: 4, c: 6 }
 * mapValues(obj, (val, key) => `${key}:${val}`); // { a: 'a:1', b: 'b:2', c: 'c:3' }
 * ```
 */
export function mapValues<T extends object, U>(
  obj: T | null | undefined,
  fn: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  if (!obj) return result;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn(obj[key], key);
    }
  }
  return result;
}

/**
 * 映射对象的键
 * @description 创建一个新对象，值保持不变，键通过映射函数转换
 * @template T 对象类型
 * @param obj 目标对象
 * @param fn 键映射函数
 * @returns 键被映射后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * mapKeys(obj, (key) => key.toUpperCase()); // { A: 1, B: 2 }
 * mapKeys(obj, (key, val) => `${key}_${val}`); // { a_1: 1, b_2: 2 }
 * ```
 */
export function mapKeys<T extends object>(
  obj: T | null | undefined,
  fn: (key: keyof T, value: T[keyof T]) => string,
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  if (!obj) return result;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = fn(key, obj[key]);
      result[newKey] = obj[key];
    }
  }
  return result;
}

/**
 * 严格检查是否为纯对象
 * @description 判断值是否为纯对象（通过 {} 或 new Object() 创建）
 * @param value 要检查的值
 * @returns 是否为纯对象
 * @example
 * ```ts
 * isPlainObject({}); // true
 * isPlainObject({ a: 1 }); // true
 * isPlainObject([]); // false
 * isPlainObject(new Date()); // false
 * isPlainObject(null); // false
 * ```
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (value == null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * 判断对象是否为空
 * @description 检查对象是否没有自身可枚举属性
 * @param obj 要检查的对象
 * @returns 是否为空对象
 * @example
 * ```ts
 * isEmptyObject({}); // true
 * isEmptyObject({ a: 1 }); // false
 * isEmptyObject(null); // true
 * isEmptyObject([]); // true (数组也是对象)
 * ```
 */
export function isEmptyObject(obj: any): boolean {
  if (obj == null) return true;
  return Object.keys(obj).length === 0;
}

/**
 * 简易深克隆
 * @description 递归克隆对象和数组，不处理循环引用、函数、正则等复杂情况
 * @template T 对象类型
 * @param obj 要克隆的对象
 * @returns 克隆后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
 * const cloned = deepClone(obj);
 * cloned.b.c = 999;
 * console.log(obj.b.c); // 2 (原对象不受影响)
 * ```
 * @warning 不支持循环引用、函数、正则表达式、Date、Map、Set 等特殊对象
 */
export function deepClone<T>(obj: T): T {
  if (obj == null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as any;
  if (isPlainObject(obj)) {
    const cloned = {} as any;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
}

/**
 * 深度冻结对象
 * @description 递归冻结对象及其所有嵌套属性，仅在开发环境生效
 * @template T 对象类型
 * @param obj 要冻结的对象
 * @returns 冻结后的对象
 * @example
 * ```ts
 * const obj = { a: 1, b: { c: 2 } };
 * deepFreeze(obj);
 * obj.a = 999; // 严格模式下会抛出错误
 * obj.b.c = 999; // 严格模式下会抛出错误
 * ```
 * @note 仅在 NODE_ENV === 'development' 时生效，生产环境直接返回原对象
 */
export function deepFreeze<T extends object>(obj: T): T {
  if (process.env.NODE_ENV === "development") {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      const val = (obj as any)[prop];
      if (val && typeof val === "object" && !Object.isFrozen(val)) {
        deepFreeze(val);
      }
    });
  }
  return obj;
}
