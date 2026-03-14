/**
 * 延迟返回 Promise
 * @description 创建一个在指定时间后 resolve 的 Promise
 * @param ms - 延迟时间（毫秒）
 * @returns Promise<void>
 * @example
 * await sleep(1000); // 等待 1 秒
 * console.log("1 秒后执行");
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export { sleep as wait };

/**
 * 给 Promise 添加超时
 * @description 为 Promise 添加超时限制，超时后抛出错误
 * @param promise - 原始 Promise
 * @param ms - 超时时间（毫秒）
 * @param errorMessage - 超时错误信息，默认为 "Operation timeout"
 * @returns 带超时的 Promise
 * @example
 * const result = await timeout(fetch("/api"), 5000);
 * // 5 秒后仍未完成则抛出错误
 * @example
 * try {
 *   await timeout(longRunningTask(), 3000, "任务超时");
 * } catch (err) {
 *   console.error(err.message); // "任务超时"
 * }
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage = "Operation timeout",
): Promise<T> {
  return Promise.race([
    promise,
    sleep(ms).then(() => {
      throw new Error(errorMessage);
    }),
  ]);
}

/**
 * 异步重试
 * @description 重复执行异步函数直到成功或达到最大重试次数
 * @param fn - 待重试的异步函数
 * @param options - 重试选项
 * @param options.retries - 最大重试次数，默认为 3
 * @param options.delay - 重试间隔（毫秒），默认为 0
 * @param options.backoff - 是否使用指数退避，默认为 false
 * @returns 函数执行结果
 * @throws 最后一次失败的错误
 * @example
 * const data = await retry(() => fetch("/api"), {
 *   retries: 3,
 *   delay: 1000,
 *   backoff: true
 * });
 * // 失败时会重试 3 次，间隔 1s, 2s, 4s
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options?: { retries?: number; delay?: number; backoff?: boolean },
): Promise<T> {
  const { retries = 3, delay = 0, backoff = false } = options || {};
  let lastError: unknown;
  let currentDelay = delay;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await sleep(currentDelay);
        if (backoff) currentDelay *= 2;
      }
    }
  }
  throw lastError;
}
