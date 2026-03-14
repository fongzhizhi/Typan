/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 安全、可中断的数组遍历
 * @description 提供类似 forEach 的遍历功能，但支持中断。对 null/undefined 输入安全处理
 * @template T 数组元素类型
 * @param arr 目标数组，可以为 null 或 undefined
 * @param cb 遍历回调函数，返回 true 可中断遍历
 * @returns 是否被中断（true 表示被中断，false 表示正常遍历完成或输入非法）
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 * const interrupted = iterateArr(arr, (val) => {
 *   console.log(val);
 *   return val === 3; // 遇到 3 时中断
 * });
 * console.log(interrupted); // true
 * ```
 */
export function iterateArr<T>(
  arr: T[] | null | undefined,
  cb: (value: T, index: number, array: T[]) => boolean | void,
): boolean {
  if (!Array.isArray(arr)) return false;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item !== undefined && cb(item, i, arr) === true) return true;
  }
  return false;
}

/**
 * 将数组拆分为指定大小的块
 * @description 将一个数组按指定大小分割成多个子数组
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param size 每块的大小，必须大于 0
 * @returns 分块后的二维数组，输入非法时返回空数组
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 3); // [[1, 2, 3]]
 * chunk(null, 2); // []
 * ```
 */
export function chunk<T>(arr: T[] | null | undefined, size: number): T[][] {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 移除数组中的假值（null/undefined/''/0/false/NaN）
 * @description 过滤掉所有假值，并通过类型守卫收窄类型为非空
 * @template T 数组元素类型
 * @param arr 目标数组
 * @returns 过滤后的数组，只包含真值
 * @example
 * ```ts
 * compact([1, null, 2, undefined, 3, false, 4, '', 0]); // [1, 2, 3, 4]
 * compact([0, false, '', null]); // []
 * ```
 */
export function compact<T>(
  arr: (T | null | undefined | false | "" | 0)[] | null | undefined,
): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item): item is T => Boolean(item) === true);
}

/**
 * 安全访问数组元素，支持负数索引
 * @description 类似 Array.at()，但对 null/undefined 输入安全处理
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param index 索引位置，支持负数（-1 表示最后一个元素）
 * @returns 指定位置的元素，越界或输入非法时返回 undefined
 * @example
 * ```ts
 * const arr = [1, 2, 3];
 * safeAt(arr, 0); // 1
 * safeAt(arr, -1); // 3
 * safeAt(arr, 10); // undefined
 * safeAt(null, 0); // undefined
 * ```
 */
export function safeAt<T>(
  arr: T[] | null | undefined,
  index: number,
): T | undefined {
  if (!Array.isArray(arr)) return undefined;
  const len = arr.length;
  if (index < 0) {
    const idx = len + index;
    return idx >= 0 && idx < len ? arr[idx] : undefined;
  }
  return index >= 0 && index < len ? arr[index] : undefined;
}

/**
 * 根据 key 函数对数组元素分组
 * @description 将数组元素按照 keyFn 返回的键进行分组，返回 Map
 * @template T 数组元素类型
 * @template K 分组键类型
 * @param arr 目标数组
 * @param keyFn 键提取函数
 * @returns 分组后的 Map，键为分组标识，值为该组的元素数组
 * @example
 * ```ts
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const grouped = groupBy(users, u => u.age);
 * // Map { 25 => [{name: 'Alice', age: 25}, {name: 'Charlie', age: 25}], 30 => [{name: 'Bob', age: 30}] }
 * ```
 */
export function groupBy<T, K>(
  arr: T[] | null | undefined,
  keyFn: (item: T) => K,
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  if (!Array.isArray(arr)) return map;
  for (const item of arr) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  }
  return map;
}

/**
 * 按条件将数组拆分为两个数组
 * @description 根据谓词函数将数组分为满足条件和不满足条件两部分
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param predicate 判断函数
 * @returns 元组 [满足条件的元素, 不满足条件的元素]
 * @example
 * ```ts
 * const [even, odd] = partition([1, 2, 3, 4, 5], n => n % 2 === 0);
 * // even: [2, 4], odd: [1, 3, 5]
 * ```
 */
export function partition<T>(
  arr: T[] | null | undefined,
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const pass: T[] = [],
    fail: T[] = [];
  if (!Array.isArray(arr)) return [pass, fail];
  for (const item of arr) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}

/**
 * 数组去重
 * @description 移除数组中的重复元素，可选择性地通过迭代函数指定去重依据
 * @template T 数组元素类型
 * @template U 去重键类型
 * @param arr 目标数组
 * @param iteratee 可选的键提取函数，用于指定去重依据
 * @returns 去重后的数组
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * unique([{id: 1}, {id: 2}, {id: 1}], item => item.id); // [{id: 1}, {id: 2}]
 * ```
 */
export function unique<T, U = T>(
  arr: T[] | null | undefined,
  iteratee?: (item: T) => U,
): T[] {
  if (!Array.isArray(arr)) return [];
  const seen = new Set<U>();
  const result: T[] = [];
  for (const item of arr) {
    const key = (iteratee ? iteratee(item) : item) as U;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

/**
 * 从数组中随机取一个元素
 * @description 随机返回数组中的一个元素
 * @template T 数组元素类型
 * @param arr 目标数组
 * @returns 随机选中的元素，空数组或输入非法时返回 undefined
 * @example
 * ```ts
 * sample([1, 2, 3, 4, 5]); // 可能返回 1-5 中的任意一个
 * sample([]); // undefined
 * ```
 */
export function sample<T>(arr: T[] | null | undefined): T | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 从数组中随机取 n 个不重复元素
 * @description 随机选择指定数量的不重复元素
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param n 要选择的元素数量
 * @returns 包含 n 个随机元素的数组（不重复）
 * @example
 * ```ts
 * sampleSize([1, 2, 3, 4, 5], 3); // 可能返回 [2, 4, 1]
 * sampleSize([1, 2], 5); // [1, 2] (最多返回数组长度个元素)
 * ```
 */
export function sampleSize<T>(arr: T[] | null | undefined, n: number): T[] {
  if (!Array.isArray(arr) || arr.length === 0 || n <= 0) return [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    const item = shuffled[j];
    if (temp !== undefined && item !== undefined) {
      shuffled[i] = item;
      shuffled[j] = temp;
    }
  }
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/**
 * 随机打乱数组（Fisher-Yates 洗牌算法）
 * @description 返回一个新数组，元素顺序被随机打乱，不修改原数组
 * @template T 数组元素类型
 * @param arr 目标数组
 * @returns 打乱后的新数组
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 * shuffle(arr); // 可能返回 [3, 1, 5, 2, 4]
 * console.log(arr); // [1, 2, 3, 4, 5] (原数组不变)
 * ```
 */
export function shuffle<T>(arr: T[] | null | undefined): T[] {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    const item = copy[j];
    if (temp !== undefined && item !== undefined) {
      copy[i] = item;
      copy[j] = temp;
    }
  }
  return copy;
}

/**
 * 计算多个数组的并集
 * @description 返回所有数组中出现的不重复元素
 * @template T 数组元素类型
 * @param arrays 多个数组
 * @returns 并集数组
 * @example
 * ```ts
 * union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
 * ```
 */
export function union<T>(...arrays: (T[] | null | undefined)[]): T[] {
  const set = new Set<T>();
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) set.add(item);
    }
  }
  return Array.from(set);
}

/**
 * 计算多个数组的交集
 * @description 返回所有数组中都出现的元素
 * @template T 数组元素类型
 * @param arrays 多个数组
 * @returns 交集数组
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
 * ```
 */
export function intersection<T>(...arrays: (T[] | null | undefined)[]): T[] {
  if (arrays.length === 0) return [];
  const first = Array.isArray(arrays[0]) ? arrays[0] : [];
  const rest = arrays
    .slice(1)
    .map((arr) => (Array.isArray(arr) ? new Set(arr) : new Set()));
  return first.filter((item) => rest.every((set) => set.has(item)));
}

/**
 * 计算数组差集
 * @description 返回存在于第一个数组但不存在于后续数组中的元素
 * @template T 数组元素类型
 * @param arr 基准数组
 * @param values 要排除的数组
 * @returns 差集数组
 * @example
 * ```ts
 * difference([1, 2, 3, 4], [2, 4]); // [1, 3]
 * difference([1, 2, 3], [2], [3]); // [1]
 * ```
 */
export function difference<T>(
  arr: T[] | null | undefined,
  ...values: (T[] | null | undefined)[]
): T[] {
  if (!Array.isArray(arr)) return [];
  const exclude = new Set<T>();
  for (const v of values) {
    if (Array.isArray(v)) {
      for (const item of v) exclude.add(item);
    }
  }
  return arr.filter((item) => !exclude.has(item));
}

/**
 * 根据指定键或函数对数组排序
 * @description 返回排序后的新数组，不修改原数组。null/undefined 值会被排到最后
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param key 排序键（属性名或提取函数）
 * @param order 排序顺序，'asc' 升序或 'desc' 降序，默认升序
 * @returns 排序后的新数组
 * @example
 * ```ts
 * const users = [{age: 30}, {age: 20}, {age: 25}];
 * sortBy(users, 'age'); // [{age: 20}, {age: 25}, {age: 30}]
 * sortBy(users, u => u.age, 'desc'); // [{age: 30}, {age: 25}, {age: 20}]
 * ```
 */
export function sortBy<T>(
  arr: T[] | null | undefined,
  key: keyof T | ((item: T) => any),
  order: "asc" | "desc" = "asc",
): T[] {
  if (!Array.isArray(arr)) return [];
  const compare = (a: T, b: T): number => {
    const av = typeof key === "function" ? key(a) : a[key];
    const bv = typeof key === "function" ? key(b) : b[key];
    if (av === bv) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return av < bv ? -1 : 1;
  };
  const sorted = [...arr].sort(compare);
  return order === "asc" ? sorted : sorted.reverse();
}

/**
 * 将数组展平一层
 * @description 将嵌套数组展平一层，类似 Array.flat(1)
 * @template T 数组元素类型
 * @param arr 目标数组
 * @returns 展平后的数组
 * @example
 * ```ts
 * flatten([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, [5]]
 * ```
 */
export function flatten<T>(arr: (T | T[])[] | null | undefined): T[] {
  if (!Array.isArray(arr)) return [];
  return ([] as T[]).concat(
    ...arr.map((item) => (Array.isArray(item) ? item : [item])),
  );
}

/**
 * 将数组展平到指定深度
 * @description 递归展平数组到指定层级
 * @template T 数组元素类型
 * @param arr 目标数组
 * @param depth 展平深度，默认为 1
 * @returns 展平后的数组
 * @example
 * ```ts
 * flattenDepth([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
 * ```
 */
export function flattenDepth<T>(
  arr: any[] | null | undefined,
  depth: number = 1,
): T[] {
  if (!Array.isArray(arr) || depth <= 0) return (arr as T[]) || [];
  let result: any[] = arr;
  for (let i = 0; i < depth; i++) {
    result = flatten(result);
  }
  return result as T[];
}

/**
 * 合并多个数组（类似 Python 的 zip）
 * @description 将多个数组的对应位置元素组合成元组
 * @template T 数组类型
 * @param arrays 多个数组
 * @returns 二维数组，每个子数组包含各数组对应位置的元素
 * @example
 * ```ts
 * zip([1, 2], ['a', 'b'], [true, false]);
 * // [[1, 'a', true], [2, 'b', false]]
 * ```
 */
export function zip<T extends unknown[][]>(
  ...arrays: (T[number][] | null | undefined)[]
): T[number][][] {
  const valid = arrays.filter(Array.isArray) as any[][];
  if (valid.length === 0) return [];
  const maxLength = Math.max(...valid.map((a) => a.length));
  const result: any[][] = [];
  for (let i = 0; i < maxLength; i++) {
    const tuple = valid.map((arr) => arr[i]);
    result.push(tuple);
  }
  return result;
}

/**
 * 生成数字序列
 * @description 生成从 start 到 end（不包含）的数字序列
 * @param start 起始值（如果只传一个参数，则从 0 开始，该参数作为 end）
 * @param end 结束值（不包含）
 * @param step 步长，默认为 1
 * @returns 数字序列数组
 * @example
 * ```ts
 * range(5); // [0, 1, 2, 3, 4]
 * range(1, 5); // [1, 2, 3, 4]
 * range(0, 10, 2); // [0, 2, 4, 6, 8]
 * range(5, 0, -1); // [5, 4, 3, 2, 1]
 * ```
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === 0) return [];
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}
