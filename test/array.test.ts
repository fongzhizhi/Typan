import { describe, it, expect } from "vitest";
import {
  iterateArr,
  chunk,
  compact,
  safeAt,
  groupBy,
  partition,
  unique,
  sample,
  sampleSize,
  shuffle,
  union,
  intersection,
  difference,
  sortBy,
  flatten,
  flattenDepth,
  zip,
  range,
} from "../src/core/utils/array";

describe("Array Utils", () => {
  describe("iterateArr", () => {
    it("should iterate array and return false when not interrupted", () => {
      const arr = [1, 2, 3];
      const result: number[] = [];
      const interrupted = iterateArr(arr, (val) => {
        result.push(val);
      });
      expect(interrupted).toBe(false);
      expect(result).toEqual([1, 2, 3]);
    });

    it("should stop iteration when callback returns true", () => {
      const arr = [1, 2, 3, 4, 5];
      const result: number[] = [];
      const interrupted = iterateArr(arr, (val) => {
        result.push(val);
        return val === 3;
      });
      expect(interrupted).toBe(true);
      expect(result).toEqual([1, 2, 3]);
    });

    it("should handle null/undefined safely", () => {
      expect(iterateArr(null, () => {})).toBe(false);
      expect(iterateArr(undefined, () => {})).toBe(false);
    });
  });

  describe("chunk", () => {
    it("should split array into chunks", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("should handle edge cases", () => {
      expect(chunk([], 2)).toEqual([]);
      expect(chunk([1, 2], 0)).toEqual([]);
      expect(chunk(null, 2)).toEqual([]);
    });
  });

  describe("compact", () => {
    it("should remove falsy values", () => {
      expect(compact([1, null, 2, undefined, 3, false, 4, "", 0])).toEqual([
        1, 2, 3, 4,
      ]);
    });

    it("should handle null/undefined input", () => {
      expect(compact(null)).toEqual([]);
      expect(compact(undefined)).toEqual([]);
    });
  });

  describe("safeAt", () => {
    it("should access array elements safely", () => {
      const arr = [1, 2, 3];
      expect(safeAt(arr, 0)).toBe(1);
      expect(safeAt(arr, 2)).toBe(3);
      expect(safeAt(arr, -1)).toBe(3);
      expect(safeAt(arr, -2)).toBe(2);
    });

    it("should return undefined for out of bounds", () => {
      expect(safeAt([1, 2], 5)).toBeUndefined();
      expect(safeAt(null, 0)).toBeUndefined();
    });
  });

  describe("groupBy", () => {
    it("should group array by key function", () => {
      const arr = [
        { type: "a", value: 1 },
        { type: "b", value: 2 },
        { type: "a", value: 3 },
      ];
      const result = groupBy(arr, (item) => item.type);
      expect(result.get("a")).toEqual([
        { type: "a", value: 1 },
        { type: "a", value: 3 },
      ]);
      expect(result.get("b")).toEqual([{ type: "b", value: 2 }]);
    });
  });

  describe("partition", () => {
    it("should split array by predicate", () => {
      const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
      expect(even).toEqual([2, 4]);
      expect(odd).toEqual([1, 3, 5]);
    });
  });

  describe("unique", () => {
    it("should remove duplicates", () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it("should use iteratee function", () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
      expect(unique(arr, (item) => item.id)).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe("sample", () => {
    it("should return random element", () => {
      const arr = [1, 2, 3];
      const result = sample(arr);
      expect(arr).toContain(result);
    });

    it("should return undefined for empty array", () => {
      expect(sample([])).toBeUndefined();
      expect(sample(null)).toBeUndefined();
    });
  });

  describe("sampleSize", () => {
    it("should return n random elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = sampleSize(arr, 3);
      expect(result).toHaveLength(3);
      result.forEach((item) => expect(arr).toContain(item));
    });
  });

  describe("shuffle", () => {
    it("should shuffle array", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = shuffle(arr);
      expect(result).toHaveLength(5);
      expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("union", () => {
    it("should return union of arrays", () => {
      expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe("intersection", () => {
    it("should return intersection of arrays", () => {
      expect(intersection([1, 2, 3], [2, 3, 4], [2, 3, 5])).toEqual([2, 3]);
    });
  });

  describe("difference", () => {
    it("should return difference", () => {
      expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
    });
  });

  describe("sortBy", () => {
    it("should sort by key", () => {
      const arr = [{ age: 30 }, { age: 20 }, { age: 25 }];
      expect(sortBy(arr, "age")).toEqual([
        { age: 20 },
        { age: 25 },
        { age: 30 },
      ]);
    });

    it("should sort descending", () => {
      expect(sortBy([3, 1, 2], (n) => n, "desc")).toEqual([3, 2, 1]);
    });
  });

  describe("flatten", () => {
    it("should flatten one level", () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
    });
  });

  describe("flattenDepth", () => {
    it("should flatten to specified depth", () => {
      expect(flattenDepth([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });
  });

  describe("zip", () => {
    it("should zip arrays", () => {
      expect(zip([1, 2], ["a", "b"], [true, false])).toEqual([
        [1, "a", true],
        [2, "b", false],
      ]);
    });
  });

  describe("range", () => {
    it("should generate number sequence", () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });
  });
});
