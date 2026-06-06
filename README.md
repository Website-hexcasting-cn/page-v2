# Hexcasting Website - Page V2

Hexcasting 模组工具站 V2 版本，提供在线图案绘制、工具集等功能。

## 许可证

本项目采用 [MIT License](LICENSE)。

## 技术架构

| 技术 | 版本 | 用途 |
|------|------|------|
| [Svelte](https://svelte.dev/) | ^5.55.5 | 前端 UI 框架 |
| [Vite](https://vite.dev/) | ^8.0.12 | 构建工具与开发服务器 |
| TypeScript | ~6.0.2 | 类型系统 |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | ^4.0.1 | 国际化（支持中文/英文） |

**包管理器：** pnpm

**部署平台：** Cloudflare Pages

## 资源文件版权说明

### HexcastingLogo.png
- **来源：** [Hexcasting](https://github.com/gamma-quadruplet/Hexcasting) 模组
- **版权：** 归 Hexcasting 模组原作者 [Gamma Quadruplet](https://github.com/gamma-quadruplet) 所有
- **许可：** Hexcasting 模组采用 [MIT License](https://github.com/gamma-quadruplet/Hexcasting/blob/main/LICENSE)，允许在保留版权声明的前提下使用和分发

### LogoBackgroundImage.webp
- **来源：** Hexcasting 模组相关素材
- **版权：** 归 Hexcasting 模组原作者所有
- **许可：** 同上
## 项目结构

```
page-v2/
├── src/
│   ├── assets/Img/          # 图片资源
│   │   ├── HexcastingLogo.png
│   │   └── LogoBackgroundImage.webp
│   ├── components/          # Svelte 组件
│   │   ├── TopMenu.svelte
│   │   ├── ToolsPage.svelte
│   │   └── PatternCanvasPage.svelte
│   ├── config/              # JSON 配置文件
│   │   ├── TopMenuConfig.json
│   │   └── ToolsConfig.json
│   ├── locales/             # 国际化翻译文件
│   │   ├── en.json
│   │   └── zh.json
│   ├── lib/PatternDrawing/  # 图案绘制库
│   ├── i18n.ts              # 国际化初始化
│   ├── App.svelte
│   └── app.css              # 全局样式
├── package.json
├── svelte.config.js
├── vite.config.ts
└── tsconfig.json
```

## 构建与部署

### 本地开发
```bash
pnpm install
pnpm dev
```

### 生产构建
```bash
pnpm build
```

### Cloudflare Pages 配置
| 配置项 | 值 |
|--------|-----|
| 构建命令 | `pnpm run build` |
| 输出目录 | `dist` |
| 根目录 | `page-v2` |
| 环境变量 `NODE_VERSION` | `20` |
| 环境变量 `NPM_CONFIG_PACKAGE_MANAGER` | `pnpm` |
