import { noop } from "../utils/function.js";

/**
 * 日志级别枚举
 * @description 定义应用程序的日志输出级别，级别依次升高
 */
export enum LogLevel {
  /** 跟踪日志 - 最详细的日志信息 */
  Trace = "trace",
  /** 调试日志 - 用于开发调试 */
  Debug = "debug",
  /** 常规日志 - 一般信息输出 */
  Info = "info",
  /** 警告日志 - 潜在问题提示 */
  Warn = "warn",
  /** 错误日志 - 错误信息 */
  Error = "error",
  /** 静默日志 - 不输出任何日志 */
  Silent = "silent",
}

/** 当前日志级别 */
let _curLogLevel = LogLevel.Trace;

// 记录原生API
const OriginTrace = console.trace;
const OriginDebug = console.debug;
const OriginLog = console.log;
const OriginTime = console.time;
const OriginTimeEnd = console.timeEnd;
const OriginTable = console.table;
const OriginInfo = console.info;
const OriginWarn = console.warn;
const OriginError = console.error;

/**
 * 获取当前日志级别
 * @description 返回当前设置的日志级别
 * @returns 当前日志级别
 * @example
 * const level = getLogLevel(); // LogLevel.Trace
 */
export function getLogLevel() {
  return _curLogLevel;
}

/**
 * 设置日志级别
 * @description 设置应用程序的日志输出级别，日志级别为包含关系，高级别能输出低级别日志
 * - Trace: 输出所有日志（trace, debug, log, info, warn, error）
 * - Debug: 输出 debug 及以上级别（log, info, warn, error）
 * - Info: 输出 info 及以上级别（warn, error）
 * - Warn: 输出 warn 及以上级别（error）
 * - Error: 仅输出 error
 * - Silent: 不输出任何日志
 * @param logLevel - 要设置的日志级别
 * @example
 * setLogLevel(LogLevel.Error); // 仅输出错误日志
 * setLogLevel(LogLevel.Silent); // 静默所有日志
 */
export function setLogLevel(logLevel: LogLevel) {
  // # 检测
  if (!logLevel || logLevel == _curLogLevel) {
    return;
  }

  // # 重置原始Console API, 全部设置为空函数
  _curLogLevel = logLevel;
  console.trace = noop;
  console.debug = noop;
  console.log = noop;
  console.time = noop;
  console.timeEnd = noop;
  console.table = noop;
  console.info = noop;
  console.warn = noop;
  console.error = noop;

  // # 根据日志级别开启对应的API
  switch (logLevel) {
    case LogLevel.Trace:
      console.trace = OriginTrace;
      console.debug = OriginDebug;
    // eslint-disable-next-line no-fallthrough
    case LogLevel.Debug:
      console.log = OriginLog;
      console.time = OriginTime;
      console.timeEnd = OriginTimeEnd;
      console.table = OriginTable;
    // eslint-disable-next-line no-fallthrough
    case LogLevel.Info:
      console.info = OriginInfo;
    // eslint-disable-next-line no-fallthrough
    case LogLevel.Warn:
      console.warn = OriginWarn;
    // eslint-disable-next-line no-fallthrough
    case LogLevel.Error:
      console.error = OriginError;
      break;
    case LogLevel.Silent:
      break;
    default:
      break;
  }
}
