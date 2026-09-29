/* Jevik site i18n — English / Chinese dictionary.
   Usage: elements carry data-i18n="key"; placeholders use data-i18n-ph="key";
   meta attributes use data-i18n + data-i18n-attr="content".
   Language persists in localStorage["jevik-lang"]; default "en". */

window.JEVIK_I18N = {
en: {
  "meta.title.index": "Jevik — Backend × LLM Engineer",
  "meta.desc.index": "Jevik builds reliable backend systems and LLM-powered products: RAG, agents, workflow orchestration.",
  "meta.title.projects": "Projects — Jevik",
  "meta.desc.projects": "Selected projects by Jevik: AI agents, RAG systems, backend services, automation.",
  "meta.title.detail": "AIOps Agent — Jevik",
  "meta.desc.detail": "Case study: AIOps Agent — autonomous incident triage, root-cause analysis, report drafting.",
  "meta.title.blog": "Blog — Jevik",
  "meta.desc.blog": "Notes on engineering, systems, and building better software — written by Jevik.",
  "meta.title.article": "RAG in Production: What Actually Breaks — Jevik",
  "meta.desc.article": "Chunking, retrieval, evals — the unglamorous parts that decide whether your RAG survives real users.",
  "meta.title.about": "About — Jevik",
  "meta.desc.about": "About Jevik: backend engineer working on LLM applications — RAG, agents, workflow orchestration.",
  "meta.title.contact": "Contact — Jevik",
  "meta.desc.contact": "Get in touch with Jevik — open for freelance and collaborations.",

  "nav.about": "About", "nav.projects": "Projects", "nav.blog": "Blog", "nav.contact": "Contact",
  "nav.home": "Home", "nav.work": "Work", "nav.overview": "Overview", "nav.articles": "Articles",
  "nav.about_u": "About", "nav.projects_u": "Projects", "nav.blog_u": "Blog", "nav.contact_u": "Contact",
  "nav.hire": "Hire Me", "nav.getintouch": "Get in Touch", "nav.contact2": "Contact",

  "hero.role": "Backend × LLM Engineer",
  "hero.desc": "I build reliable backend systems and LLM-powered products — RAG, agents, and workflow orchestration that survive production.",
  "hero.view": "View Projects", "hero.touch": "Get in Touch", "hero.touch2": "Get in Touch",
  "hero.chip": "Open for collaborations",

  "home.sec_projects": "Projects", "home.viewall": "View all",
  "home.p1cat": "AI · Agent", "home.p1t": "AIOps Agent",
  "home.p1d": "An autonomous agent that triages alerts, finds root causes, and drafts incident reports.",
  "home.p2cat": "Automation", "home.p2t": "Content Pipeline",
  "home.p2d": "From idea to published post — an automated pipeline for content creation and distribution.",
  "home.p3cat": "RAG", "home.p3t": "Knowledge Base",
  "home.p3d": "Local-first knowledge base with hybrid retrieval for fast, grounded answers.",
  "home.sec_articles": "Articles", "home.allarticles": "All articles",
  "home.a1date": "Sep 2026 · 8 min read", "home.a1t": "RAG in Production: What Actually Breaks",
  "home.a1d": "Chunking, retrieval, evals — the unglamorous parts that decide whether your RAG survives real users.",
  "home.a2date": "Aug 2026 · 6 min read", "home.a2t": "Building Agents That Don't Hallucinate Their Tools",
  "home.a2d": "Guardrails, schemas, and verification loops for agents you can actually trust.",
  "home.a3date": "Jul 2026 · 10 min read", "home.a3t": "My Content Automation Pipeline, End to End",
  "home.a3d": "How I turned scattered ideas into a daily publishing pipeline with a few Python scripts.",
  "home.sec_contact": "Contact",
  "home.contact_lead": "Let's work together — open for freelance & collabs.",

  "footer.tag": "Designed & hand-coded with care",
  "footer.tag2": "Crafted with precision",
  "footer.tag3": "Built with focus on performance & clarity",

  "projects.eyebrow": "Selected work", "projects.title": "Projects",
  "projects.sub": "A curated collection of builds, experiments, and products — designed & engineered with focus on performance, usability, and clean architecture.",
  "projects.filter": "FILTER:", "projects.f_all": "All", "projects.f_agent": "AI Agent",
  "projects.f_rag": "RAG", "projects.f_backend": "Backend", "projects.f_auto": "Automation",
  "projects.p1t": "AIOps Agent",
  "projects.p1d": "Autonomous incident triage: alert noise reduction, root-cause analysis, and report drafting.",
  "projects.p2t": "Content Pipeline",
  "projects.p2d": "Idea → draft → publish, fully automated across X and Xiaohongshu.",
  "projects.p3t": "Knowledge Base",
  "projects.p3d": "Hybrid retrieval over local documents with grounded citations and fast answers.",
  "projects.p4t": "API Gateway",
  "projects.p4d": "Microservice gateway with auth, rate limiting, and end-to-end observability.",
  "projects.p5t": "Doc QA Assistant",
  "projects.p5d": "Ask questions over your documents, get answers with sources attached.",
  "projects.p6t": "Deploy Toolbox",
  "projects.p6d": "One-command packaging, release, and rollback tooling for backend services.",
  "projects.count": "6 Projects",

  "detail.eyebrow": "Project showcase · Case study", "detail.title": "AIOps Agent",
  "detail.desc": "An autonomous agent for production incidents: it triages alert storms, traces root causes across services, and drafts the incident report before you finish your coffee.",
  "detail.gallery": "Screenshot Gallery", "detail.gallery_sub": "Key interfaces designed for clarity and speed",
  "detail.g1t": "Alert Triage", "detail.g1d": "Noise reduction & severity ranking",
  "detail.g2t": "Root-Cause Graph", "detail.g2d": "Tracing faults across services",
  "detail.g3t": "Incident Report", "detail.g3d": "Auto-drafted, human-approved",
  "detail.s1": "Alert noise reduced", "detail.s2": "Root-cause time",
  "detail.s3": "Always watching", "detail.s4": "Report coverage",
  "detail.role": "Role: Backend × LLM Engineer", "detail.role2": "Design & Engineering",
  "detail.t1": "Agent Design", "detail.t2": "RAG", "detail.t3": "Production Hardening",

  "blog.title": "Insights for modern developers",
  "blog.sub": "Thoughts on engineering, systems, and building better software — written by Jevik",
  "blog.f_all": "All", "blog.f_ai": "AI", "blog.f_backend": "Backend",
  "blog.f_rag": "RAG", "blog.f_devops": "DevOps",
  "blog.featured": "Featured post", "blog.feat_t": "RAG in Production: What Actually Breaks",
  "blog.feat_meta": "Sep 2026 · 8 min read",
  "blog.feat_d": "Chunking, retrieval, evals — the unglamorous parts that decide whether your RAG survives real users. Notes from the trenches.",
  "blog.read": "Read article", "blog.latest": "Latest Articles",
  "blog.c_ai": "AI", "blog.a1t": "Building Agents That Don't Hallucinate Their Tools",
  "blog.a1m": "Aug 2026 · 6 min read",
  "blog.c_backend": "Backend", "blog.a2t": "Designing APIs That Survive Version Three",
  "blog.a2m": "Jul 2026 · 7 min read",
  "blog.c_rag": "RAG", "blog.a3t": "Hybrid Search: When BM25 Beats Vectors",
  "blog.a3m": "Jun 2026 · 5 min read",
  "blog.c_devops": "DevOps", "blog.a4t": "My Content Automation Pipeline, End to End",
  "blog.a4m": "May 2026 · 10 min read",

  "article.kicker": "RAG · Production notes",
  "article.title": "RAG in Production: What Actually Breaks",
  "article.role": "Engineer", "article.date": "Sep 2026", "article.read": "8 min read",
  "article.p1": "Demos make RAG look easy: chunk some docs, embed them, wrap it in a chat UI, done. Production is where the demo goes to die — on weird PDFs, on questions nobody predicted, on retrieval that confidently returns the wrong paragraph.",
  "article.p2": "After shipping a few of these systems, I've learned the failures cluster in three places: chunking, retrieval, and evaluation. Get those right and everything else is polish. Get them wrong and no prompt trick will save you.",
  "article.quote": "Retrieval quality is a data problem wearing a model costume. Fix the corpus before you tune the prompt.",
  "article.h2": "Start with the corpus, not the model",
  "article.p3": "Most broken RAG systems I see don't have a model problem — they have a garbage-in problem. Scanned PDFs with mangled tables, duplicated Confluence pages, five versions of the same runbook. The retriever dutifully returns junk, and the model dutifully summarizes it.",
  "article.p4": "Structure-aware chunking with overlap beats naive fixed-size splits almost every time. And metadata — source, section, date — is what lets you filter and cite instead of guessing.",
  "article.p5": "Next: hybrid retrieval. Pure vector search misses exact terms; pure keyword search misses meaning. Combine them, rerank the top candidates, and measure everything with a small golden eval set. If you can't measure a change, you can't ship it.",
  "article.prev": "← Previous",
  "article.prev_t": "Building Agents That Don't Hallucinate Their Tools",
  "article.prev_d": "Guardrails, schemas, and verification loops.",
  "article.next": "Next article →",
  "article.next_t": "Hybrid Search: When BM25 Beats Vectors",
  "article.next_d": "Old-school keyword search still earns its place.",

  "about.tags": "DEVELOPER — BUILDER — OPEN SOURCE", "about.title": "ABOUT",
  "about.bio1": "I'm Jevik, a backend engineer working on LLM applications — RAG, agents, and workflow orchestration. I care about systems that survive production: clean architecture, honest evals, and boring reliability.",
  "about.bio2": "Day to day I work with Java Spring Cloud microservices and Python LLM stacks. On the side I build in public: automation pipelines, AIOps experiments, and notes from the trenches.",
  "about.timeline": "CAREER TIMELINE",
  "about.t1t": "Independent Engineer · LLM Applications",
  "about.t1d": "Shipping RAG systems, agents, and content automation — building in public.",
  "about.t2t": "Backend Engineer · Microservices",
  "about.t2d": "Java Spring Cloud services: APIs, gateways, and the observability to keep them honest.",
  "about.t3t": "Software Engineer · Backend",
  "about.t3d": "Core backend APIs in Python; CI/CD pipelines and reliability work.",
  "about.skills": "SKILLS",
  "about.foot": "Available for freelance & collaborations",

  "contact.dev": "developer · Jevik",
  "contact.title": "Let's Build Something Great Together",
  "contact.sub": "Have a project in mind or want to collaborate? Drop me a message and I'll get back to you within 24 hours.",
  "contact.info": "Contact Info", "contact.email_k": "Email",
  "contact.loc_k": "Location", "contact.loc_v": "Remote · UTC+8",
  "contact.social": "Social Links",
  "contact.avail_k": "Availability Status",
  "contact.avail_v": "Available for freelance work",
  "contact.avail_s": "Open to new projects · Typical response: within 24h",
  "contact.form_t": "Send a Message",
  "contact.f_name": "Your Name", "contact.f_name_ph": "e.g. Alex Morgan",
  "contact.f_email": "Email Address",
  "contact.f_msg": "Your Message",
  "contact.f_msg_ph": "Tell me about your project, goals, timeline, or any questions...",
  "contact.send": "Send Message",
  "contact.note": "I usually reply within 24 hours. No spam, ever.",
  "contact.lock": "🔒 Your information is protected & confidential",

  "form.empty": "Please fill in your name, email, and message.",
  "form.sent": "Your email client is opening — just hit send."
},
zh: {
  "meta.title.index": "Jevik — 后端 × LLM 工程师",
  "meta.desc.index": "Jevik 构建可靠的后端系统与 LLM 应用：RAG、Agent、工作流编排。",
  "meta.title.projects": "项目 — Jevik",
  "meta.desc.projects": "Jevik 的精选项目：AI Agent、RAG 系统、后端服务、自动化。",
  "meta.title.detail": "AIOps Agent — Jevik",
  "meta.desc.detail": "案例：AIOps Agent——自主告警分诊、根因定位、报告起草。",
  "meta.title.blog": "博客 — Jevik",
  "meta.desc.blog": "关于工程、系统与构建更好软件的思考——Jevik 执笔。",
  "meta.title.article": "RAG 落地：真正会挂的地方 — Jevik",
  "meta.desc.article": "切分、检索、评估——这些不性感的环节决定你的 RAG 能不能活过真实用户。",
  "meta.title.about": "关于 — Jevik",
  "meta.desc.about": "关于 Jevik：做 LLM 应用的后端工程师——RAG、Agent、工作流编排。",
  "meta.title.contact": "联系 — Jevik",
  "meta.desc.contact": "联系 Jevik——接受 freelance 与合作。",

  "nav.about": "关于", "nav.projects": "项目", "nav.blog": "博客", "nav.contact": "联系",
  "nav.home": "首页", "nav.work": "作品", "nav.overview": "概览", "nav.articles": "文章",
  "nav.about_u": "关于", "nav.projects_u": "项目", "nav.blog_u": "博客", "nav.contact_u": "联系",
  "nav.hire": "找我合作", "nav.getintouch": "联系我", "nav.contact2": "联系",

  "hero.role": "后端 × LLM 工程师",
  "hero.desc": "我构建可靠的后端系统与 LLM 应用——RAG、Agent、工作流编排，全部经受过生产环境的检验。",
  "hero.view": "浏览项目", "hero.touch": "联系我", "hero.touch2": "联系我",
  "hero.chip": "接受合作邀约",

  "home.sec_projects": "项目", "home.viewall": "查看全部",
  "home.p1cat": "AI · Agent", "home.p1t": "AIOps Agent",
  "home.p1d": "自主运维 Agent：告警降噪、根因定位、事故报告一气呵成。",
  "home.p2cat": "自动化", "home.p2t": "内容生产流水线",
  "home.p2d": "从灵感到发布——内容创作与分发的全自动流水线。",
  "home.p3cat": "RAG", "home.p3t": "本地知识库",
  "home.p3d": "本地优先的知识库，混合检索，答案又快又有据可查。",
  "home.sec_articles": "文章", "home.allarticles": "全部文章",
  "home.a1date": "2026年9月 · 阅读8分钟", "home.a1t": "RAG 落地：真正会挂的地方",
  "home.a1d": "切分、检索、评估——这些不性感的环节决定你的 RAG 能不能活过真实用户。",
  "home.a2date": "2026年8月 · 阅读6分钟", "home.a2t": "构建不会对工具产生幻觉的 Agent",
  "home.a2d": "护栏、Schema、校验循环，打造真正可信的 Agent。",
  "home.a3date": "2026年7月 · 阅读10分钟", "home.a3t": "我的内容自动化流水线全记录",
  "home.a3d": "几个 Python 脚本，把零散灵感变成每日更新的发布流水线。",
  "home.sec_contact": "联系",
  "home.contact_lead": "一起做点有意思的——接受 freelance 与合作。",

  "footer.tag": "精心设计与手写代码",
  "footer.tag2": "精雕细琢",
  "footer.tag3": "专注性能与清晰",

  "projects.eyebrow": "精选作品", "projects.title": "项目",
  "projects.sub": "一系列构建、实验与产品——为性能、可用性与干净架构而设计和打磨。",
  "projects.filter": "筛选：", "projects.f_all": "全部", "projects.f_agent": "AI Agent",
  "projects.f_rag": "RAG", "projects.f_backend": "后端", "projects.f_auto": "自动化",
  "projects.p1t": "AIOps Agent",
  "projects.p1d": "自主事故响应：告警降噪、根因分析、报告起草。",
  "projects.p2t": "内容生产流水线",
  "projects.p2d": "灵感 → 草稿 → 发布，在 X 与小红书全自动跑通。",
  "projects.p3t": "本地知识库",
  "projects.p3d": "本地文档的混合检索，答案附带引用来源。",
  "projects.p4t": "API 网关",
  "projects.p4d": "微服务网关：鉴权、限流、全链路可观测。",
  "projects.p5t": "文档问答助手",
  "projects.p5d": "对着文档提问，答案自带出处。",
  "projects.p6t": "发布工具箱",
  "projects.p6d": "后端服务的一键打包、发布与回滚工具。",
  "projects.count": "6 个项目",

  "detail.eyebrow": "项目展示 · 案例", "detail.title": "AIOps Agent",
  "detail.desc": "为生产事故打造的自主 Agent：收敛告警风暴、跨服务追踪根因、在你咖啡还没喝完之前起草好事故报告。",
  "detail.gallery": "截图画廊", "detail.gallery_sub": "为清晰与速度而设计的关键界面",
  "detail.g1t": "告警分诊", "detail.g1d": "降噪与严重度排序",
  "detail.g2t": "根因图谱", "detail.g2d": "跨服务故障追踪",
  "detail.g3t": "事故报告", "detail.g3d": "自动起草、人工确认",
  "detail.s1": "告警噪声降低", "detail.s2": "根因定位时间",
  "detail.s3": "全天候值守", "detail.s4": "报告覆盖率",
  "detail.role": "角色：后端 × LLM 工程师", "detail.role2": "设计与工程",
  "detail.t1": "Agent 设计", "detail.t2": "RAG", "detail.t3": "生产级打磨",

  "blog.title": "写给现代开发者的思考",
  "blog.sub": "关于工程、系统与构建更好软件的想法——Jevik 执笔",
  "blog.f_all": "全部", "blog.f_ai": "AI", "blog.f_backend": "后端",
  "blog.f_rag": "RAG", "blog.f_devops": "DevOps",
  "blog.featured": "精选文章", "blog.feat_t": "RAG 落地：真正会挂的地方",
  "blog.feat_meta": "2026年9月 · 阅读8分钟",
  "blog.feat_d": "切分、检索、评估——这些不性感的环节决定你的 RAG 能不能活过真实用户。一线实战笔记。",
  "blog.read": "阅读全文", "blog.latest": "最新文章",
  "blog.c_ai": "AI", "blog.a1t": "构建不会对工具产生幻觉的 Agent",
  "blog.a1m": "2026年8月 · 阅读6分钟",
  "blog.c_backend": "后端", "blog.a2t": "设计能活过第三版的 API",
  "blog.a2m": "2026年7月 · 阅读7分钟",
  "blog.c_rag": "RAG", "blog.a3t": "混合检索：BM25 何时打赢向量",
  "blog.a3m": "2026年6月 · 阅读5分钟",
  "blog.c_devops": "DevOps", "blog.a4t": "我的内容自动化流水线全记录",
  "blog.a4m": "2026年5月 · 阅读10分钟",

  "article.kicker": "RAG · 生产笔记",
  "article.title": "RAG 落地：真正会挂的地方",
  "article.role": "工程师", "article.date": "2026年9月", "article.read": "阅读8分钟",
  "article.p1": "Demo 里的 RAG 看起来毫不费力：切一切文档、做个向量、套个聊天框，收工。生产环境是 Demo 的葬身之地——奇葩的 PDF、没人想到过的问题、自信满满返回错误段落的检索。",
  "article.p2": "做了几个这样的系统后，我发现故障都集中在三个地方：切分、检索、评估。这三处搞对了，其他都是抛光；搞错了，再好的 prompt 技巧也救不回来。",
  "article.quote": "检索质量是个穿着模型外衣的数据问题。先修语料，再调 prompt。",
  "article.h2": "先看语料，别先看模型",
  "article.p3": "我见过的大多数残血 RAG 都不是模型问题，是垃圾进垃圾出：表格错乱的扫描 PDF、重复的 Confluence 页面、同一份 runbook 的五个版本。检索器尽职尽责地返回垃圾，模型尽职尽责地总结它。",
  "article.p4": "按结构切分、带重叠的滑窗，几乎每次都打赢简单粗暴的定长切分。而元数据——来源、章节、日期——让你能过滤、能引用，而不是靠猜。",
  "article.p5": "接下来是混合检索：纯向量检索抓不住精确词，纯关键词检索抓不住语义。两者结合，对候选重排，再用一小份黄金评测集度量一切。度量不了的变化，就上不了线。",
  "article.prev": "← 上一篇",
  "article.prev_t": "构建不会对工具产生幻觉的 Agent",
  "article.prev_d": "护栏、Schema 与校验循环。",
  "article.next": "下一篇 →",
  "article.next_t": "混合检索：BM25 何时打赢向量",
  "article.next_d": "老派关键词检索依然有它的位置。",

  "about.tags": "开发者 — 构建者 — 开源", "about.title": "关于我",
  "about.bio1": "我是 Jevik，一名做 LLM 应用的后端工程师——RAG、Agent、工作流编排。我在乎能活过生产环境的系统：干净的架构、诚实的评估、无聊但可靠。",
  "about.bio2": "日常是 Java Spring Cloud 微服务和 Python LLM 技术栈。业余时间公开构建：自动化流水线、AIOps 实验和一线实战笔记。",
  "about.timeline": "职业时间线",
  "about.t1t": "独立工程师 · LLM 应用",
  "about.t1d": "交付 RAG 系统、Agent 与内容自动化——公开构建中。",
  "about.t2t": "后端工程师 · 微服务",
  "about.t2d": "Java Spring Cloud 服务：API、网关，以及让它们诚实的可观测性。",
  "about.t3t": "软件工程师 · 后端",
  "about.t3d": "Python 核心后端 API；CI/CD 流水线与可靠性工作。",
  "about.skills": "技能",
  "about.foot": "接受 freelance 与合作",

  "contact.dev": "开发者 · Jevik",
  "contact.title": "一起构建些了不起的东西",
  "contact.sub": "有项目想法或想合作？给我留言，24 小时内回复。",
  "contact.info": "联系方式", "contact.email_k": "邮箱",
  "contact.loc_k": "地点", "contact.loc_v": "远程 · UTC+8",
  "contact.social": "社交账号",
  "contact.avail_k": "当前状态",
  "contact.avail_v": "接受 freelance 合作",
  "contact.avail_s": "欢迎新项目 · 通常 24 小时内回复",
  "contact.form_t": "发送消息",
  "contact.f_name": "你的名字", "contact.f_name_ph": "例如：张伟",
  "contact.f_email": "邮箱地址",
  "contact.f_msg": "你的留言",
  "contact.f_msg_ph": "聊聊你的项目、目标、时间线，或任何问题……",
  "contact.send": "发送消息",
  "contact.note": "通常 24 小时内回复，绝不发垃圾邮件。",
  "contact.lock": "🔒 你的信息受到保护，严格保密",

  "form.empty": "请把名字、邮箱和留言都填一下。",
  "form.sent": "已为你打开邮件客户端，点发送即可。"
}
};

(function () {
  var KEY = "jevik-lang";

  function dict(lang) { return window.JEVIK_I18N[lang] || {}; }
  function t(key, lang) {
    var d = dict(lang);
    if (d[key] !== undefined) return d[key];
    var en = dict("en");
    return en[key] !== undefined ? en[key] : "";
  }
  function getLang() {
    try { return localStorage.getItem(KEY) || "en"; } catch (e) { return "en"; }
  }
  function apply(lang) {
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"), lang);
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"), lang);
      if (v) el.setAttribute(el.getAttribute("data-i18n-attr"), v);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-ph"), lang);
      if (v) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
    });
  }
  function setLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  window.JevikLang = {
    get: getLang, set: setLang, apply: apply,
    t: function (key) { return t(key, getLang()); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { apply(getLang()); });
  } else {
    apply(getLang());
  }
})();
