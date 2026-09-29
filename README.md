# Jevik Site

> 作者：Jevon ｜ 创建：2026-09-29 ｜ 风格版本：v2

个人网站 —— 纯手写静态站点（8 个 HTML 页面 + CSS + 原生 JavaScript，零依赖、零构建），
部署于 **Cloudflare Workers 静态资产**，通过 GitHub 推送自动部署。

## 站点特性

- 8 个页面：首页 / 关于 / Work（home-alt）/ 项目列表 / 项目详情 / 博客列表 / 文章详情 / 联系
- **字体全部自托管**（`assets/fonts/`：Inter ×4、Sora ×2、Source Serif 4 ×3，共 9 个 woff2）——不依赖 Google Fonts CDN，大陆访问无字体风险
- EN / 中文 双语切换（`assets/js/i18n.js`，localStorage 持久化）
- 滚动渐显动画、项目/博客分类筛选、mailto 联系表单
- 玻璃拟态 + 3D 视觉设计体系（暖米色底、橙→蓝渐变主色），每页内联 SVG favicon
- 响应式：1020px / 640px 两档断点

## 目录结构

```
├── *.html              # 8 个站点页面（仓库根目录即站点根目录）
├── assets/
│   ├── css/main.css    # 全部样式（v2 设计系统）
│   ├── fonts/          # 自托管字体：fonts.css + 9 个 woff2
│   ├── img/            # 9 张 PNG 视觉素材
│   └── js/             # i18n.js（EN/ZH 词典）+ main.js（交互逻辑）
├── wrangler.jsonc      # Cloudflare Workers 部署配置
├── .assetsignore       # 部署时排除的非站点文件（关键防线）
├── .gitattributes      # 字节级保真（LF 检出 + 二进制保护）
├── example/            # 参考材料（仅本地，不入库不部署）
└── docs/               # 项目文档
```

## 本地开发

```bash
npm install       # 首次：安装锁定的 wrangler
npm run dev       # wrangler dev，路由行为与线上一致
```

> dev 脚本已固化 `--persist-to ../jevik-site-wrangler-state`：把 wrangler 状态写到仓库外，
> 避免文件监视器监视资产目录（=仓库根）时被状态写入自触发，导致无限重载。

备用方案（纯静态预览，无 Workers 路由行为）：`python -m http.server 8000`

## 部署

- **自动**：push 到 `main` 分支 → Cloudflare Workers Builds 自动构建部署
- **手动**：`npm run deploy`（需先 `npx wrangler login`）

线上地址：`https://jevik-site.<账户子域>.workers.dev`

## 部署内容自检

```bash
npx wrangler deploy --dry-run   # 资产清单应恰好为 30 个站点文件
```
