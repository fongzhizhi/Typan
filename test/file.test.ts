import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "fs";
import path from "path";
import {
  readFileSafe,
  writeFileSafe,
  exists,
  readdirSafe,
  statSafe,
} from "../src/node/file.utils";

describe("File Utils", () => {
  const testDir = path.join(__dirname, "temp-test");
  const testFile = path.join(testDir, "test.txt");

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  describe("writeFileSafe", () => {
    it("should write file safely", async () => {
      const result = await writeFileSafe(testFile, "test content");
      expect(result).toBe(true);
      const content = await fs.readFile(testFile, "utf8");
      expect(content).toBe("test content");
    });

    it("should create directories if needed", async () => {
      const nestedFile = path.join(testDir, "nested", "file.txt");
      const result = await writeFileSafe(nestedFile, "content");
      expect(result).toBe(true);
    });
  });

  describe("readFileSafe", () => {
    it("should read file safely", async () => {
      await fs.writeFile(testFile, "test content");
      const content = await readFileSafe(testFile);
      expect(content).toBe("test content");
    });

    it("should return undefined for non-existent file", async () => {
      const content = await readFileSafe(path.join(testDir, "nonexistent.txt"));
      expect(content).toBeUndefined();
    });
  });

  describe("exists", () => {
    it("should check if file exists", async () => {
      await fs.writeFile(testFile, "test");
      expect(await exists(testFile)).toBe(true);
      expect(await exists(path.join(testDir, "nonexistent.txt"))).toBe(false);
    });
  });

  describe("readdirSafe", () => {
    it("should read directory safely", async () => {
      await fs.writeFile(testFile, "test");
      const files = await readdirSafe(testDir);
      expect(files).toContain("test.txt");
    });

    it("should return empty array for non-existent directory", async () => {
      const files = await readdirSafe(path.join(testDir, "nonexistent"));
      expect(files).toEqual([]);
    });
  });

  describe("statSafe", () => {
    it("should get file stats safely", async () => {
      await fs.writeFile(testFile, "test");
      const stats = await statSafe(testFile);
      expect(stats).toBeDefined();
      expect(stats?.isFile()).toBe(true);
    });

    it("should return undefined for non-existent file", async () => {
      const stats = await statSafe(path.join(testDir, "nonexistent.txt"));
      expect(stats).toBeUndefined();
    });
  });
});
