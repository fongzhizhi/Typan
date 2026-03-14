import { describe, it, expect } from "vitest";
import {
  escapeRegExp,
  isRegExp,
  matchAllSafe,
} from "../src/core/utils/ragular";

describe("Regular Expression Utils", () => {
  describe("escapeRegExp", () => {
    it("should escape special regex characters", () => {
      expect(escapeRegExp("hello.world")).toBe("hello\\.world");
      expect(escapeRegExp("a+b*c?")).toBe("a\\+b\\*c\\?");
      expect(escapeRegExp("[test]")).toBe("\\[test\\]");
    });

    it("should handle null/undefined", () => {
      expect(escapeRegExp(null)).toBe("");
      expect(escapeRegExp(undefined)).toBe("");
    });
  });

  describe("isRegExp", () => {
    it("should detect RegExp objects", () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp("test"))).toBe(true);
      expect(isRegExp("test")).toBe(false);
      expect(isRegExp(null)).toBe(false);
    });
  });

  describe("matchAllSafe", () => {
    it("should match all occurrences", () => {
      const result = matchAllSafe("test test test", /test/g);
      expect(result).toHaveLength(3);
    });

    it("should return empty array for non-global regex", () => {
      const result = matchAllSafe("test", /test/);
      expect(result).toEqual([]);
    });

    it("should handle null/undefined", () => {
      expect(matchAllSafe(null, /test/g)).toEqual([]);
    });
  });
});
