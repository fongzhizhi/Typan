import { describe, it, expect } from "vitest";
import {
  getMapKeys,
  getMapValues,
  iterateMap,
  iterateMapSnapshot,
  filterMap,
  mapMapValues,
  mapMapKeys,
  findInMap,
  someMap,
  everyMap,
  reduceMap,
  mergeMaps,
  getOrDefault,
  mapToObject,
  objectToMap,
  setToArray,
  arrayToSet,
  unionSet,
  intersectionSet,
  differenceSet,
  isSubset,
  isSuperset,
  filterSet,
  mapSet,
} from "../src/core/utils/map";

describe("Map Utils", () => {
  describe("getMapKeys", () => {
    it("should get all keys", () => {
      const map = new Map([
        ["a", 1],
        ["b", 2],
      ]);
      expect(getMapKeys(map)).toEqual(["a", "b"]);
    });

    it("should handle null/undefined", () => {
      expect(getMapKeys(null)).toEqual([]);
    });
  });

  describe("getMapValues", () => {
    it("should get all values", () => {
      const map = new Map([
        ["a", 1],
        ["b", 2],
      ]);
      expect(getMapValues(map)).toEqual([1, 2]);
    });
  });

  describe("iterateMap", () => {
    it("should iterate map", () => {
      const map = new Map([
        ["a", 1],
        ["b", 2],
      ]);
      const result: number[] = [];
      iterateMap(map, (val) => {
        result.push(val);
      });
      expect(result).toEqual([1, 2]);
    });

    it("should stop when callback returns true", () => {
      const map = new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]);
      const result: number[] = [];
      const stopped = iterateMap(map, (val) => {
        result.push(val);
        return val === 2;
      });
      expect(stopped).toBe(true);
    });
  });
});
