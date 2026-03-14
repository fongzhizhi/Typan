import { describe, it, expect } from "vitest";
import { isNone, isNotNone, noop } from "../src/core/utils/common";

describe("Common Utils", () => {
  describe("isNone", () => {
    it("should detect none values", () => {
      expect(isNone(null)).toBe(true);
      expect(isNone(undefined)).toBe(true);
      expect(isNone("")).toBe(true);
      expect(isNone(0)).toBe(false);
      expect(isNone(false)).toBe(false);
      expect(isNone("hello")).toBe(false);
    });
  });

  describe("isNotNone", () => {
    it("should detect non-none values", () => {
      expect(isNotNone("hello")).toBe(true);
      expect(isNotNone(0)).toBe(true);
      expect(isNotNone(null)).toBe(false);
      expect(isNotNone("")).toBe(false);
    });
  });

  describe("noop", () => {
    it("should do nothing", () => {
      expect(noop()).toBeUndefined();
    });
  });
});
