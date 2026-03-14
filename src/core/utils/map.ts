/**
 * 获取 Map 所有键（安全）
 * @description 安全地获取 Map 的所有键，返回数组
 * @param map - Map 对象
 * @returns 键数组，无效输入返回空数组
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * getMapKeys(map) // ["a", "b"]
 * getMapKeys(null) // []
 */
export function getMapKeys<K, V>(map: Map<K, V> | null | undefined): K[] {
  if (!map) return [];
  return Array.from(map.keys());
}

/**
 * 获取 Map 所有值（安全）
 * @description 安全地获取 Map 的所有值，返回数组
 * @param map - Map 对象
 * @returns 值数组，无效输入返回空数组
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * getMapValues(map) // [1, 2]
 * getMapValues(null) // []
 */
export function getMapValues<K, V>(map: Map<K, V> | null | undefined): V[] {
  if (!map) return [];
  return Array.from(map.values());
}

/**
 * 使用快照安全遍历 Map
 * @description 创建键的快照后遍历，避免遍历过程中修改 Map 导致的问题
 * @param map - Map 对象
 * @param cb - 回调函数，返回 true 时停止遍历
 * @returns 如果回调返回 true 则返回 true，否则返回 false
 * @example
 * iterateMapSnapshot(map, (value, key) => {
 *   if (value > 10) return true; // 找到后停止
 * });
 */
export function iterateMapSnapshot<K, V>(
  map: Map<K, V> | null | undefined,
  cb: (value: V, key: K, map: Map<K, V>) => boolean | void,
): boolean {
  if (!map) return false;
  const keys = getMapKeys(map);
  return keys.some((key) => {
    if (map.has(key)) {
      const value = map.get(key)!;
      return cb(value, key, map) === true;
    }
    return false;
  });
}

/**
 * 遍历 Map（可选择快照模式）
 * @description 遍历 Map 的所有键值对
 * @param map - Map 对象
 * @param cb - 回调函数，返回 true 时停止遍历
 * @param safely - 是否使用快照模式，默认为 false
 * @returns 如果回调返回 true 则返回 true，否则返回 false
 * @example
 * iterateMap(map, (value, key) => {
 *   console.log(key, value);
 * });
 * @example
 * // 安全模式，可在遍历中修改 Map
 * iterateMap(map, (value, key, m) => {
 *   if (value < 0) m.delete(key);
 * }, true);
 */
export function iterateMap<K, V>(
  map: Map<K, V> | null | undefined,
  cb: (value: V, key: K, map: Map<K, V>) => boolean | void,
  safely = false,
): boolean {
  if (safely) return iterateMapSnapshot(map, cb);
  if (!map) return false;
  for (const [key, value] of map) {
    if (cb(value, key, map) === true) return true;
  }
  return false;
}

/**
 * 过滤 Map
 * @description 根据条件过滤 Map，返回新的 Map
 * @param map - Map 对象
 * @param predicate - 过滤条件函数
 * @returns 过滤后的新 Map
 * @example
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
 * filterMap(map, (v) => v > 1) // Map { "b" => 2, "c" => 3 }
 */
export function filterMap<K, V>(
  map: Map<K, V> | null | undefined,
  predicate: (value: V, key: K) => boolean,
): Map<K, V> {
  const result = new Map<K, V>();
  if (!map) return result;
  for (const [key, value] of map) {
    if (predicate(value, key)) result.set(key, value);
  }
  return result;
}

/**
 * 映射 Map 的值
 * @description 对 Map 的每个值应用转换函数，返回新的 Map
 * @param map - Map 对象
 * @param fn - 转换函数
 * @returns 转换后的新 Map
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * mapMapValues(map, (v) => v * 2) // Map { "a" => 2, "b" => 4 }
 */
export function mapMapValues<K, V, U>(
  map: Map<K, V> | null | undefined,
  fn: (value: V, key: K) => U,
): Map<K, U> {
  const result = new Map<K, U>();
  if (!map) return result;
  for (const [key, value] of map) {
    result.set(key, fn(value, key));
  }
  return result;
}

/**
 * 映射 Map 的键
 * @description 对 Map 的每个键应用转换函数，返回新的 Map
 * @param map - Map 对象
 * @param fn - 转换函数
 * @returns 转换后的新 Map
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * mapMapKeys(map, (k) => k.toUpperCase()) // Map { "A" => 1, "B" => 2 }
 */
export function mapMapKeys<K, V, L>(
  map: Map<K, V> | null | undefined,
  fn: (key: K, value: V) => L,
): Map<L, V> {
  const result = new Map<L, V>();
  if (!map) return result;
  for (const [key, value] of map) {
    result.set(fn(key, value), value);
  }
  return result;
}

/**
 * 查找 Map 元素
 * @description 查找第一个满足条件的键值对
 * @param map - Map 对象
 * @param predicate - 查找条件函数
 * @returns 找到的键值对 [key, value]，未找到返回 undefined
 * @example
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
 * findInMap(map, (v) => v > 1) // ["b", 2]
 */
export function findInMap<K, V>(
  map: Map<K, V> | null | undefined,
  predicate: (value: V, key: K) => boolean,
): [K, V] | undefined {
  if (!map) return undefined;
  for (const [key, value] of map) {
    if (predicate(value, key)) return [key, value];
  }
  return undefined;
}

/**
 * 类似数组 some
 * @description 检查是否至少有一个元素满足条件
 * @param map - Map 对象
 * @param predicate - 检查条件函数
 * @returns 如果有元素满足条件返回 true，否则返回 false
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * someMap(map, (v) => v > 1) // true
 * someMap(map, (v) => v > 10) // false
 */
export function someMap<K, V>(
  map: Map<K, V> | null | undefined,
  predicate: (value: V, key: K) => boolean,
): boolean {
  if (!map) return false;
  for (const [key, value] of map) {
    if (predicate(value, key)) return true;
  }
  return false;
}

/**
 * 类似数组 every
 * @description 检查是否所有元素都满足条件
 * @param map - Map 对象
 * @param predicate - 检查条件函数
 * @returns 如果所有元素都满足条件返回 true，否则返回 false
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * everyMap(map, (v) => v > 0) // true
 * everyMap(map, (v) => v > 1) // false
 */
export function everyMap<K, V>(
  map: Map<K, V> | null | undefined,
  predicate: (value: V, key: K) => boolean,
): boolean {
  if (!map) return true;
  for (const [key, value] of map) {
    if (!predicate(value, key)) return false;
  }
  return true;
}

/**
 * Map 归约
 * @description 将 Map 归约为单个值
 * @param map - Map 对象
 * @param reducer - 归约函数
 * @param initial - 初始值
 * @returns 归约结果
 * @example
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
 * reduceMap(map, (acc, v) => acc + v, 0) // 6
 */
export function reduceMap<K, V, A>(
  map: Map<K, V> | null | undefined,
  reducer: (acc: A, value: V, key: K) => A,
  initial: A,
): A {
  if (!map) return initial;
  let acc = initial;
  for (const [key, value] of map) {
    acc = reducer(acc, value, key);
  }
  return acc;
}

/**
 * 合并多个 Map
 * @description 将多个 Map 合并为一个新 Map，后面的会覆盖前面的
 * @param maps - 要合并的 Map 数组
 * @returns 合并后的新 Map
 * @example
 * const map1 = new Map([["a", 1]]);
 * const map2 = new Map([["b", 2]]);
 * mergeMaps(map1, map2) // Map { "a" => 1, "b" => 2 }
 */
export function mergeMaps<K, V>(
  ...maps: (Map<K, V> | null | undefined)[]
): Map<K, V> {
  const result = new Map<K, V>();
  for (const map of maps) {
    if (map) {
      for (const [key, value] of map) {
        result.set(key, value);
      }
    }
  }
  return result;
}

/**
 * 安全 get，不存在返回默认值
 * @description 从 Map 获取值，不存在时返回默认值
 * @param map - Map 对象
 * @param key - 键
 * @param defaultValue - 默认值
 * @returns 获取的值或默认值
 * @example
 * const map = new Map([["a", 1]]);
 * getOrDefault(map, "a", 0) // 1
 * getOrDefault(map, "b", 0) // 0
 */
export function getOrDefault<K, V>(
  map: Map<K, V> | null | undefined,
  key: K,
  defaultValue: V,
): V {
  if (!map) return defaultValue;
  return map.get(key) ?? defaultValue;
}

/**
 * Map → 对象（键必须是 string）
 * @description 将 Map 转换为普通对象
 * @param map - Map 对象（键必须是字符串）
 * @returns 转换后的对象
 * @example
 * const map = new Map([["a", 1], ["b", 2]]);
 * mapToObject(map) // { a: 1, b: 2 }
 */
export function mapToObject<V>(
  map: Map<string, V> | null | undefined,
): Record<string, V> {
  const obj: Record<string, V> = {};
  if (!map) return obj;
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

/**
 * 对象 → Map
 * @description 将普通对象转换为 Map
 * @param obj - 普通对象
 * @returns 转换后的 Map
 * @example
 * const obj = { a: 1, b: 2 };
 * objectToMap(obj) // Map { "a" => 1, "b" => 2 }
 */
export function objectToMap<V>(
  obj: Record<string, V> | null | undefined,
): Map<string, V> {
  const map = new Map<string, V>();
  if (!obj) return map;
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value !== undefined) {
      map.set(key, value);
    }
  }
  return map;
}

/* ----- Set 工具 ----- */

/**
 * Set → 数组
 * @description 将 Set 转换为数组
 * @param set - Set 对象
 * @returns 转换后的数组
 * @example
 * const set = new Set([1, 2, 3]);
 * setToArray(set) // [1, 2, 3]
 */
export function setToArray<T>(set: Set<T> | null | undefined): T[] {
  if (!set) return [];
  return Array.from(set);
}

/**
 * 数组 → Set
 * @description 将数组转换为 Set（自动去重）
 * @param arr - 数组
 * @returns 转换后的 Set
 * @example
 * const arr = [1, 2, 2, 3];
 * arrayToSet(arr) // Set { 1, 2, 3 }
 */
export function arrayToSet<T>(arr: T[] | null | undefined): Set<T> {
  if (!Array.isArray(arr)) return new Set();
  return new Set(arr);
}

/**
 * Set 并集
 * @description 计算多个 Set 的并集
 * @param sets - Set 数组
 * @returns 并集 Set
 * @example
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([2, 3]);
 * unionSet(set1, set2) // Set { 1, 2, 3 }
 */
export function unionSet<T>(...sets: (Set<T> | null | undefined)[]): Set<T> {
  const result = new Set<T>();
  for (const set of sets) {
    if (set) {
      for (const item of set) result.add(item);
    }
  }
  return result;
}

/**
 * Set 交集
 * @description 计算多个 Set 的交集
 * @param sets - Set 数组
 * @returns 交集 Set
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * intersectionSet(set1, set2) // Set { 2, 3 }
 */
export function intersectionSet<T>(
  ...sets: (Set<T> | null | undefined)[]
): Set<T> {
  if (sets.length === 0) return new Set();
  const first = sets[0];
  if (!first) return new Set();
  const rest = sets.slice(1).map((s) => (s ? new Set(s) : new Set()));
  return new Set([...first].filter((item) => rest.every((s) => s.has(item))));
}

/**
 * Set 差集
 * @description 计算 setA - setB 的差集
 * @param setA - 第一个 Set
 * @param setB - 第二个 Set
 * @returns 差集 Set
 * @example
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([2, 3, 4]);
 * differenceSet(setA, setB) // Set { 1 }
 */
export function differenceSet<T>(
  setA: Set<T> | null | undefined,
  setB: Set<T> | null | undefined,
): Set<T> {
  const result = new Set<T>();
  if (!setA) return result;
  const b = setB || new Set();
  for (const item of setA) {
    if (!b.has(item)) result.add(item);
  }
  return result;
}

/**
 * 判断是否为子集
 * @description 检查 setA 是否为 setB 的子集
 * @param setA - 第一个 Set
 * @param setB - 第二个 Set
 * @returns 如果 setA 是 setB 的子集返回 true
 * @example
 * const setA = new Set([1, 2]);
 * const setB = new Set([1, 2, 3]);
 * isSubset(setA, setB) // true
 */
export function isSubset<T>(
  setA: Set<T> | null | undefined,
  setB: Set<T> | null | undefined,
): boolean {
  if (!setA) return true;
  if (!setB) return false;
  for (const item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}

/**
 * 判断是否为超集
 * @description 检查 setA 是否为 setB 的超集
 * @param setA - 第一个 Set
 * @param setB - 第二个 Set
 * @returns 如果 setA 是 setB 的超集返回 true
 * @example
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([1, 2]);
 * isSuperset(setA, setB) // true
 */
export function isSuperset<T>(
  setA: Set<T> | null | undefined,
  setB: Set<T> | null | undefined,
): boolean {
  return isSubset(setB, setA);
}

/**
 * 过滤 Set
 * @description 根据条件过滤 Set，返回新的 Set
 * @param set - Set 对象
 * @param predicate - 过滤条件函数
 * @returns 过滤后的新 Set
 * @example
 * const set = new Set([1, 2, 3, 4]);
 * filterSet(set, (v) => v > 2) // Set { 3, 4 }
 */
export function filterSet<T>(
  set: Set<T> | null | undefined,
  predicate: (value: T) => boolean,
): Set<T> {
  const result = new Set<T>();
  if (!set) return result;
  for (const item of set) {
    if (predicate(item)) result.add(item);
  }
  return result;
}

/**
 * 映射 Set
 * @description 对 Set 的每个元素应用转换函数，返回新的 Set
 * @param set - Set 对象
 * @param fn - 转换函数
 * @returns 转换后的新 Set
 * @example
 * const set = new Set([1, 2, 3]);
 * mapSet(set, (v) => v * 2) // Set { 2, 4, 6 }
 */
export function mapSet<T, U>(
  set: Set<T> | null | undefined,
  fn: (value: T) => U,
): Set<U> {
  const result = new Set<U>();
  if (!set) return result;
  for (const item of set) {
    result.add(fn(item));
  }
  return result;
}
