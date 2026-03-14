# Typan 项目目录结构

```
typan/
├── .git/                          # Git 版本控制目录
├── .gitignore                     # Git 忽略文件配置
├── LICENSE                        # MIT 开源协议
├── README.md                      # 项目说明文档（中文）
├── package.json                   # 项目配置与依赖管理
├── tsconfig.json                  # TypeScript 编译配置
├── vite.config.ts                 # Vite 构建配置
├── vitest.config.ts               # Vitest 测试配置
│
├── node_modules/                  # 依赖包目录（npm/pnpm 安装）
│
├── src/                           # 源代码目录
│   ├── index.ts                   # 主入口文件
│   │
│   ├── core/                      # 核心工具模块（跨平台）
│   │   ├── index.ts               # core 模块导出入口
│   │   │
│   │   ├── libs/                  # 核心类库
│   │   │   ├── LogLevel.ts        # 日志级别定义
│   │   │   └── Timer.ts           # 计时器工具
│   │   │
│   │   └── utils/                 # 核心工具函数
│   │       ├── array.ts           # 数组操作工具
│   │       ├── common.ts          # 通用工具函数
│   │       ├── console.ts         # 控制台安全封装
│   │       ├── date.ts            # 日期处理工具
│   │       ├── function.ts        # 函数操作工具
│   │       ├── map.ts             # Map/Set 操作工具
│   │       ├── number.ts          # 数字处理工具
│   │       ├── object.ts          # 对象操作工具
│   │       ├── promise.ts         # Promise 工具
│   │       ├── ragular.ts         # 正则表达式工具
│   │       └── string.ts          # 字符串处理工具
│   │
│   ├── browser/                   # 浏览器环境专用模块
│   │   ├── index.ts               # browser 模块导出入口
│   │   └── dom.utils.ts           # DOM 操作工具
│   │
│   └── node/                      # Node.js 环境专用模块
│       ├── index.ts               # node 模块导出入口
│       ├── dir.utils.ts           # 目录操作工具
│       └── file.utils.ts          # 文件操作工具
│
└── test/                          # 测试文件目录
```

## 📦 模块导出结构

项目支持多种导入方式，满足不同使用场景：

```typescript
// 1. 完整导入（包含所有模块）
import { ... } from 'typan';

// 2. 仅导入核心工具（跨平台）
import { ... } from 'typan/core';

// 3. 仅导入浏览器工具
import { ... } from 'typan/browser';

// 4. 仅导入 Node.js 工具
import { ... } from 'typan/node';
```

## 🎯 核心模块分类

### Core（核心模块）
跨平台工具函数，可在浏览器和 Node.js 环境中使用：

- **Array**：数组遍历、过滤、分块、去重等
- **Object**：深度读写、合并、映射、克隆等
- **Map/Set**：集合操作、遍历、转换等
- **Number**：严格数值验证、转换、格式化等
- **String**：字符串处理、命名风格转换、截断等
- **Date**：日期解析、格式化、计算等
- **Function**：安全调用、防抖节流、记忆化等
- **Promise**：异步工具、重试、延迟等
- **Console**：安全日志输出
- **RegExp**：正则表达式工具

### Browser（浏览器模块）
浏览器环境专用工具：

- **DOM 操作**：元素查询、事件处理、样式操作等

### Node（Node.js 模块）
Node.js 环境专用工具：

- **文件操作**：读写、复制、删除等
- **目录操作**：创建、遍历、清空等

## 🛠️ 技术栈

- **语言**：TypeScript 5.3+
- **构建工具**：Vite 5.0
- **测试框架**：Vitest 1.2
- **包管理器**：支持 npm/yarn/pnpm
- **模块格式**：ESM（主）+ CommonJS（兼容）

## 📝 开发规范

- 所有工具函数必须具备完整的 TypeScript 类型定义
- 遵循"永不抛错"设计原则（参数合法但值为空时返回安全默认值）
- 零依赖，每个函数独立导出，支持 Tree Shaking
- 单元测试覆盖正常、边界、非法输入场景
