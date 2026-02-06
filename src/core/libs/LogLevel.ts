import { noop } from "../utils/function.js";

/** 日志级别 */
export enum LogLevel {
    /** 跟踪日志 */
    Trace = 'trace',
    /** 调试日志 */
    Debug = 'debug',
    /** 常规日志 */
    Info = 'info',
    /** 警告日志 */
    Warn = 'warn',
    /** 错误日志 */
    Error = 'error',
    /** 静默日志 */
    Silent = 'silent',
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

/** 获取当前日志级别 */
export function getLogLevel() {
    return _curLogLevel;
}

/**
 * 设置日志级别
 * @description 日志级别为包含关系, 级别依次升高, 高级别能输出低级别日志
 * @param logLevel 日志级别
 */
export function setLogLevel(logLevel: LogLevel) {
    // # 检测
    if(!logLevel || logLevel == _curLogLevel) {
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
        case LogLevel.Debug:
            console.log = OriginLog;
            console.time = OriginTime;
            console.timeEnd = OriginTimeEnd;
            console.table = OriginTable;
        case LogLevel.Info:
            console.info = OriginInfo;
        case LogLevel.Warn:
            console.warn = OriginWarn;
        case LogLevel.Error:
            console.error = OriginError;
            break;
        case LogLevel.Silent:
            break;
        default:
            break;
    }
}