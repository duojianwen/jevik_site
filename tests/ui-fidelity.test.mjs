/**
 * 设计图忠实复刻的静态回归检查。
 *
 * 这些断言锁定当前确认的默认语言、导航行为和基准外动效边界：
 * 英文默认、static 导航(随页面滚出,不吸顶)、菜单在流内均衡分布
 * (不做绝对居中,避免视觉贴右)、无额外的按钮涟漪效果。
 * 2026-09-30 经朵教主确认:去掉 sticky 吸顶与绝对居中。
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const ROOT = new URL("../", import.meta.url);
const PAGES = [
  "index.html",
  "about.html",
  "home-alt.html",
  "projects.html",
  "project-detail.html",
  "blog.html",
  "article.html",
  "contact.html",
];

async function readProjectFile(path) {
  return readFile(new URL(path, ROOT), "utf8");
}

test("all pages retain an English default and expose the bilingual switch", async () => {
  for (const page of PAGES) {
    const content = await readProjectFile(page);
    assert.match(content, /<html lang="en">/);
    assert.match(content, /class="lang-switch/);
  }
});

test("shared navigation declares every primary destination once", async () => {
  const script = await readProjectFile("assets/js/main.js");

  for (const destination of ["index.html", "home-alt.html", "projects.html", "blog.html", "about.html", "contact.html"]) {
    assert.match(script, new RegExp(destination.replace(".", "\\.")));
  }
});

test("navigation stays neutral: no current-page highlight anywhere", async () => {
  // 2026-09-30 朵教主决策:当前页高亮定位功能移除(实时与静态),导航词条一律中性
  const script = await readProjectFile("assets/js/main.js");
  assert.doesNotMatch(script, /SECTION_OF/);
  assert.doesNotMatch(script, /classList\.add\("on"\)/);

  const css = await readProjectFile("assets/css/main.css");
  assert.doesNotMatch(css, /\.nav-links a\.on/);
  assert.doesNotMatch(css, /\.nav-tab\.on/);
  assert.doesNotMatch(css, /\.nav-dots a\.on/);
  assert.match(css, /\.pill\.active\{background:var\(--grad\)/, "filter pills keep their active state");

  for (const page of PAGES) {
    const content = await readProjectFile(page);
    assert.doesNotMatch(content, /<a [^>]*class="[^"]*\bon\b[^"]*"[^>]*data-i18n="nav\./, `${page}: no static nav highlight`);
    assert.doesNotMatch(content, /<a class="(nav-tab|pill) (on|active)"/, `${page}: no tab/pill nav highlight`);
  }
});

test("desktop navigation keeps its menu in flow and preserves a dimensional surface", async () => {
  const css = await readProjectFile("assets/css/main.css");
  // 菜单保持在 flex 流内(space-between 均衡分布),不做绝对居中
  assert.match(css, /\.nav \.nav-links\{gap:8px;text-transform:none/);
  assert.doesNotMatch(css, /\.nav \.nav-links\{position:absolute;left:50%/);
  assert.match(css, /\.nav \.nav-inner::before/);
});

test("navigation is static and scrolls away, with an enabled language switch and click feedback", async () => {
  const css = await readProjectFile("assets/css/main.css");
  const script = await readProjectFile("assets/js/main.js");

  assert.match(css, /\.nav\{position:static;margin:0 auto;max-width:1220px\}/);
  assert.doesNotMatch(css, /\.nav\{position:sticky/);
  assert.doesNotMatch(css, /\.lang-switch\{display:none!important\}/);
  assert.match(css, /\.nav-links a::after/);
  assert.match(script, /data-lang/);
});

test("the language switch preserves a selected language and defaults to English", async () => {
  const i18n = await readProjectFile("assets/js/i18n.js");

  assert.match(i18n, /localStorage\.getItem\(KEY\)\|\|"en"/);
});

test("hero typography and responsive breakpoints protect against oversized first screens", async () => {
  const css = await readProjectFile("assets/css/main.css");

  assert.match(css, /\.hero-home h1\{font-size:clamp\(64px,8vw,104px\)/);
  assert.match(css, /\.hero-art\{position:relative;min-height:340px/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\) minmax\(0,\.85fr\)/);
  assert.match(css, /\.hero-home > \*\{min-width:0\}/);
  assert.match(css, /@media\(max-width:1100px\)/);
  assert.match(css, /@media\(min-width:1101px\) and \(max-width:1440px\)/);
  assert.doesNotMatch(css, /hero-home \.role\{white-space:nowrap/);
});

test("brand displays bilingually as 杰维克 Jevik on every page", async () => {
  for (const page of PAGES) {
    const content = await readProjectFile(page);
    assert.match(content, /class="nav-logo"/, `${page}: unified nav-logo`);
    assert.match(content, /class="brand-zh">杰维克</, `${page}: brand-zh`);
    assert.match(content, /class="brand-en">Jevik</, `${page}: brand-en`);
    assert.match(content, /class="cube"/, `${page}: explicit cube svg`);
    assert.doesNotMatch(content, /logo-3d/, `${page}: legacy logo-3d removed`);
  }
});

test("footer copyright is unified across pages", async () => {
  for (const page of PAGES) {
    const content = await readProjectFile(page);
    assert.match(content, /© 2026 杰维克 Jevik/, `${page}: footer brand`);
  }
});

test("head meta carries the bilingual brand", async () => {
  for (const page of PAGES) {
    const content = await readProjectFile(page);
    assert.match(content, /og:site_name" content="杰维克 Jevik"/, `${page}: og:site_name`);
  }
  const i18n = await readProjectFile("assets/js/i18n.js");
  // 两语言段的 meta.homeT 品牌段同值(双语恒显,切换无跳变)
  const matches = i18n.match(/"meta\.homeT":"杰维克 Jevik — /g) ?? [];
  assert.equal(matches.length, 2, "meta.homeT bilingual in both en and zh");
});

test("font stacks declare explicit CJK fallbacks and legacy hacks are gone", async () => {
  const css = await readProjectFile("assets/css/main.css");
  assert.match(css, /--font-d:"Sora","PingFang SC","Hiragino Sans GB","Microsoft YaHei"/);
  assert.match(css, /--font-b:"Inter","PingFang SC"/);
  assert.doesNotMatch(css, /:not\(:has\(svg\)\)/);
  assert.doesNotMatch(css, /\.hero-chrome \.mega\{/);
});

test("content pages share the contact-style hero: gradient title, centered lede, no EN wordmark", async () => {
  const css = await readProjectFile("assets/css/main.css");
  // 2026-09-30 决策:五页顶部统一 contact 风格,英文字距字标(ph-en/mega-en)移除
  assert.match(css, /\.page-hero h1,\.hero-chrome h1\{font-size:clamp\(34px,3\.6vw,60px\)/);
  for (const page of ["projects.html", "blog.html", "about.html", "home-alt.html", "contact.html"]) {
    const content = await readProjectFile(page);
    assert.match(content, /class="[^"]*chrome-text[^"]*"/, `${page}: chrome-text hero title`);
    assert.doesNotMatch(content, /ph-en|mega-en/, `${page}: EN wordmark removed`);
  }
});

test("contact message form uses a calm, readable form hierarchy", async () => {
  const css = await readProjectFile("assets/css/main.css");

  // 标签必须在输入框上方的正常文档流中，避免旧版“悬浮小标签”割裂输入区。
  assert.match(css, /\.form-card \.f-field label\{position:static;display:block/);
  assert.match(css, /\.form-card \.f-field input,\.form-card \.f-field textarea\{[\s\S]*background:#f8faff/);
  assert.match(css, /\.form-card \.f-field input:focus,\.form-card \.f-field textarea:focus\{[\s\S]*box-shadow:0 0 0 3px/);
  assert.match(css, /\.form-card \.btn-send\{[\s\S]*border-radius:14px/);
});

test("home contact strip separates the invitation from the contact actions", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("assets/css/main.css");
  assert.match(html, /class="contact-strip-inner"/);
  assert.match(css, /\.contact-strip-inner\{display:grid;grid-template-columns:minmax\(0,\.72fr\) minmax\(0,1\.28fr\)/);
  assert.match(css, /\.home-social-grid\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)/);
  assert.match(css, /\.contact-strip \.social-card\{[^}]*box-shadow:none/);
});
