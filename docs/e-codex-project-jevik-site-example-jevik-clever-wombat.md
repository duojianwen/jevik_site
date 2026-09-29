# Jevik 个人网站完整复刻 + Cloudflare Workers 部署计划

> 日期：2026-09-29 ｜ 作者：Jevon ｜ 状态：终稿（待朵教主审批）

## 一、Context（背景与目标）

**Why**：朵教主看中一套个人网站参考模板（`example/jevik-site/`），要求像素级完整复刻并部署到 Cloudflare，作为长期维护的个人站点。

**已确认决策**：
1. **像素级完全复刻**——含原作者文案一并照搬作基准，后续再替换个人信息
2. **站点代码放仓库根目录** `E:\Codex\Project\Jevik_Site\`
3. **平台：Cloudflare Workers 静态资产**（非 Pages）
4. **路径：GitHub 私有仓库 + Workers Builds 自动部署**（push 即部署）

**参考项目画像**（已深度探索 + 亲读核心源码）：纯手写静态站，零依赖零构建——7 个 HTML + `assets/css/styles.css` + `assets/js/{i18n.js, main.js}` + 9 张 PNG（~15MB），共 19 文件 ~1834 行。核心机制：EN/中文双语（localStorage）、滚动渐显（IntersectionObserver）、项目/博客筛选、mailto 表单、玻璃拟态导航。唯一外部依赖 Google Fonts CDN（已配中文回退字体）。

**关键工程判断**：源码在本地，最可靠的"像素级复刻"= **逐字节复制 + SHA-256 全量哈希校验**，手写重写只会引入偏差。截图与代码有细微版本差（页脚文案不同），**以代码为唯一基准**。

**本机工具链**（已验证）：git 2.45 / Node 25.3 / npm 11.6 / gh 2.83 / wrangler 4.143 / Python 3.11 ✓

## 二、Cloudflare 规范核实结论（2026-09 官方文档）

| 项 | 结论 | 依据 |
|---|---|---|
| 配置格式 | `wrangler.jsonc`（官方推荐新项目）；assets-only Worker 无需 `main` | wrangler/configuration 页 |
| 目录排除 | 无 exclude 键、不读 .gitignore；用 **`.assetsignore`**（资产目录根部，语法同 .gitignore）→ 根目录直部署，**无需构建脚本** | static-assets/binding 页 |
| 干净 URL | `html_handling: "auto-trailing-slash"`：`/about`→200 出 about.html；`/about.html`→307 跳 `/about` | static-assets/routing 页 |
| 404 | `not_found_handling: "none"`（原站无 404.html） | 同上 |
| Workers Builds | Build command 留空；Deploy command 默认 `npx wrangler deploy`；**面板 Worker 名必须 = 配置 `name`**；最小 `package.json` 锁 wrangler 版本保证构建确定性 | workers/ci-cd/builds 页 |
| 免费版限额 | 单文件 ≤25MiB、2 万文件；纯静态资产请求免费无限量（我们 19 文件/最大 2.9MB ✓） | workers/platform/limits 页 |

## 三、实施步骤

### Phase A：复刻到根目录 + 哈希证明
```bash
cd /e/Codex/Project/Jevik_Site
cp example/jevik-site/*.html .          # 7 个页面
cp -r example/jevik-site/assets .       # css/js/img 12 个文件
```
校验（三重）：
- 结构清点：根目录 7 个 html、`find assets -type f | wc -l` = 12、9 张 png
- **SHA-256 逐一比对**：对全部 19 个文件循环 `sha256sum` 比对源/目标，全 OK 才算复刻成功
- `diff -r example/jevik-site/assets assets` 输出为空

### Phase B：仓库脚手架（5 个配置文件）
创建以下文件（内容见第四节）：
1. `wrangler.jsonc` — Workers 静态资产配置
2. `.assetsignore` — 阻止 example/、docs/、配置文件被当资产上传（**关键防线**）
3. `package.json` — 锁定 wrangler ^4.143.0（构建确定性）
4. `.gitignore` — 排除 `example/`、`node_modules/`、`.wrangler/`、OS 垃圾文件；`docs/` 入库
   - *合伙人调整：不提交 example/（30MB）。复刻副本本身即站点代码备份，example/ 独有的只是 8 张截图；国内推 45MB 易卡顿，砍到 ~15MB*
5. `README.md`（作者：Jevon）— 项目说明、目录结构、本地运行/部署方式

**部署内容验证**（.assetsignore 生效证明）：
```bash
npm install                              # 装入锁定的 wrangler
npx wrangler deploy --dry-run            # 资产清单必须恰好 19 个站点文件，无 example/docs/README
```

### Phase C：Git + GitHub
```bash
git init -b main
git add -A
git commit -m "feat: replicate jevik-site static site with Cloudflare Workers deploy"
gh repo create jevik-site --private --source . --remote origin --push
```
（署名规则按朵教主全局配置：不加 attribution 行）

### Phase D：Cloudflare 部署
1. **本地冒烟**（推荐先做，顺带创建同名 Worker）：
   - 朵教主执行 `! npx wrangler login`（交互式浏览器 OAuth，一次性）
   - 我执行 `npx wrangler deploy` → 得到 `https://jevik-site.<子域>.workers.dev`
2. **接 Git 自动部署**（朵教主在控制台操作，我提供逐步指引）：
   - Workers & Pages → 选中 jevik-site Worker → Settings → Builds → Connect
   - 授权 GitHub App（只授权 jevik-site 仓库）→ 选 main 分支
   - Build command 留空 / Deploy command 默认 / Root directory 留空 → Save
3. **流水线验证**：`git commit --allow-empty -m "chore: verify ci" && git push` → Deployments 页看到构建通过

## 四、配置文件内容（终稿）

**`wrangler.jsonc`**：
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "jevik-site",
  "compatibility_date": "2026-09-29",
  "assets": {
    "directory": "./",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "none"
  }
}
```

**`.assetsignore`**：
```
.assetsignore
.git/
.gitignore
.wrangler/
README.md
docs/
example/
node_modules/
package.json
package-lock.json
wrangler.jsonc
```

**`package.json`**：
```json
{
  "name": "jevik-site",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "wrangler": "^4.143.0"
  }
}
```

**`.gitignore`**：
```
example/
node_modules/
.wrangler/
.dev.vars
.DS_Store
Thumbs.db
desktop.ini
```

## 五、验证方式（端到端）

1. **复刻忠实性**：19 文件 SHA-256 全一致（硬性门槛）
2. **本地预览**：`npx wrangler dev`（用真实路由行为验证，等效线上；备用 `python -m http.server`）+ Chrome DevTools MCP 逐页对照 8 张参考截图
3. **功能矩阵**：7 页加载互跳 ✓ / EN↔中文切换持久化 ✓ / 滚动渐显 ✓ / projects+blog 筛选 ✓ / ≤1020px 汉堡菜单 ✓ / 表单校验+mailto ✓ / ≤640px 单列响应式 ✓
4. **路由行为**：`/about`→200、`/about.html`→307、`/nope`→404
5. **线上冒烟**：curl 逐页 HEAD（首页/about/资产各 200，307/404 行为符合预期）+ 浏览器目视核对

## 六、风险与已知取舍

| 风险/取舍 | 处理 |
|---|---|
| `.assetsignore` 失误会把仓库文件公开 | `--dry-run` + `wrangler dev` 双重验证资产清单 |
| workers.dev 域名在大陆常被墙 | 测试可能需代理；后续可绑自定义域名解决（列为例外项） |
| Google Fonts 大陆访问不稳 | 原站已配苹方/雅黑回退，可接受 |
| 15MB 未优化 PNG | 保像素级忠实度保留；WebP 压缩 + lazy loading 列为后续可选优化 |
| 无 favicon/robots/sitemap/og | 原站即无，忠实保留；浏览器静默 404 favicon 无害 |
| 首次推送 ~15MB 从国内可能慢 | 失败重试/代理重推即可 |
| Node 25 非 LTS | wrangler 4.143 已验证可用；长期建议 Node 24 LTS 对齐构建镜像（非阻塞） |

## 七、交付物

1. 线上站点：`https://jevik-site.<子域>.workers.dev`
2. GitHub 私有仓库（push 即自动部署）
3. 本计划按 §7.6 归档 `docs/plan_replicate-jevik-site_20260929.md`（写入前与朵教主确认文件名）
4. 后续自定义指引：替换个人信息/图片、绑自定义域名、可选性能优化清单
