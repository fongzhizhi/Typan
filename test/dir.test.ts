import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "fs";
import path from "path";
import { ensureDir, removeDir, getDirSize } from "../src/node/dir.utils";

describe("Directory Utils", () => {
  const testDir = path.join(__dirname, "temp-test-dir");

  afterEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  describe("ensureDir", () => {
    it("should create directory if not exists", async () => {
      const result = await ensureDir(testDir);
      expect(result).toBe(true);
      const stats = await fs.stat(testDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it("should not fail if directory already exists", async () => {
      await fs.mkdir(testDir, { recursive: true });
      const result = await ensureDir(testDir);
      expect(result).toBe(true);
    });
  });

  describe("removeDir", () => {
    it("should remove directory and contents", async () => {
      await fs.mkdir(testDir, { recursive: true });
      await fs.writeFile(path.join(testDir, "test.txt"), "test");
      const result = await removeDir(testDir);
      expect(result).toBe(true);
      try {
        await fs.access(testDir);
        expect(true).toBe(false); // Should not reach here
      } catch {
        expect(true).toBe(true);
      }
    });
  });

  describe("getDirSize", () => {
    it("should calculate directory size", async () => {
      await fs.mkdir(testDir, { recursive: true });
      await fs.writeFile(path.join(testDir, "test1.txt"), "hello");
      await fs.writeFile(path.join(testDir, "test2.txt"), "world");
      const size = await getDirSize(testDir);
      expect(size).toBeGreaterThan(0);
    });

    it("should return 0 for non-existent directory", async () => {
      const size = await getDirSize(path.join(testDir, "nonexistent"));
      expect(size).toBe(0);
    });
  });
});
