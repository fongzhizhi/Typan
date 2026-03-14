import { describe, it, expect, vi } from "vitest";
import {
  safeLog,
  safeWarn,
  safeError,
  safeInfo,
  safeDebug,
  logIf,
} from "../src/core/utils/console";

describe("Console Utils", () => {
  describe("safeLog", () => {
    it("should log safely", () => {
      const spy = vi.spyOn(console, "log");
      safeLog("test");
      expect(spy).toHaveBeenCalledWith("test");
      spy.mockRestore();
    });
  });

  describe("safeWarn", () => {
    it("should warn safely", () => {
      const spy = vi.spyOn(console, "warn");
      safeWarn("test");
      expect(spy).toHaveBeenCalledWith("test");
      spy.mockRestore();
    });
  });

  describe("logIf", () => {
    it("should log conditionally", () => {
      const spy = vi.spyOn(console, "log");
      logIf(true, "should log");
      expect(spy).toHaveBeenCalledWith("should log");
      spy.mockClear();
      logIf(false, "should not log");
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
