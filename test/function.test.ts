import { describe, it, expect, vi } from "vitest";
import {
  noop,
  safeCall,
  safeApply,
  once,
  debounce,
  throttle,
  memoize,
} from "../src/core/utils/function";

describe("Function Utils", () => {
  describe("noop", () => {
    it("should do nothing", () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe("safeCall", () => {
    it("should call function safely", () => {
      const fn = (a: number, b: number) => a + b;
      expect(safeCall(fn, 1, 2)).toBe(3);
    });

    it("should return undefined for non-function", () => {
      expect(safeCall(null, 1, 2)).toBeUndefined();
    });
  });

  describe("once", () => {
    it("should execute function only once", () => {
      let count = 0;
      const fn = once(() => ++count);
      fn();
      fn();
      fn();
      expect(count).toBe(1);
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", async () => {
      let count = 0;
      const fn = debounce(() => count++, 50);
      fn();
      fn();
      fn();
      expect(count).toBe(0);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(count).toBe(1);
    });
  });

  describe("throttle", () => {
    it("should throttle function calls", async () => {
      let count = 0;
      const fn = throttle(() => count++, 50);
      fn();
      fn();
      fn();
      expect(count).toBe(1);
      await new Promise((resolve) => setTimeout(resolve, 100));
      fn();
      expect(count).toBe(2);
    });
  });

  describe("memoize", () => {
    it("should cache function results", () => {
      let callCount = 0;
      const fn = memoize((n: number) => {
        callCount++;
        return n * 2;
      });
      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(callCount).toBe(1);
    });
  });
});
