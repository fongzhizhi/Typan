import { describe, it, expect } from "vitest";
import {
  isValidNumber,
  isNumeric,
  toInt,
  toFloat,
  clamp,
  inRange,
  randomInt,
  randomFloat,
  isEven,
  isOdd,
  formatNumber,
  toFixedSafe,
} from "../src/core/utils/number";

describe("Number Utils", () => {
  describe("isValidNumber", () => {
    it("should validate numbers", () => {
      expect(isValidNumber(42)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-10)).toBe(true);
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber("42")).toBe(false);
    });
  });

  describe("isNumeric", () => {
    it("should check if string is numeric", () => {
      expect(isNumeric("42")).toBe(true);
      expect(isNumeric("3.14")).toBe(true);
      expect(isNumeric("abc")).toBe(false);
      expect(isNumeric("")).toBe(false);
    });
  });

  describe("toInt", () => {
    it("should convert to integer", () => {
      expect(toInt("42")).toBe(42);
      expect(toInt(3.14)).toBe(3);
      expect(toInt(3)).toBe(3);
      expect(toInt("abc")).toBeUndefined();
      expect(toInt("abc", 0)).toBe(0);
    });
  });

  describe("toFloat", () => {
    it("should convert to float", () => {
      expect(toFloat("3.14")).toBe(3.14);
      expect(toFloat("42")).toBe(42);
      expect(toFloat("abc")).toBeUndefined();
      expect(toFloat("abc", 0)).toBe(0);
    });
  });

  describe("clamp", () => {
    it("should clamp number to range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("should handle invalid input", () => {
      expect(clamp(NaN, 0, 10)).toBe(0);
    });
  });

  describe("inRange", () => {
    it("should check if number is in range", () => {
      expect(inRange(5, 0, 10)).toBe(true);
      expect(inRange(0, 0, 10)).toBe(true);
      expect(inRange(10, 0, 10)).toBe(true);
      expect(inRange(-1, 0, 10)).toBe(false);
      expect(inRange(11, 0, 10)).toBe(false);
    });
  });

  describe("randomInt", () => {
    it("should generate random integer in range", () => {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe("randomFloat", () => {
    it("should generate random float in range", () => {
      const result = randomFloat(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });
  });

  describe("isEven", () => {
    it("should check if number is even", () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isEven(0)).toBe(true);
    });
  });

  describe("isOdd", () => {
    it("should check if number is odd", () => {
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
    });
  });

  describe("formatNumber", () => {
    it("should format number with thousands separator", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
    });

    it("should format with precision", () => {
      expect(formatNumber(3.14159, { precision: 2 })).toBe("3.14");
    });

    it("should handle null/undefined", () => {
      expect(formatNumber(null)).toBe("");
    });
  });

  describe("toFixedSafe", () => {
    it("should convert to fixed decimal", () => {
      expect(toFixedSafe(3.14159, 2)).toBe("3.14");
    });

    it("should handle invalid input", () => {
      expect(toFixedSafe(null, 2)).toBe("0.00");
    });
  });
});
