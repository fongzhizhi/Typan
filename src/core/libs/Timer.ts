/**
 * 简单计时器类
 * @description 用于性能测量和时间跟踪的轻量级计时器
 * @example
 * const timer = new Timer();
 * // ... 执行一些操作
 * console.log(`耗时: ${timer.elapsed()}ms`);
 * @example
 * const timer = new Timer();
 * timer.mark("start");
 * // ... 执行操作1
 * timer.mark("middle");
 * // ... 执行操作2
 * timer.mark("end");
 * console.log(`操作1耗时: ${timer.measure("start", "middle")}ms`);
 * console.log(`操作2耗时: ${timer.measure("middle", "end")}ms`);
 */
export class Timer {
  private startTime: number;
  private markers: Map<string, number> = new Map();

  /**
   * 创建计时器实例
   * @param autoStart - 是否自动开始计时，默认为 true
   */
  constructor(autoStart = true) {
    this.startTime = autoStart ? performance.now() : 0;
  }

  /**
   * 启动/重置计时器
   * @description 重新开始计时，重置起始时间
   * @example
   * timer.start();
   */
  start(): void {
    this.startTime = performance.now();
  }

  /**
   * 获取从 start 或构造以来经过的时间（毫秒）
   * @description 返回从计时器启动到现在的毫秒数
   * @returns 经过的毫秒数
   * @example
   * const elapsed = timer.elapsed(); // 1234.56
   */
  elapsed(): number {
    return performance.now() - this.startTime;
  }

  /**
   * 记录一个时间点标记
   * @description 在当前时刻创建一个命名标记，用于后续测量
   * @param name - 标记名称
   * @example
   * timer.mark("checkpoint1");
   */
  mark(name: string): void {
    this.markers.set(name, performance.now());
  }

  /**
   * 获取两个标记之间的耗时
   * @description 计算两个标记之间的时间差（毫秒）
   * @param from - 起始标记名称
   * @param to - 结束标记名称
   * @returns 时间差（毫秒），标记不存在返回 undefined
   * @example
   * timer.mark("start");
   * // ... 执行操作
   * timer.mark("end");
   * const duration = timer.measure("start", "end"); // 123.45
   */
  measure(from: string, to: string): number | undefined {
    const t1 = this.markers.get(from);
    const t2 = this.markers.get(to);
    if (t1 === undefined || t2 === undefined) return undefined;
    return t2 - t1;
  }

  /**
   * 重置所有标记并重新开始计时
   * @description 清除所有标记并重置起始时间
   * @example
   * timer.reset();
   */
  reset(): void {
    this.startTime = performance.now();
    this.markers.clear();
  }

  /**
   * 获取当前 ISO 时间戳
   * @description 返回当前时间的 ISO 8601 格式字符串
   * @returns ISO 格式时间戳
   * @example
   * Timer.now() // "2024-01-15T10:30:45.123Z"
   */
  static now(): string {
    return new Date().toISOString();
  }
}
