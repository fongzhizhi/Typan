import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const mkdir = promisify(fs.mkdir);

/**
 * 确保目录存在
 * @description 如果目录不存在则创建（包括父目录）
 * @param dirPath - 目录路径
 * @returns 成功返回 true，失败返回 false
 * @example
 * await ensureDir("./output/logs");
 * // 会创建 output 和 logs 目录（如果不存在）
 */
export async function ensureDir(dirPath: string): Promise<boolean> {
  try {
    await mkdir(dirPath, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * 删除目录及其内容（谨慎使用）
 * @description 递归删除目录及其所有内容，操作不可逆
 * @param dirPath - 目录路径
 * @returns 成功返回 true，失败返回 false
 * @example
 * const success = await removeDir("./temp");
 * if (success) {
 *   console.log("临时目录已删除");
 * }
 * @warning 此操作会永久删除目录及其所有内容，请谨慎使用
 */
export async function removeDir(dirPath: string): Promise<boolean> {
  try {
    await fs.promises.rm(dirPath, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取目录大小（字节）
 * @description 递归计算目录及其所有子目录和文件的总大小
 * @param dirPath - 目录路径
 * @returns 目录总大小（字节），失败返回 0
 * @example
 * const size = await getDirSize("./node_modules");
 * console.log(`目录大小: ${(size / 1024 / 1024).toFixed(2)} MB`);
 */
export async function getDirSize(dirPath: string): Promise<number> {
  let size = 0;
  try {
    const files = await fs.promises.readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory()) {
        size += await getDirSize(filePath);
      } else {
        size += stats.size;
      }
    }
  } catch {
    // ignore
  }
  return size;
}
