import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/** 安全读取文件，失败返回 undefined */
export async function readFileSafe(
  filePath: string,
  encoding: BufferEncoding = "utf8",
): Promise<string | undefined> {
  try {
    return await readFile(filePath, { encoding });
  } catch {
    return undefined;
  }
}

/** 安全写入文件，自动创建目录 */
export async function writeFileSafe(
  filePath: string,
  data: string | Buffer,
): Promise<boolean> {
  try {
    const dir = path.dirname(filePath);
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, data);
    return true;
  } catch {
    return false;
  }
}

/** 检查文件/目录是否存在 */
export async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/** 安全读取目录 */
export async function readdirSafe(dirPath: string): Promise<string[]> {
  try {
    return await readdir(dirPath);
  } catch {
    return [];
  }
}

/** 获取文件信息，失败返回 undefined */
export async function statSafe(
  filePath: string,
): Promise<fs.Stats | undefined> {
  try {
    return await stat(filePath);
  } catch {
    return undefined;
  }
}
