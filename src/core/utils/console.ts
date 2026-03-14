/**
 * 安全调用 console.log
 * @description 安全地调用 console.log，若环境不支持则静默失败
 * @param args - 要输出的参数
 * @example
 * safeLog("Hello", "World");
 * safeLog({ user: "Alice" });
 */
export function safeLog(...args: any[]): void {
  if (typeof console?.log === "function") console.log(...args);
}

/**
 * 安全调用 console.warn
 * @description 安全地调用 console.warn，若环境不支持则静默失败
 * @param args - 要输出的参数
 * @example
 * safeWarn("This is a warning");
 */
export function safeWarn(...args: any[]): void {
  if (typeof console?.warn === "function") console.warn(...args);
}

/**
 * 安全调用 console.error
 * @description 安全地调用 console.error，若环境不支持则静默失败
 * @param args - 要输出的参数
 * @example
 * safeError("An error occurred", error);
 */
export function safeError(...args: any[]): void {
  if (typeof console?.error === "function") console.error(...args);
}

/**
 * 安全调用 console.info
 * @description 安全地调用 console.info，若环境不支持则静默失败
 * @param args - 要输出的参数
 * @example
 * safeInfo("Information message");
 */
export function safeInfo(...args: any[]): void {
  if (typeof console?.info === "function") console.info(...args);
}

/**
 * 安全调用 console.debug
 * @description 安全地调用 console.debug，若环境不支持则静默失败
 * @param args - 要输出的参数
 * @example
 * safeDebug("Debug info", { data: 123 });
 */
export function safeDebug(...args: any[]): void {
  if (typeof console?.debug === "function") console.debug(...args);
}

/**
 * 条件日志（开发环境常用）
 * @description 根据条件决定是否输出日志
 * @param condition - 布尔值或返回布尔值的函数
 * @param args - 要输出的参数
 * @example
 * logIf(process.env.NODE_ENV === "development", "Debug info");
 * logIf(() => user.isAdmin, "Admin action");
 */
export function logIf(
  condition: boolean | (() => boolean),
  ...args: any[]
): void {
  const shouldLog = typeof condition === "function" ? condition() : condition;
  if (shouldLog) safeLog(...args);
}
