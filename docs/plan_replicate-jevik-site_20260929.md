# Jevik 个人网站完整复刻 + Cloudflare Workers 部署计划（v2 终稿）

> 日期：2026-09-29 ｜ 作者：Jevon ｜ 状态：已执行（v1 复刻 + v2 风格切换均完成，Phase C/D 待办）

## 一、Context（背景与目标）

**Why**：朵教主看中一套个人网站参考模板，要求像素级完整复刻并部署到 Cloudflare，作为长期维护的个人站点。

**已确认决策**：
1. **像素级完全复刻**——含原作者文案一并照搬作基准（Jevik，hello@jevik.dev），后续再替换个人信息
2. **站点代码放仓库根目录** `E:\Codex\Project\Jevik_Site\`
3. **平台：Cloudflare Workers 静态资产**（非 Pages）
4. **路径：GitHub 私有仓库 + Workers Builds 自动部署**（push 即部署）
5. **【中途变更】风格切换 v2**——朵教主指示改以 `example/jevik-site-v2/` 为基准，v1 副本全量替换为 v2

**v2 站点画像**（替换后实况，30 个站点文件）：
- 8 个 HTML：index / about / projects / project-detail / blog / article / contact / **home-alt（Work 页，新增）**
- `assets/css/main.css`（421 行，v2 重写版）
- `assets/fonts/`：fonts.css + **9 个自托管 woff2**（Inter 400/500/600/700、Sora 700/800、SourceSerif4 i-500/n-700/n-800）——**彻底摆脱 Google Fonts CDN，大陆访问字体零风险**
- `assets/js/{i18n.js, main.js}`（167 / 61 行）
- `assets/img/` 9 张 PNG（与 v1 相同）
- 每页内联 SVG favicon（渐变 "J" data URI）

**关键工程判断**：源码在本地，最可靠的"像素级复刻"= **逐字节复制 + SHA-256 全量哈希校验**，手写重写只会引入偏差。以代码为唯一基准。

**本机工具链**（已验证）：git 2.45 / Node 25.3 / npm 11.6 / gh 2.83 / wrangler 4.143 ✓

## 二、Cloudflare 规范核实结论（2026-09 官方文档）

| 项 | 结论 | 依据 |
|---|---|---|
| 配置格式 | `wrangler.jsonc`（官方推荐新项目）；assets-only Worker 无需 `main` | wrangler/configuration 页 |
| 目录排除 | 无 exclude 键、不读 .gitignore；用 **`.assetsignore`**（资产目录根部，语法同 .gitignore）→ 根目录直部署，**无需构建脚本** | static-assets/binding 页 |
| 干净 URL | `html_handling: "auto-trailing-slash"`：`/about`→200 出 about.html；`/about.html`→307 跳 `/about` | static-assets/routing 页 |
| 404 | `not_found_handling: "none"`（原站无 404.html） | 同上 |
| Workers Builds | Build command 留空；Deploy command 默认 `npx wrangler deploy`；**面板 Worker 名必须 = 配置 `name`**；最小 `package.json` 锁 wrangler 版本保证构建确定性 | workers/ci-cd/builds 页 |
| 免费版限额 | 单文件 ≤25MiB、2 万文件；纯静态资产请求免费无限量（30 文件/最大 2.9MB ✓） | workers/platform/limits 页 |

## 三、实际执行记录

### Phase A1：v1 复刻（已完成，commit 2314189）
复制 `example/jevik-site/` 19 文件至根目录，SHA-256 19/19 一致。

### Phase A2：v2 风格切换（已完成，commit d048389）
1. 删除 10 个 v1 文件（7 HTML + styles.css + 旧 js）
2. 复制 v2 全部 20 个新文件（8 HTML + main.css + fonts/ 10 文件 + js 2 文件）
3. `.gitattributes` 新增 `*.woff2 binary` 保护（字节级保真：`* text=auto eol=lf` 防 CRLF 漂移）
4. **SHA-256 校验 30/30 OK，FAIL=0**

### Phase B：仓库脚手架（已完成）
`wrangler.jsonc` / `.assetsignore` / `package.json`（锁定 wrangler ^4.143.0）/ `.gitignore` / `README.md` / `.gitattributes`

**wrangler dev 稳定性修复**（过程中发现并固化）：文件监视器监视资产目录（=仓库根），会被 `.wrangler/` 内 SQLite 状态写入自触发 → 无限重载风暴。修复：`--persist-to ../jevik-site-wrangler-state`（仓库外同级目录），已写入 package.json dev 脚本。验证重载次数 = 1（仅启动）。

### Phase C：Git + GitHub（待办：需朵教主交互登录）
```bash
gh auth login                                   # 朵教主执行（! gh auth login）
gh repo create jevik-site --private --source . --remote origin --push
```

### Phase D：Cloudflare 部署（待办：需朵教主交互登录）
1. 朵教主执行 `! npx wrangler login`（浏览器 OAuth，一次性）
2. 我执行 `npx wrangler deploy` → `https://jevik-site.<子域>.workers.dev`
3. 控制台接 Git 自动部署：Workers & Pages → jevik-site → Settings → Builds → Connect → 授权 GitHub App（仅 jevik-site 仓库）→ main 分支，Build command 留空
4. 流水线验证：空提交 push → Deployments 页构建通过

## 四、配置文件终稿

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

**`.assetsignore`**（v2 仍适用，未变）：
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
（注：`.gitattributes` 亦在忽略清单中，见仓库实文件）

**`package.json`**：
```json
{
  "name": "jevik-site",
  "private": true,
  "scripts": {
    "dev": "wrangler dev --persist-to ../jevik-site-wrangler-state",
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "wrangler": "^4.143.0"
  }
}
```

**`.gitattributes`**：
```
* text=auto eol=lf
*.png binary
*.woff2 binary
```

## 五、验证方式与结果（v2，全绿）

| 验证项 | 结果 |
|---|---|
| SHA-256 逐字节比对（30 文件） | 30/30 OK，FAIL=0 |
| 路由行为（wrangler dev 实测） | 11/11 PASS：`/` `/home-alt` `/about` 200；`/about.html` 307；`/nope` `/README.md` 404；`styles.css` 404（v1 已清）；css/js/woff2 均 200 且 MIME 正确 |
| i18n 切换 + localStorage 持久化 | ✓（刷新保持） |
| projects 筛选（all6/web3/mobile1/ai2/design1） | ✓ |
| blog 筛选（all3/webdev1/typescript1/systems1；devops/ai 为原作者空占位，忠实保留） | ✓ |
| 联系表单三态校验 + mailto | ✓ |
| 汉堡菜单 ≤1020px / 单列 ≤640px | ✓ 断点精确 |
| 字体按需加载（含 SourceSerif4 斜体） | ✓ |
| 滚动渐显 IntersectionObserver | ✓ 3/3 |
| 水平溢出 | ✓ 无（1440px 下 scrollWidth 1425） |

## 六、风险与已知取舍（v2 修订版）

| 风险/取舍 | 处理 |
|---|---|
| `.assetsignore` 失误会把仓库文件公开 | `--dry-run` + `wrangler dev` 双重验证资产清单 |
| workers.dev 域名在大陆常被墙 | 测试可能需代理；后续可绑自定义域名解决 |
| ~~Google Fonts 大陆访问不稳~~ | **v2 已消除**：9 个 woff2 全部自托管 |
| 未优化 PNG（~15MB） | 保像素级忠实度保留；WebP + lazy loading 列为后续可选优化 |
| 无 robots/sitemap/og | 原站即无，忠实保留；列为后续可选增补 |
| 首次推送 ~15MB 从国内可能慢 | 失败重试/代理重推即可 |
| Node 25 非 LTS | wrangler 4.143 已验证可用；长期建议 Node 24 LTS（非阻塞） |

## 七、交付物

1. 线上站点：`https://jevik-site.<子域>.workers.dev`（Phase D 完成后）
2. GitHub 私有仓库（push 即自动部署）（Phase C 完成后）
3. 本计划文档（即本文件，作者：Jevon）
4. 后续自定义指引：替换个人信息/图片、绑自定义域名、可选性能优化清单
