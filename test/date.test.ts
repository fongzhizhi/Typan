import { describe, it, expect } from "vitest";
import {
  isValidDate,
  parseDate,
  formatDate,
  addDays,
  addMonths,
  addYears,
  diffMilliseconds,
  diffDays,
  startOfDay,
  endOfDay,
  isSameDay,
  toISOStringSafe,
} from "../src/core/utils/date";

describe("Date Utils", () => {
  describe("isValidDate", () => {
    it("should validate dates", () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate(new Date("2024-01-01"))).toBe(true);
      expect(isValidDate(new Date("invalid"))).toBe(false);
      expect(isValidDate("2024-01-01")).toBe(false);
    });
  });

  describe("parseDate", () => {
    it("should parse various date formats", () => {
      expect(parseDate("2024-01-01")).toBeInstanceOf(Date);
      expect(parseDate(1704067200000)).toBeInstanceOf(Date);
      expect(parseDate(new Date())).toBeInstanceOf(Date);
    });

    it("should return undefined for invalid input", () => {
      expect(parseDate("invalid")).toBeUndefined();
      expect(parseDate(null)).toBeUndefined();
    });
  });

  describe("formatDate", () => {
    it("should format date", () => {
      const date = new Date("2024-01-15T10:30:45");
      expect(formatDate(date, "YYYY-MM-DD")).toBe("2024-01-15");
      expect(formatDate(date, "YYYY-MM-DD HH:mm:ss")).toContain("2024-01-15");
    });

    it("should handle invalid date", () => {
      expect(formatDate(null)).toBe("");
    });
  });

  describe("addDays", () => {
    it("should add days to date", () => {
      const date = new Date("2024-01-01");
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it("should handle invalid date", () => {
      const result = addDays(null, 5);
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("addMonths", () => {
    it("should add months to date", () => {
      const date = new Date("2024-01-15");
      const result = addMonths(date, 2);
      expect(result.getMonth()).toBe(2); // March (0-indexed)
    });
  });

  describe("addYears", () => {
    it("should add years to date", () => {
      const date = new Date("2024-01-01");
      const result = addYears(date, 1);
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe("diffMilliseconds", () => {
    it("should calculate milliseconds difference", () => {
      const date1 = new Date("2024-01-01T00:00:00");
      const date2 = new Date("2024-01-01T00:00:01");
      expect(diffMilliseconds(date2, date1)).toBe(1000);
    });

    it("should return undefined for invalid dates", () => {
      expect(diffMilliseconds(null, new Date())).toBeUndefined();
    });
  });

  describe("diffDays", () => {
    it("should calculate days difference", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-06");
      expect(diffDays(date2, date1)).toBe(5);
    });
  });

  describe("startOfDay", () => {
    it("should get start of day", () => {
      const date = new Date("2024-01-15T15:30:45");
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

  describe("endOfDay", () => {
    it("should get end of day", () => {
      const date = new Date("2024-01-15T10:30:45");
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
    });
  });

  describe("isSameDay", () => {
    it("should check if dates are same day", () => {
      const date1 = new Date("2024-01-15T10:00:00");
      const date2 = new Date("2024-01-15T20:00:00");
      const date3 = new Date("2024-01-16T10:00:00");
      expect(isSameDay(date1, date2)).toBe(true);
      expect(isSameDay(date1, date3)).toBe(false);
    });
  });

  describe("toISOStringSafe", () => {
    it("should convert to ISO string safely", () => {
      const date = new Date("2024-01-15");
      expect(toISOStringSafe(date)).toContain("2024-01-15");
    });

    it("should handle invalid date", () => {
      expect(toISOStringSafe(null)).toBe("");
    });
  });
});
