/** 空函数 */
export { noop } from "./common.js";

/**
 * 安全调用函数
 * @description 安全地调用可能为 null/undefined 的函数，失败时返回默认值
 * @param fn - 可能为函数的值
 * @param args - 调用参数和可选的默认返回值
 * @returns 函数返回值或默认值
 * @example
 * safeCall((x: number) => x * 2, 5) // 10
 * safeCall(null, 5) // undefined
 * safeCall(null, 5, 100) // 100 (默认值)
 * safeCall(undefined, 1, 2, "default") // "default"
 */
export function safeCall<F extends (...args: any[]) => any, R = ReturnType<F>>(
  fn: F | null | undefined,
  ...args: Parameters<F>
): R | undefined;
export function safeCall<
  F extends (...args: any[]) => any,
  R = ReturnType<F>,
  D = R,
>(fn: F | null | undefined, ...args: [...Parameters<F>, D]): R | D;
export function safeCall(fn: any, ...args: any[]): any {
  if (typeof fn !== "function") {
    const fallback =
      args.length > fn?.length ? args[args.length - 1] : undefined;
    return fallback;
  }
  const params = args.slice(0, fn.length);
  return fn(...params);
}

/**
 * 安全 apply
 * @description 安全地使用 apply 调用函数，失败返回 undefined
 * @param fn - 待调用的函数
 * @param thisArg - this 上下文
 * @param args - 参数数组
 * @returns 函数返回值或 undefined
 * @example
 * const obj = { value: 10 };
 * function add(this: typeof obj, x: number) { return this.value + x; }
 * safeApply(add, obj, [5]) // 15
 * safeApply(null, obj, [5]) // undefined
 */
export function safeApply<T, A extends any[], R>(
  fn: ((this: T, ...args: A) => R) | null | undefined,
  thisArg: T,
  args: A,
): R | undefined {
  if (typeof fn !== "function") return undefined;
  return fn.apply(thisArg, args);
}

/**
 * 函数只执行一次
 * @description 创建一个只能执行一次的函数，后续调用返回首次结果
 * @param fn - 待包装的函数
 * @returns 包装后的函数
 * @example
 * let count = 0;
 * const increment = once(() => ++count);
 * increment() // 1
 * increment() // 1 (不再执行)
 * increment() // 1
 */
export function once<F extends (...args: any[]) => any>(
  fn: F | null | undefined,
): F {
  if (typeof fn !== "function") return (() => {}) as F;
  let called = false;
  let result: ReturnType<F>;
  return ((...args: Parameters<F>): ReturnType<F> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as F;
}

/**
 * 轻量防抖
 * @description 创建一个防抖函数，在等待时间内多次调用只执行最后一次
 * @param fn - 待防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 * @example
 * const search = debounce((query: string) => console.log(query), 300);
 * search("a"); // 不执行
 * search("ab"); // 不执行
 * search("abc"); // 300ms 后执行
 */
export function debounce<F extends (...args: any[]) => any>(
  fn: F | null | undefined,
  wait: number,
): (...args: Parameters<F>) => void {
  if (typeof fn !== "function") return (() => {}) as any;
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  }) as (...args: Parameters<F>) => void;
}

/**
 * 轻量节流
 * @description 创建一个节流函数，在等待时间内最多执行一次
 * @param fn - 待节流的函数
 * @param wait - 等待时间（毫秒）
 * @returns 节流后的函数
 * @example
 * const onScroll = throttle(() => console.log("scrolling"), 100);
 * window.addEventListener("scroll", onScroll);
 * // 滚动时每 100ms 最多执行一次
 */
export function throttle<F extends (...args: any[]) => any>(
  fn: F | null | undefined,
  wait: number,
): (...args: Parameters<F>) => void {
  if (typeof fn !== "function") return (() => {}) as any;
  let lastTime = 0;
  return ((...args: Parameters<F>) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  }) as (...args: Parameters<F>) => void;
}

/**
 * 简单记忆化
 * @description 创建一个带缓存的函数，相同参数返回缓存结果
 * @param fn - 待记忆化的函数
 * @param resolver - 自定义缓存键生成函数（可选）
 * @returns 记忆化后的函数
 * @example
 * const fibonacci = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 * fibonacci(40) // 快速返回缓存结果
 */
export function memoize<F extends (...args: any[]) => any>(
  fn: F | null | undefined,
  resolver?: (...args: Parameters<F>) => string,
): F {
  if (typeof fn !== "function") return (() => {}) as F;
  const cache = new Map<string, ReturnType<F>>();
  return ((...args: Parameters<F>): ReturnType<F> => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as F;
}
