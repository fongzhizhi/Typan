# Typan

> 专为 TypeScript 设计的、健壮且类型安全的实用工具集，用于增强原生 JavaScript 对象。

[![npm version](https://img.shields.io/npm/v/typan.svg)](https://www.npmjs.com/package/typan)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/typan)](https://bundlephobia.com/package/typan)
[![license](https://img.shields.io/npm/l/typan.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

**Typan** (Type + Titan) 是一个为现代 TypeScript 开发量身打造的工具库。**它不追求“大而全”，而是专注解决一个最普遍、最令人头疼的问题：“如何在不信任的数据上安心调用，且不用担心运行时崩溃？”**

通过一系列轻量、零依赖、类型完备的辅助函数，Typan 让你在操作 `Array`、`Object`、`Map`、`Date` 等原生对象时，**永远不需要预先判空**，**永远不用担心 `NaN`、`undefined`、`null` 突然抛错**。代码更简洁，心智负担更低。

---

## ✨ 特性

- **🛡️ 类型安全为先**  
  每个函数都基于严格的 TypeScript 泛型、重载和类型守卫构建。调用时 IDE 提示精准，返回值类型自动收窄。

- **🧱 永不抛错（No-Throw by Design）**  
  只要参数个数正确，任何 `null`、`undefined`、非法值都不会导致运行时异常——永远返回安全默认值（`[]`、`{}`、`0`、`false` 或 `undefined`）。

- **🧰 填补原生 API 的短板**  
  - **Map/Set**：快照遍历、过滤、映射、键值数组转换。  
  - **Date**：安全解析、有效性验证、日期计算。  
  - **Number**：严格数值判断（排除 `NaN`/`Infinity`）。  
  - **Object**：深度属性读取、安全设置、递归合并。  
  - **String**：常见文本处理与防御性截取。  
  - **Function**：安全调用、防抖节流、记忆化。  
  - **Console**：兼容性安全垫片。  
  - ……更多原生对象持续增强。

- **⚡ 零依赖 & 极致 Tree Shaking**  
  纯 ESM，每个函数独立导出。打包工具只会引入你真正使用的代码。

- **🔧 实用主义 + 可预测**  
  不堆砌冷门函数，只提炼日常开发中 **80% 场景下 20% 的高频痛点**。API 命名直观，行为符合直觉。

- **📘 为 TypeScript 5.0+ 优化**  
  完整利用 const 类型参数、`satisfies`、模板字面量等新特性，让工具函数在复杂类型下依然锋利。

---

## 📦 安装

```bash
npm install typan
# 或
yarn add typan
# 或
pnpm add typan
```

---

## 🚀 快速开始

```typescript
import {
  // 数组 —— 安全遍历、过滤空值、分块
  iterateArr,
  compact,
  chunk,

  // 对象 —— 深度读写、安全合并
  safeGet,
  safeSet,
  deepMerge,

  // 数字 —— 严格验证、安全转换
  isValidNumber,
  toInt,

  // 字符串 —— 防御性截取、判空
  isBlank,
  truncate,

  // 日期 —— 安全解析、格式化
  isValidDate,
  parseDate,
  formatDate,

  // Map —— 获取键/值数组、快照遍历
  getMapKeys,
  getMapValues,
  iterateMap,

  // 函数 —— 安全调用、防抖
  safeCall,
  noop,
  debounce,

  // 通用 —— 智能空值判断
  isNone,
} from 'typan';

// --- 再也不需要这样写 ---
if (map && map.size > 0) {
  Array.from(map.keys()).forEach(...)
}

// --- 只需这样写 ---
getMapKeys(map).forEach(...)   // 永远是一个数组

// --- 数组遍历，随时可中断 ---
iterateArr([1, 2, 3, 4, 5], (n, idx) => {
  if (n > 3) return true;      // 返回 true 即停止遍历
});

// --- 安心处理后端返回的未知数据 ---
const userAge = safeGet(apiResponse, 'data.user.profile.age', 18);
// 即使 apiResponse 或中间属性为 null/undefined，也只会返回默认值 18

// --- 过滤数组中的空值，并让 TypeScript 正确推断类型 ---
const list: (string | null | undefined)[] = ['a', null, 'b', undefined];
const clean: string[] = compact(list);  // ['a', 'b']

// --- 严格的数字验证，排除 NaN/Infinity ---
isValidNumber(42);        // true
isValidNumber(NaN);       // false
isValidNumber(Infinity);  // false

// --- 智能空值判定 ---
isNone(null);           // true
isNone('');             // true
isNone(undefined);      // true
isNone(0);              // false
isNone(false);          // false

// --- 安全调用函数，若传入的不是函数则返回 fallback ---
safeCall(maybeFunction, arg1, arg2);          // 若 maybeFunction 非函数，返回 undefined
safeCall(maybeFunction, arg1, arg2, fallback);// 可指定默认返回值
```

---

## 🤔 为什么不用 Lodash / Ramda / es-toolkit？

| 对比维度               | Lodash / es-toolkit          | **Typan**                                   |
|----------------------|-----------------------------|---------------------------------------------|
| **设计目标**          | 全能型工具集                 | **专精“防御性操作”**，只解决数据不可信问题         |
| **对 null/undefined** | 部分函数支持，但不统一        | **所有函数 100% 容错**，绝不抛异常               |
| **类型体操**          | 基础泛型，深度类型支持有限    | **极致类型收窄**，充分利用 TS 5.0+ 特性          |
| **集合类型增强**      | 较少（Map/Set 方法稀缺）     | **重点增强 Map、Set、WeakMap、Date、Console 等** |
| **体积**             | 即使 tree-shaking 也有基线   | **每个函数 < 1KB**，按需导入，零额外开销         |

**Typan 并不是要取代它们，而是作为“最后一道防线”与它们共存**——当你处理不可信的接口数据、用户输入或遗留代码时，Typan 能让你以最少的代码获得最大的安全感。

---

## 📚 核心工具（分类速览）

### 🟦 Array
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `iterateArr` | 可中断遍历，回调返回 `true` 停止 | 空数组直接返回 `false` |
| `chunk` | 将数组拆分成指定大小的块 | 输入非数组返回 `[]` |
| `compact` | 移除所有假值（`null`/`undefined`/`''`/`0`/`false`/`NaN`） | 类型守卫保留非空类型 |
| `safeAt` | 安全访问数组元素，支持负数索引 | 越界/非数组 → `undefined` |
| `groupBy` | 根据 key 函数分组，返回 `Map` | 输入非数组 → 空 `Map` |
| `partition` | 按条件拆分为两个数组 | 输入非数组 → `[[], []]` |
| `unique` | 数组去重，可指定迭代函数 | 输入非数组 → `[]` |
| `sample` / `sampleSize` | 随机取元素 | 空数组 → `undefined` / `[]` |
| `shuffle` | 随机打乱数组（不修改原数组） | 输入非数组 → `[]` |
| `union` / `intersection` / `difference` | 集合运算 | 输入非数组 → `[]` |
| `sortBy` / `orderBy` | 多字段排序 | 自动处理 `null/undefined` 排序位置 |
| `flatten` / `flattenDepth` | 展平嵌套数组 | 输入非数组 → `[]` |
| `zip` / `unzip` | 多个数组合并/拆分 | 长度不等用 `undefined` 填充 |
| `range` | 生成数字序列 | 边界自动归一 |

### 🟨 Object
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `safeGet` | 深度读取属性，支持默认值 | 任意层级 `null/undefined` → 默认值 |
| `safeSet` | 深度设置属性，中间路径自动创建 | 输入非对象 → 返回新对象 |
| `deepMerge` | 递归合并对象 | 忽略 `null/undefined` 源 |
| `omit` / `pick` | 排除/选取指定属性 | 输入非对象 → `{}`；类型安全 |
| `omitBy` / `pickBy` | 根据谓词排除/选取 | 同上 |
| `mapKeys` / `mapValues` | 映射键/值 | 输入非对象 → `{}` |
| `isPlainObject` | 严格检查纯对象 | 安全处理各种边界 |
| `isEmptyObject` | 是否为空对象 | `null/undefined` → `true` |
| `deepClone` | 简易深克隆 | 处理循环引用（可选） |
| `deepFreeze` | 深度冻结（仅开发环境） | 非对象直接返回 |

### 🟩 Map & Set
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `getMapKeys` / `getMapValues` | 获取 Map 所有键/值（数组形式） | `null/undefined` → `[]` |
| `iterateMap` | 遍历 Map，支持安全快照模式 | 参数非法直接返回 `false` |
| `filterMap` | 根据条件过滤 Map，返回新 Map | 输入非 Map → 空 Map |
| `mapKeys` / `mapValues` | 映射 Map 的键/值 | 同上 |
| `findInMap` | 查找第一个满足条件的条目 | 未找到 → `undefined` |
| `someMap` / `everyMap` | 类似数组的 `some/every` | 空 Map → `false` / `true` |
| `reduceMap` | 将 Map 归约为单一值 | 类似 `Array.reduce` |
| `mergeMaps` | 合并多个 Map | 忽略非 Map 输入 |
| `getOrDefault` | 取 Map 元素，若 key 不存在则返回默认值 | 输入非 Map → 默认值 |
| `setToArray` / `arrayToSet` | Set ↔ Array 转换 | 非 Set/非数组 → `[]` / 空 Set |
| `union` / `intersection` / `difference` | Set 集合运算 | 自动处理非 Set 输入 |
| `isSubset` / `isSuperset` | 子集/超集判断 | 非 Set → `false` |
| `filterSet` / `mapSet` | 过滤/映射 Set 元素 | 返回新 Set |

### 🔢 Number
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `isValidNumber` | 严格数字（排除 `NaN`/`±Infinity`） | 非数字返回 `false` |
| `isNumeric` | 是否为可转换为有效数字的字符串 | `'123'` → `true`, `'abc'` → `false` |
| `toInt` / `toFloat` | 安全转换为整数/浮点数，失败返回默认值 | `toInt('42px') → undefined`（或 fallback） |
| `clamp` | 将数字限制在区间内 | 边界非法时返回 `0` |
| `inRange` | 判断数字是否在区间内 | `NaN` → `false` |
| `randomInt` / `randomFloat` | 生成指定范围内的随机数 | 边界自动归一 |
| `isEven` / `isOdd` | 严格奇偶判断 | 非有效整数 → `false` |
| `formatNumber` | 格式化数字（千位分隔符、小数位数） | 非法数字 → `''` |
| `toFixedSafe` | 安全版 `toFixed` | 非数字 → `'0.00'`（可定制） |

### 🔤 String
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `isBlank` | 空、仅空格或 `null/undefined` | `isBlank('   ') → true` |
| `isNotBlank` | 与 `isBlank` 相反 | 类型守卫收窄为非空字符串 |
| `truncate` | 截断字符串并添加省略号 | 自动处理长度参数非法 |
| `safeSubstring` / `safeSlice` | 安全截取，负数/越界自动规整 | 输入非字符串 → `''` |
| `capitalize` | 首字母大写 | 空字符串 → `''` |
| `camelCase` / `kebabCase` / `snakeCase` | 命名风格转换 | 输入非字符串 → `''` |
| `contains` | 是否包含子串 | 安全处理 `null/undefined` 输入，均返回 `false` |
| `equalsIgnoreCase` | 忽略大小写比较 | 非字符串视为 `false` |
| `trimToNull` | 去除首尾空格，若结果为空则返回 `null` | 便于数据库存储 |
| `escapeRegExp` | 转义正则特殊字符 | 输入非字符串 → `''` |
| `repeatSafe` | 安全版 `String.prototype.repeat` | 负数/非整数次数 → `''` |
| `padStart` / `padEnd` | 安全版补全 | 同上 |

### 📅 Date
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `isValidDate` | 是否为有效日期 | `new Date('invalid')` → `false` |
| `parseDate` | 安全解析多种格式（字符串、时间戳等） | 失败返回 `undefined` |
| `formatDate` | 灵活格式化（YYYY-MM-DD, 自定义模板） | 非法日期 → `''` |
| `addDays` / `addMonths` / `addYears` | 日期加减 | 非法日期 → `new Date(NaN)` |
| `diffDays` / `diffHours` | 计算日期差 | 任一非法日期 → `NaN` |
| `startOfDay` / `endOfDay` | 获取当天开始/结束时间 | 非法日期 → 非法日期 |
| `isSameDay` / `isBefore` / `isAfter` / `isBetween` | 日期比较 | 非法日期参与比较 → `false` |
| `toISOStringSafe` | 安全版 `toISOString()` | 非法日期 → `''` |

### ⚙️ Function
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `noop` | 空函数 | 什么都不做 |
| `safeCall` | 安全调用函数，若不是函数则返回 `fallback` | 类型收窄 |
| `safeApply` | 安全调用，接收 `this` 和参数数组 | 同上 |
| `safeBind` | 安全绑定 `this`，若不是函数则返回 `noop` | —— |
| `once` | 函数只执行一次 | 输入非函数 → `noop` |
| `debounce` / `throttle` | 轻量防抖/节流 | 输入非函数 → `noop` |
| `retry` | 异步函数重试 | 自动捕获错误 |
| `delay` | 延迟执行函数（返回 Promise） | 无函数参数时仅返回延迟 Promise |
| `memoize` | 函数结果缓存 | 支持多种缓存策略 |

### 🟢 Boolean & Others
| 函数 | 描述 | 安全特性 |
|------|------|----------|
| `toBoolean` | 字符串 `'true'`/`'false'` → 对应布尔，其余 `!!value` | —— |
| `negate` | 对谓词函数取反 | 输入非函数 → 返回始终 `false` 的函数 |
| `isTruthy` / `isFalsy` | 严格真假判断 | 辅助类型守卫 |
| `safeLog` / `safeWarn` / `safeError` / `safeInfo` / `safeDebug` | 安全调用 console 方法 | 若 console 方法不存在则静默失败 |
| `logIf` | 条件日志 | 开发环境常用 |
| `safeParse` / `safeStringify` | 安全的 JSON 解析/序列化 | 失败返回 fallback / `''` |
| `isRegExp` / `escapeRegExp` | 正则相关 | 安全类型判断 |
| `sleep` / `wait` | 延迟返回 Promise | —— |
| `isBigInt` / `toBigIntSafe` | BigInt 类型守卫/安全转换 | —— |
| `weakMapGet` / `weakMapHas` / `weakSetHas` | WeakMap/WeakSet 安全访问 | 键非对象返回 `undefined`/`false` |

> 💡 完整 API 文档请参阅 [官方文档网站]（建设中）或直接阅读源码注释。

---

## 🧠 设计哲学：为什么“永不抛错”是合理的？

很多开发者担心“静默吞错”会掩盖真正的 bug。Typan 遵循一条明确的分界线：

- **参数个数错误 / 类型完全不符** → **立即抛出 Error**（例如给 `getMapKeys` 传入一个普通对象）。
- **参数类型正确但值为 `null/undefined`** → **返回安全的默认值**。

这意味着：**Typan 只保护“合法但空”的数据，不保护“乱用 API”的行为。**  
这样既保证了开发阶段的错误可见性，又消除了生产环境中烦人的 `Cannot read property 'xxx' of null`。

---

## 🧩 贡献指南

Typan 坚持 **“小而精”** 的演进路线。欢迎任何**能解决真实痛点、且无法通过原生一行代码优雅实现**的工具函数。

**提交 PR 前请确保：**

1. 函数具备明确的**防御性设计**（空值处理、类型守卫）。
2. 提供完整的 TypeScript 类型定义（善用泛型、重载、`never`）。
3. 包含充分的单元测试（Vitest / Jest），覆盖正常、边界、非法输入。
4. 单文件导出，零依赖。

**开发流程：**

```bash
git clone https://github.com/你的用户名/typan.git
cd typan
pnpm install          # 推荐 pnpm，也可用 npm/yarn
pnpm test             # 运行测试
pnpm build            # 构建 ESM 产物
```

---

## 🛣️ Roadmap 2025 Q2~Q3

- [ ] 安全管道操作符风格（`safe(obj).prop('a.b.c').get()`）
- [ ] 运行时类型断言助手（基于 TS 类型谓词，如 `isArrayOf`、`isNumber`）
- [ ] WeakMap/WeakSet 防御工具增强
- [ ] 时区友好的日期处理
- [ ] 官方文档网站（VitePress）
- [ ] 性能基准测试与体积报告

**你的 star 和 issue 是推动它前进的最大动力！** ⭐

---

## 📄 许可证

MIT © [你的名字/团队]

---

[GitHub 仓库](https://github.com/你的用户名/typan) | [提交 Issue](https://github.com/你的用户名/typan/issues) | [npm 主页](https://www.npmjs.com/package/typan)

---

**Typan** – 成为你 TypeScript 项目中的“泰坦”，用类型与安全守护每一行代码。