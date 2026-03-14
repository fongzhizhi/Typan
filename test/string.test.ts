import { describe, it, expect } from "vitest";
import {
  isBlank,
  isNotBlank,
  truncate,
  safeSubstring,
  safeSlice,
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  contains,
  equalsIgnoreCase,
  trimToNull,
  repeatSafe,
  padStart,
  padEnd,
} from "../src/core/utils/string";

describe("String Utils", () => {
  describe("isBlank", () => {
    it("should detect blank strings", () => {
      expect(isBlank("")).toBe(true);
      expect(isBlank("   ")).toBe(true);
      expect(isBlank(null)).toBe(true);
      expect(isBlank(undefined)).toBe(true);
      expect(isBlank("hello")).toBe(false);
    });
  });

  describe("isNotBlank", () => {
    it("should detect non-blank strings", () => {
      expect(isNotBlank("hello")).toBe(true);
      expect(isNotBlank("")).toBe(false);
      expect(isNotBlank(null)).toBe(false);
    });
  });

  describe("truncate", () => {
    it("should truncate long strings", () => {
      expect(truncate("hello world", 8)).toBe("hello...");
      expect(truncate("hello", 10)).toBe("hello");
    });

    it("should handle null/undefined", () => {
      expect(truncate(null, 5)).toBe("");
      expect(truncate(undefined, 5)).toBe("");
    });
  });

  describe("safeSubstring", () => {
    it("should extract substring safely", () => {
      expect(safeSubstring("hello", 1, 4)).toBe("ell");
      expect(safeSubstring("hello", -1, 10)).toBe("hello");
    });

    it("should handle null/undefined", () => {
      expect(safeSubstring(null, 0, 5)).toBe("");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("HELLO")).toBe("Hello");
    });

    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
      expect(capitalize(null)).toBe("");
    });
  });

  describe("camelCase", () => {
    it("should convert to camelCase", () => {
      expect(camelCase("hello-world")).toBe("helloWorld");
      expect(camelCase("hello_world")).toBe("helloWorld");
      expect(camelCase("hello world")).toBe("helloWorld");
    });
  });

  describe("kebabCase", () => {
    it("should convert to kebab-case", () => {
      expect(kebabCase("helloWorld")).toBe("hello-world");
      expect(kebabCase("hello_world")).toBe("hello-world");
    });
  });

  describe("snakeCase", () => {
    it("should convert to snake_case", () => {
      expect(snakeCase("helloWorld")).toBe("hello_world");
      expect(snakeCase("hello-world")).toBe("hello_world");
    });
  });

  describe("contains", () => {
    it("should check if string contains substring", () => {
      expect(contains("hello world", "world")).toBe(true);
      expect(contains("hello world", "foo")).toBe(false);
    });

    it("should handle null/undefined", () => {
      expect(contains(null, "test")).toBe(false);
    });
  });

  describe("equalsIgnoreCase", () => {
    it("should compare strings ignoring case", () => {
      expect(equalsIgnoreCase("Hello", "hello")).toBe(true);
      expect(equalsIgnoreCase("Hello", "world")).toBe(false);
    });
  });

  describe("trimToNull", () => {
    it("should trim and return null for empty", () => {
      expect(trimToNull("  hello  ")).toBe("hello");
      expect(trimToNull("   ")).toBe(null);
      expect(trimToNull("")).toBe(null);
    });
  });

  describe("repeatSafe", () => {
    it("should repeat string safely", () => {
      expect(repeatSafe("a", 3)).toBe("aaa");
      expect(repeatSafe("ab", 2)).toBe("abab");
    });

    it("should handle invalid input", () => {
      expect(repeatSafe(null, 3)).toBe("");
      expect(repeatSafe("a", -1)).toBe("");
    });
  });

  describe("padStart", () => {
    it("should pad start of string", () => {
      expect(padStart("5", 3, "0")).toBe("005");
    });
  });

  describe("padEnd", () => {
    it("should pad end of string", () => {
      expect(padEnd("5", 3, "0")).toBe("500");
    });
  });
});
