import { describe, it, expect } from "vitest";
import {
  safeGet,
  safeSet,
  deepMerge,
  pick,
  omit,
  pickBy,
  omitBy,
  mapValues,
  mapKeys,
  isPlainObject,
  isEmptyObject,
  deepClone,
} from "../src/core/utils/object";

describe("Object Utils", () => {
  describe("safeGet", () => {
    it("should get nested property", () => {
      const obj = { a: { b: { c: 42 } } };
      expect(safeGet(obj, "a.b.c")).toBe(42);
      expect(safeGet(obj, ["a", "b", "c"])).toBe(42);
    });

    it("should return default value for missing property", () => {
      const obj = { a: 1 };
      expect(safeGet(obj, "b.c", "default")).toBe("default");
    });

    it("should handle null/undefined", () => {
      expect(safeGet(null, "a.b", "default")).toBe("default");
    });
  });

  describe("safeSet", () => {
    it("should set nested property", () => {
      const obj = {};
      safeSet(obj, "a.b.c", 42);
      expect(obj).toEqual({ a: { b: { c: 42 } } });
    });

    it("should create intermediate objects", () => {
      const obj = { a: 1 };
      safeSet(obj, "b.c", 2);
      expect(obj).toEqual({ a: 1, b: { c: 2 } });
    });
  });

  describe("deepMerge", () => {
    it("should merge objects deeply", () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { b: { d: 3 }, e: 4 };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it("should handle null/undefined sources", () => {
      const target = { a: 1 };
      expect(deepMerge(target, null, undefined)).toEqual({ a: 1 });
    });
  });

  describe("pick", () => {
    it("should pick specified properties", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, "a", "c")).toEqual({ a: 1, c: 3 });
    });

    it("should handle null/undefined", () => {
      expect(pick(null, "a")).toEqual({});
    });
  });

  describe("omit", () => {
    it("should omit specified properties", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, "b")).toEqual({ a: 1, c: 3 });
    });
  });

  describe("pickBy", () => {
    it("should pick by predicate", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pickBy(obj, (val) => val > 1);
      expect(result).toEqual({ b: 2, c: 3 });
    });
  });

  describe("omitBy", () => {
    it("should omit by predicate", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omitBy(obj, (val) => val > 1);
      expect(result).toEqual({ a: 1 });
    });
  });

  describe("mapValues", () => {
    it("should map object values", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = mapValues(obj, (val) => val * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });
  });

  describe("mapKeys", () => {
    it("should map object keys", () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (key) => key.toUpperCase());
      expect(result).toEqual({ A: 1, B: 2 });
    });
  });

  describe("isPlainObject", () => {
    it("should detect plain objects", () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
    });
  });

  describe("isEmptyObject", () => {
    it("should detect empty objects", () => {
      expect(isEmptyObject({})).toBe(true);
      expect(isEmptyObject({ a: 1 })).toBe(false);
      expect(isEmptyObject(null)).toBe(true);
    });
  });

  describe("deepClone", () => {
    it("should clone object deeply", () => {
      const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });
  });
});
