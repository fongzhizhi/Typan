import { describe, it, expect } from "vitest";
import { sleep, wait, timeout, retry } from "../src/core/utils/promise";

describe("Promise Utils", () => {
  describe("sleep", () => {
    it("should delay execution", async () => {
      const start = Date.now();
      await sleep(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });
  });

  describe("timeout", () => {
    it("should timeout promise", async () => {
      const slowPromise = new Promise((resolve) => setTimeout(resolve, 200));
      await expect(timeout(slowPromise, 50)).rejects.toThrow(
        "Operation timeout",
      );
    });

    it("should resolve if promise completes in time", async () => {
      const fastPromise = Promise.resolve(42);
      await expect(timeout(fastPromise, 100)).resolves.toBe(42);
    });
  });

  describe("retry", () => {
    it("should retry failed operations", async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error("fail");
        return "success";
      };
      const result = await retry(fn, { retries: 3, delay: 10 });
      expect(result).toBe("success");
      expect(attempts).toBe(3);
    });

    it("should throw after max retries", async () => {
      const fn = async () => {
        throw new Error("always fail");
      };
      await expect(retry(fn, { retries: 2, delay: 10 })).rejects.toThrow(
        "always fail",
      );
    });
  });
});
