/* Jevik site interactions: language toggle, reveal-on-scroll,
   project/blog filtering, contact form (mailto). */

(function () {
  "use strict";

  function onReady(fn) {
    document.documentElement.classList.add("js");
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function t(key) {
    if (window.JevikLang && typeof window.JevikLang.t === "function") {
      return window.JevikLang.t(key);
    }
    return key;
  }

  function initLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (window.JevikLang) window.JevikLang.set(lang);
      });
    });
  }

  function initBurger() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav-float");
    if (!burger || !nav) return;
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".rv");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function initFilters() {
    document.querySelectorAll("[data-filter-group]").forEach(function (group) {
      var pills = group.querySelectorAll(".fpill");
      var list = document.querySelector(
        group.getAttribute("data-filter-group") === "projects" ? "#project-grid" : "#blog-list"
      );
      if (!list) return;
      pills.forEach(function (pill) {
        pill.addEventListener("click", function () {
          pills.forEach(function (p) { p.classList.remove("on"); });
          pill.classList.add("on");
          var f = pill.getAttribute("data-filter");
          list.querySelectorAll("[data-cat]").forEach(function (card) {
            var show = f === "all" || card.getAttribute("data-cat") === f;
            card.classList.toggle("hide", !show);
          });
        });
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var nameEl = document.getElementById("cf-name");
      var emailEl = document.getElementById("cf-email");
      var msgEl = document.getElementById("cf-msg");
      var name = nameEl ? nameEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var msg = msgEl ? msgEl.value.trim() : "";
      if (!name || !email || !msg) {
        alert(t("form.empty"));
        return;
      }
      var subject = encodeURIComponent("Website contact from " + name);
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
      window.location.href = "mailto:hello@jevik.dev?subject=" + subject + "&body=" + body;
      alert(t("form.sent"));
    });
  }

  onReady(function () {
    initLangToggle();
    initBurger();
    initReveal();
    initFilters();
    initContactForm();
  });
})();
