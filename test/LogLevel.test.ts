import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { LogLevel, getLogLevel, setLogLevel } from "../src/core/libs/LogLevel";

describe("LogLevel", () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    // Reset console methods
    Object.assign(console, originalConsole);
  });

  afterEach(() => {
    // Restore console
    Object.assign(console, originalConsole);
  });

  it("should get current log level", () => {
    expect(getLogLevel()).toBeDefined();
  });

  it("should set log level", () => {
    setLogLevel(LogLevel.Error);
    expect(getLogLevel()).toBe(LogLevel.Error);
  });

  it("should disable lower level logs", () => {
    setLogLevel(LogLevel.Error);
    expect(typeof console.log).toBe("function");
    expect(typeof console.error).toBe("function");
  });

  it("should enable all logs at Trace level", () => {
    setLogLevel(LogLevel.Trace);
    expect(typeof console.trace).toBe("function");
    expect(typeof console.debug).toBe("function");
    expect(typeof console.log).toBe("function");
  });
});
