/* ==========================================================================
   EriStars Sports Club: site script
   - Renders the shared header, mobile drawer and footer on every page
   - Renders structured content (assets/data/*.js) into [data-render] slots
   - Navigation, dropdowns, lightbox and contact-form behaviour
   No build step and no dependencies: works on GitHub Pages and from disk.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.ERISTARS || {};
  var SITE = D.site || {};
  var IMAGES = D.images || {};
  var page = document.body.getAttribute("data-page") || "";

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function param(name) { return new URLSearchParams(window.location.search).get(name); }

  function formatDate(iso) {
    if (!iso) return "";
    var parts = iso.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2] || 1);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  /* Responsive <img> from the image library (assets/data/images.js). */
  function img(key, opts) {
    opts = opts || {};
    var im = IMAGES[key];
    if (!im) return "";
    return '<img src="' + esc(im.src) + '"' +
      (im.srcset ? ' srcset="' + esc(im.srcset) + '" sizes="' + esc(opts.sizes || "100vw") + '"' : "") +
      ' alt="' + esc(opts.alt != null ? opts.alt : im.alt) + '"' +
      ' width="' + im.width + '" height="' + im.height + '"' +
      (opts.eager ? "" : ' loading="lazy"') + ' decoding="async"' +
      (opts.position ? ' style="object-position:' + esc(opts.position) + '"' : "") + ">";
  }

  /* ------------------------------------------------------------------ */
  /* Icons (inline SVG, inherit currentColor)                            */
  /* ------------------------------------------------------------------ */
  var P = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    mail: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    news: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M4 4h13v16H6a2 2 0 0 1-2-2V4zM17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h3"/></svg>',
    users: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><path d="m11 17 2 2a1 1 0 0 0 3-3M14 14l2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 0 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a4 4 0 0 0 2.8.5L21 3M21 3v9M3 3l1 1M3 13l6.5 6.5a1 1 0 0 0 3-3"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 13l2 2 4-4"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2.4V2.1L14.2 2C10.7 2 10 4.6 10 6.3v2.2H7.5v3.8H10V22h4v-9.7h3.1l.4-3.8H14z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>'
  };
  ERISTARS.icon = ICON;

  var SOCIAL_LABELS = { facebook: "Facebook", x: "X (Twitter)", youtube: "YouTube", instagram: "Instagram" };

  function socialLinks() {
    var s = SITE.social || {};
    var items = Object.keys(SOCIAL_LABELS).filter(function (k) { return s[k]; }).map(function (k) {
      return '<li><a href="' + esc(s[k]) + '" target="_blank" rel="noopener" aria-label="EriStars on ' + SOCIAL_LABELS[k] + ' (opens in a new tab)">' + ICON[k] + "</a></li>";
    });
    return items.length ? '<ul class="social-links" role="list">' + items.join("") + "</ul>" : "";
  }

  function registerHref() { return "register.html"; }

  /* ------------------------------------------------------------------ */
  /* Header, drawer, footer                                              */
  /* ------------------------------------------------------------------ */
  function isCurrent(item) {
    if (item.page === page) return true;
    return (item.children || []).some(function (c) { return c.page && c.page === page; });
  }

  function renderHeader() {
    var slot = $("[data-site-header]");
    if (!slot) return;
    var nav = D.nav || [];

    var desktop = nav.map(function (item, i) {
      var current = isCurrent(item);
      var aria = item.page === page ? ' aria-current="page"' : "";
      if (!item.children) {
        return '<li class="nav-item"><a class="nav-link' + (current ? " is-current" : "") + '" href="' + esc(item.href) + '"' + aria + ">" + esc(item.label) + "</a></li>";
      }
      var id = "dd-" + i;
      var sub = item.children.map(function (c) {
        var ca = c.page && c.page === page ? ' aria-current="page"' : "";
        return '<li><a href="' + esc(c.href) + '"' + ca + ">" + esc(c.label) + "</a></li>";
      }).join("");
      return '<li class="nav-item has-dropdown">' +
        '<a class="nav-link' + (current ? " is-current" : "") + '" href="' + esc(item.href) + '"' + aria + '>' + esc(item.label) + "</a>" +
        '<button class="nav-link dd-toggle" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="visually-hidden">' + esc(item.label) + " menu</span>" + ICON.chevron + "</button>" +
        '<ul class="dropdown" id="' + id + '">' + sub + "</ul></li>";
    }).join("");

    var mobile = nav.map(function (item, i) {
      var current = isCurrent(item);
      if (!item.children) {
        return '<li><a class="drawer-link" href="' + esc(item.href) + '"' + (current ? ' aria-current="page"' : "") + ">" + esc(item.label) + "</a></li>";
      }
      var id = "dm-" + i;
      var overview = item.children.some(function (c) { return c.href === item.href; }) ? "" :
        '<li><a href="' + esc(item.href) + '"' + (item.page === page ? ' aria-current="page"' : "") + ">" + esc(item.label) + " overview</a></li>";
      var sub = item.children.map(function (c) {
        return '<li><a href="' + esc(c.href) + '"' + (c.page && c.page === page ? ' aria-current="page"' : "") + ">" + esc(c.label) + "</a></li>";
      }).join("");
      return '<li><button class="drawer-toggle' + (current ? " is-current" : "") + '" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        esc(item.label) + ICON.chevron + '</button><ul class="drawer-sub" id="' + id + '" hidden>' + overview + sub + "</ul></li>";
    }).join("");

    slot.outerHTML =
      '<header class="site-header" id="site-header">' +
        '<div class="container header-inner">' +
          '<a class="brand" href="index.html" aria-label="EriStars Sports Club home">' +
            '<img src="assets/images/logo-light.png" alt="EriStars Sports Club" width="480" height="225">' +
          "</a>" +
          '<nav class="primary-nav" aria-label="Main"><ul class="nav-list">' + desktop + "</ul></nav>" +
          '<div class="header-actions">' +
            '<a class="btn btn--sm header-register" href="' + registerHref() + '">Register</a>' +
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">' + ICON.menu + "</button>" +
          "</div>" +
        "</div>" +
      "</header>" +
      '<div class="drawer" id="drawer" aria-hidden="true">' +
        '<div class="drawer-backdrop" data-close-drawer></div>' +
        '<div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">' +
          '<div class="drawer-head">' +
            '<img src="assets/images/logo-light.png" alt="EriStars Sports Club" width="480" height="225">' +
            '<button class="menu-toggle" type="button" data-close-drawer aria-label="Close menu">' + ICON.close + "</button>" +
          "</div>" +
          '<nav class="drawer-body" aria-label="Mobile"><ul class="drawer-nav">' + mobile + "</ul></nav>" +
          '<div class="drawer-foot"><a class="btn" href="' + registerHref() + '">Register</a></div>' +
        "</div>" +
      "</div>";
  }

  function renderFooter() {
    var slot = $("[data-site-footer]");
    if (!slot) return;
    var year = new Date().getFullYear();
    var contact = [];
    if (SITE.email) contact.push('<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>");
    if (SITE.phone) contact.push('<a href="tel:' + esc(SITE.phone.replace(/[^\d+]/g, "")) + '">' + esc(SITE.phone) + "</a>");
    contact.push("<span>Based in " + esc(SITE.baseCity) + "</span>");
    contact.push("<span>Serving the DMV: D.C., Maryland &amp; Virginia</span>");
    contact.push('<a href="contact.html">Send us a message</a>');

    slot.outerHTML =
      '<footer class="site-footer">' +
        '<div class="stripe stripe--full"><span></span></div>' +
        '<div class="container footer-top">' +
          '<div class="footer-brand">' +
            '<img src="assets/images/logo-light.png" alt="EriStars Sports Club" width="480" height="225" loading="lazy">' +
            '<p class="footer-tagline">' + esc(SITE.tagline) + "</p>" +
            "<p>A community youth soccer organization founded in " + esc(SITE.founded) + ", developing athletes, students and leaders across the DMV.</p>" +
            '<div class="mt-5">' + socialLinks() + "</div>" +
          "</div>" +
          '<div class="footer-col"><h2>Club</h2><ul>' +
            '<li><a href="about.html">About EriStars</a></li>' +
            '<li><a href="teams.html">Teams</a></li>' +
            '<li><a href="news.html">News</a></li>' +
            '<li><a href="locations.html">Field Locations</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h2>Programs</h2><ul>' +
            (D.programs || []).map(function (p) { return '<li><a href="' + esc(p.link) + '">' + esc(p.name) + "</a></li>"; }).join("") +
            '<li><a href="register.html">Registration</a></li>' +
            '<li><a href="get-involved.html">Get Involved</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h2>Contact</h2><address>' + contact.join("") + "</address></div>" +
        "</div>" +
        '<div class="container footer-bottom">' +
          '<div class="footer-legal">' +
            "<span>© " + year + " " + esc(SITE.name) + ". Operated by " + esc(SITE.legalName) + "</span>" +
            '<span class="footer-credit">Developed by <a href="https://www.lomisolutions.com/" target="_blank" rel="noopener">LomiSolutions<span class="visually-hidden"> (opens in a new tab)</span></a></span>' +
          "</div>" +
          '<span>“' + esc(SITE.motto) + "”</span>" +
        "</div>" +
      "</footer>";
  }

  /* ---- Header behaviour: transparent over the home hero ---- */
  function initHeaderScroll() {
    var header = $("#site-header");
    if (!header) return;
    var hasHero = document.body.classList.contains("has-hero");
    function update() {
      var scrolled = window.scrollY > 24;
      header.classList.toggle("is-scrolled", scrolled);
      if (hasHero) header.classList.toggle("is-transparent", !scrolled);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---- Desktop dropdowns: hover + click + keyboard ---- */
  function initDropdowns() {
    var items = $$(".nav-item.has-dropdown");
    function close(item, returnFocus) {
      item.classList.remove("is-open");
      var btn = $(".dd-toggle", item);
      btn.setAttribute("aria-expanded", "false");
      if (returnFocus) btn.focus();
    }
    function closeAll(except) { items.forEach(function (it) { if (it !== except) close(it); }); }
    function open(item) {
      closeAll(item);
      item.classList.add("is-open");
      $(".dd-toggle", item).setAttribute("aria-expanded", "true");
    }
    var hoverCapable = window.matchMedia("(hover: hover)").matches;
    items.forEach(function (item) {
      var btn = $(".dd-toggle", item);
      var timer;
      btn.addEventListener("click", function () {
        item.classList.contains("is-open") ? close(item) : open(item);
      });
      if (hoverCapable) {
        item.addEventListener("mouseenter", function () { clearTimeout(timer); open(item); });
        item.addEventListener("mouseleave", function () { timer = setTimeout(function () { close(item); }, 160); });
      }
      item.addEventListener("keydown", function (e) {
        var links = $$(".dropdown a", item);
        var idx = links.indexOf(document.activeElement);
        if (e.key === "Escape") { close(item, true); }
        else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!item.classList.contains("is-open")) open(item);
          (links[idx + 1] || links[0]).focus();
        } else if (e.key === "ArrowUp" && idx > -1) {
          e.preventDefault();
          (links[idx - 1] || btn).focus();
        }
      });
      item.addEventListener("focusout", function (e) {
        if (!item.contains(e.relatedTarget)) close(item);
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-item.has-dropdown")) closeAll();
    });
  }

  /* ---- Mobile drawer ---- */
  function initDrawer() {
    var drawer = $("#drawer");
    var openBtn = $(".header-actions .menu-toggle");
    if (!drawer || !openBtn) return;
    var panel = $(".drawer-panel", drawer);

    function focusables() {
      return $$('a[href], button:not([disabled])', panel).filter(function (el) { return el.offsetParent !== null; });
    }
    function open() {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
      setTimeout(function () { $("[data-close-drawer].menu-toggle", drawer).focus(); }, 50);
    }
    function close() {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
      openBtn.focus();
    }
    openBtn.addEventListener("click", open);
    $$("[data-close-drawer]", drawer).forEach(function (el) { el.addEventListener("click", close); });
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$(".drawer-toggle", drawer).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        document.getElementById(btn.getAttribute("aria-controls")).hidden = expanded;
      });
    });
    // Close the drawer when following an in-page anchor
    $$(".drawer-body a", drawer).forEach(function (a) {
      a.addEventListener("click", function () {
        if (a.pathname === window.location.pathname) close();
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1100 && drawer.classList.contains("is-open")) close();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Reusable content components                                         */
  /* ------------------------------------------------------------------ */
  function emptyState(o) {
    return '<div class="empty-state">' +
      '<span class="empty-state-icon">' + (ICON[o.icon] || ICON.calendar) + "</span>" +
      "<h3>" + esc(o.title) + "</h3>" +
      "<p>" + o.text + "</p>" +
      (o.actions ? '<div class="btn-row">' + o.actions + "</div>" : "") +
      "</div>";
  }

  function contactAction(label) {
    return '<a class="btn btn--outline btn--sm" href="contact.html">' + esc(label || "Contact the club") + "</a>";
  }

  function programCard(p, i) {
    var media = p.image
      ? '<div class="program-card-media">' + img(p.image, { sizes: "(min-width:1100px) 25vw, (min-width:700px) 50vw, 100vw", position: p.imagePosition, alt: "" }) + "</div>"
      : '<span class="program-mark" aria-hidden="true"></span>';
    return '<a class="program-card' + (p.image ? "" : " program-card--brand") + '" href="' + esc(p.link) + '">' + media +
      '<div class="program-card-body">' +
        '<span class="program-card-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        "<p>" + esc(p.summary) + "</p>" +
        '<span class="link-arrow">Learn more ' + ICON.arrow + "</span>" +
      "</div></a>";
  }

  function infoRow(label, value) {
    var v = value;
    if (Array.isArray(v)) v = v.length ? v.map(esc).join(" · ") : null;
    else if (v != null) v = esc(v);
    return "<div><dt>" + esc(label) + "</dt><dd>" + (v || '<span class="tbc">Contact us for current details</span>') + "</dd></div>";
  }

  function programDetail(p) {
    var media = p.image
      ? '<div class="program-detail-media">' + img(p.image, { sizes: "(min-width:900px) 40vw, 100vw", position: p.imagePosition }) + "</div>"
      : '<div class="program-detail-media is-brand"><img src="assets/images/favicon-192.png" alt="" width="192" height="192" loading="lazy"></div>';
    var reg = p.registration
      ? '<a class="btn" href="' + esc(p.registration) + '">Registration information ' + ICON.arrow + "</a>"
      : '<a class="btn" href="' + esc(p.link) + '">Learn more ' + ICON.arrow + "</a>";
    return '<article class="program-detail" id="' + esc(p.id) + '">' + media +
      "<div>" +
        '<span class="eyebrow">Program</span>' +
        "<h2>" + esc(p.name) + "</h2>" +
        '<p class="lead">' + esc(p.overview) + "</p>" +
        '<dl class="info-list">' +
          infoRow("Ages", p.ages) +
          infoRow("Level", p.level) +
          infoRow("Focus", p.focus) +
          infoRow("Schedule", p.schedule) +
          infoRow("Location", p.location) +
        "</dl>" +
        '<div class="btn-row mt-5">' + reg + '<a class="btn btn--outline" href="contact.html">Ask a question</a></div>' +
      "</div></article>";
  }

  function teamCard(t) {
    var media = t.image
      ? '<div class="team-card-media">' + img(t.image, { sizes: "(min-width:1000px) 33vw, (min-width:640px) 50vw, 100vw", alt: "" }) + "</div>"
      : '<div class="team-card-media is-placeholder"><img src="assets/images/favicon-192.png" alt="" width="192" height="192" loading="lazy"></div>';
    var badges = '<span class="badge">' + esc(t.ageGroup) + "</span>" +
      (t.season ? '<span class="badge">' + esc(t.season) + "</span>" : "") +
      (t.competition ? '<span class="badge badge--green">' + esc(t.competition) + "</span>" : "");
    return '<a class="team-card" href="team.html?team=' + encodeURIComponent(t.id) + '">' + media +
      '<div class="team-card-body"><div class="team-card-meta">' + badges + "</div><h3>" + esc(t.name) + "</h3>" +
      '<span class="link-arrow">Team page ' + ICON.arrow + "</span></div></a>";
  }

  function newsCard(a) {
    return '<a class="news-card" href="article.html?slug=' + encodeURIComponent(a.slug) + '">' +
      (a.image ? '<div class="news-card-media">' + img(a.image, { sizes: "(min-width:1000px) 33vw, (min-width:640px) 50vw, 100vw", alt: "" }) + "</div>" : "") +
      '<div class="news-card-body"><div class="news-meta"><span class="cat">' + esc(a.category) + '</span><time datetime="' + esc(a.date) + '">' + formatDate(a.date) + "</time></div>" +
      "<h3>" + esc(a.title) + "</h3><p>" + esc(a.excerpt) + "</p></div></a>";
  }

  function sortedNews() {
    return (D.news || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  function personCard(p) {
    var initials = p.name.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("");
    return '<article class="person-card"><div class="person-photo">' +
      (p.photo ? '<img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '" loading="lazy">' : '<span class="initials" aria-hidden="true">' + esc(initials) + "</span>") +
      '</div><span class="person-role">' + esc(p.role) + "</span><h3>" + esc(p.name) + "</h3>" +
      (p.bio ? "<p>" + esc(p.bio) + "</p>" : "") + "</article>";
  }

  /* ------------------------------------------------------------------ */
  /* Renderers: any element with data-render="name" is filled here      */
  /* ------------------------------------------------------------------ */
  var R = {};

  R["program-cards"] = function (el) {
    var list = D.programs || [];
    el.className = "program-grid" + (list.length >= 4 ? " program-grid--4" : "");
    el.innerHTML = list.map(programCard).join("");
  };

  R["program-details"] = function (el) {
    el.innerHTML = (D.programs || []).map(programDetail).join("");
  };

  R["team-feature"] = function (el) {
    var teams = D.teams || [];
    var current = teams.filter(function (t) { return t.status === "current"; });
    if (current.length) {
      el.innerHTML = '<div class="grid grid--3">' + current.slice(0, 3).map(teamCard).join("") + "</div>";
      return;
    }
    var t = teams.filter(function (x) { return x.honours && x.honours.length; })[0];
    if (!t) { el.innerHTML = emptyState({ icon: "users", title: "Team pages coming soon", text: esc(D.teamsNote), actions: contactAction() }); return; }
    el.innerHTML = '<div class="team-feature">' +
      '<div class="team-feature-media">' + img(t.image, { sizes: "(min-width:960px) 58vw, 100vw" }) + "</div>" +
      '<div class="team-feature-body">' +
        '<span class="badge badge--honour">' + ICON.trophy + esc(t.honours[0]) + "</span>" +
        "<h3>" + esc(t.name) + "</h3>" +
        "<p>" + esc(t.description) + "</p>" +
        '<p class="text-muted" style="font-size:.9rem">' + esc(D.teamsNote) + "</p>" +
        '<div class="btn-row"><a class="btn" href="team.html?team=' + encodeURIComponent(t.id) + '">Team page ' + ICON.arrow + '</a></div>' +
      "</div></div>";
  };

  R["teams-current"] = function (el) {
    var current = (D.teams || []).filter(function (t) { return t.status === "current"; });
    el.innerHTML = current.length
      ? '<div class="grid grid--3">' + current.map(teamCard).join("") + "</div>"
      : emptyState({ icon: "users", title: "Current season teams coming soon", text: esc(D.teamsNote), actions: '<a class="btn btn--sm" href="register.html">Registration info</a>' + contactAction() });
  };

  R["teams-past"] = function (el) {
    var past = (D.teams || []).filter(function (t) { return t.status === "past"; });
    var section = el.closest("section");
    if (!past.length) { if (section) section.hidden = true; return; }
    el.innerHTML = '<div class="grid grid--3">' + past.map(teamCard).join("") + "</div>";
  };

  R["team-detail"] = function (el) {
    var id = param("team");
    var t = (D.teams || []).filter(function (x) { return x.id === id; })[0];
    if (!t) {
      document.title = "Team not found | EriStars Sports Club";
      $("[data-team-name]").textContent = "Team not found";
      el.innerHTML = '<section class="section"><div class="container">' + emptyState({ icon: "users", title: "We couldn’t find that team", text: "The team may have been renamed or isn’t published yet.", actions: '<a class="btn btn--sm" href="teams.html">All teams</a>' }) + "</div></section>";
      return;
    }
    document.title = t.name + " | Teams | EriStars Sports Club";
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.name + ": " + (t.description || "EriStars Sports Club team page."));
    $("[data-team-name]").textContent = t.name;
    $("[data-team-crumb]").textContent = t.name;
    var badges = '<span class="badge">' + esc(t.ageGroup) + "</span>" +
      (t.season ? '<span class="badge">' + esc(t.season) + "</span>" : "") +
      (t.competition ? '<span class="badge">' + esc(t.competition) + "</span>" : "") +
      (t.honours || []).map(function (h) { return '<span class="badge badge--honour">' + ICON.trophy + esc(h) + "</span>"; }).join("");
    $("[data-team-badges]").innerHTML = badges;

    var coaches = t.coaches && t.coaches.length
      ? '<div class="grid grid--3">' + t.coaches.map(personCard).join("") + "</div>"
      : '<p class="text-muted">Coaching staff will be listed here once confirmed.</p>';

    var roster = t.roster && t.roster.length
      ? '<ul class="checklist" style="columns:2">' + t.roster.map(function (p) { return "<li>" + (p.number ? "#" + esc(p.number) + " " : "") + esc(p.name) + "</li>"; }).join("") + "</ul>"
      : '<p class="text-muted">To protect the privacy of our young players, rosters are published only with club and guardian approval.</p>';

    var schedule = t.schedule && t.schedule.length
      ? '<div style="overflow-x:auto"><table class="table"><thead><tr><th scope="col">Date</th><th scope="col">Time</th><th scope="col">Event</th><th scope="col">Location</th></tr></thead><tbody>' +
        t.schedule.map(function (s) { return "<tr><td>" + formatDate(s.date) + "</td><td>" + esc(s.time) + "</td><td>" + esc(s.type) + (s.opponent ? " vs " + esc(s.opponent) : "") + "</td><td>" + esc(s.location) + "</td></tr>"; }).join("") + "</tbody></table></div>"
      : '<p class="text-muted">No upcoming events are published. Registered families receive schedules directly from the club.</p>';

    var results = t.results && t.results.length
      ? '<div style="overflow-x:auto"><table class="table"><thead><tr><th scope="col">Date</th><th scope="col">Opponent</th><th scope="col">Score</th></tr></thead><tbody>' +
        t.results.map(function (r) { return "<tr><td>" + formatDate(r.date) + "</td><td>" + esc(r.opponent) + "</td><td>" + esc(r.score) + (r.outcome ? " (" + esc(r.outcome) + ")" : "") + "</td></tr>"; }).join("") + "</tbody></table></div>"
      : '<p class="text-muted">No match results have been published for this team.</p>';

    var gallery = (t.gallery || []).filter(function (k) { return IMAGES[k]; });

    el.innerHTML =
      '<section class="section"><div class="container"><div class="split split--wide-media">' +
        '<div class="stack-lg"><span class="eyebrow">Team overview</span><h2>About the team</h2>' +
          '<p class="lead">' + esc(t.description || "") + "</p>" +
          '<dl class="info-list">' + [["Age group", t.ageGroup], ["Season", t.season], ["Competition", t.competition]]
            .filter(function (r) { return r[1]; }).map(function (r) { return infoRow(r[0], r[1]); }).join("") + "</dl>" +
        "</div>" +
        (t.image ? '<figure><div class="media-frame media-frame--accent">' + img(t.image, { sizes: "(min-width:900px) 58vw, 100vw" }) + "</div>" +
          (IMAGES[t.image].caption ? '<figcaption class="media-caption">' + esc(IMAGES[t.image].caption) + "</figcaption>" : "") + "</figure>" : "") +
      "</div></div></section>" +
      '<section class="section section--paper"><div class="container"><div class="grid grid--2" style="gap:3rem">' +
        '<div class="stack"><span class="eyebrow">Staff</span><h2 class="h3">Coaching staff</h2>' + coaches + "</div>" +
        '<div class="stack"><span class="eyebrow">Players</span><h2 class="h3">Roster</h2>' + roster + "</div>" +
      "</div></div></section>" +
      '<section class="section"><div class="container"><div class="grid grid--2" style="gap:3rem">' +
        '<div class="stack"><span class="eyebrow">Upcoming</span><h2 class="h3">Schedule</h2>' + schedule + "</div>" +
        '<div class="stack"><span class="eyebrow">Matches</span><h2 class="h3">Results</h2>' + results + "</div>" +
      "</div></div></section>" +
      (gallery.length > 1 ? '<section class="section section--dark"><div class="container"><div class="section-head"><span class="eyebrow">Gallery</span><h2>Team gallery</h2></div><div data-render="gallery" data-keys="' + gallery.join(",") + '"></div></div></section>' : "");
    renderAll(el);
  };

  R["news-list"] = function (el) {
    var list = sortedNews();
    var limit = parseInt(el.getAttribute("data-limit"), 10);
    var hideSection = el.hasAttribute("data-hide-section-when-empty");
    if (!list.length) {
      if (hideSection) { el.closest("section").hidden = true; return; }
      el.innerHTML = emptyState({
        icon: "news",
        title: "No announcements yet",
        text: "Club news, match updates and community events will be published here. In the meantime, follow EriStars on social media for the latest updates.",
        actions: (SITE.social && SITE.social.facebook ? '<a class="btn btn--sm" href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">Follow on Facebook</a>' : "") + contactAction()
      });
      return;
    }
    function draw(items) { el.querySelector(".news-grid").innerHTML = items.map(newsCard).join(""); }
    var cats = (D.newsCategories || []).filter(function (c) { return list.some(function (a) { return a.category === c; }); });
    var filters = !limit && cats.length > 1 && list.length >= 6
      ? '<div class="filter-bar" role="group" aria-label="Filter news by category"><button type="button" aria-pressed="true" data-cat="">All</button>' +
        cats.map(function (c) { return '<button type="button" aria-pressed="false" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>"
      : "";
    el.innerHTML = filters + '<div class="grid grid--3 news-grid" aria-live="polite"></div>';
    draw(limit ? list.slice(0, limit) : list);
    $$(".filter-bar button", el).forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filter-bar button", el).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        var c = b.getAttribute("data-cat");
        draw(c ? list.filter(function (a) { return a.category === c; }) : list);
      });
    });
  };

  R["article"] = function (el) {
    var a = (D.news || []).filter(function (x) { return x.slug === param("slug"); })[0];
    var title = $("[data-article-title]");
    if (!a) {
      document.title = "Article not found | EriStars Sports Club";
      title.textContent = "Article not found";
      el.innerHTML = emptyState({ icon: "news", title: "We couldn’t find that article", text: "It may have been moved or unpublished.", actions: '<a class="btn btn--sm" href="news.html">All news</a>' });
      return;
    }
    document.title = a.title + " | News | EriStars Sports Club";
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", a.excerpt || a.title);
    title.textContent = a.title;
    $("[data-article-meta]").innerHTML = '<span class="cat" style="color:var(--brand-green)">' + esc(a.category) + '</span><time datetime="' + esc(a.date) + '">' + formatDate(a.date) + "</time>";
    var body = (a.body || []).map(function (b) {
      if (typeof b === "string") return "<p>" + esc(b) + "</p>";
      if (b.heading) return "<h2>" + esc(b.heading) + "</h2>";
      if (b.image) return '<figure class="article-figure">' + img(b.image, { sizes: "(min-width:900px) 820px, 100vw" }) + (b.caption ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
      return "";
    }).join("");
    var related = sortedNews().filter(function (x) { return x.slug !== a.slug && x.category === a.category; }).slice(0, 3);
    el.innerHTML =
      (a.image ? '<figure class="article-figure mt-0">' + img(a.image, { sizes: "(min-width:900px) 820px, 100vw", eager: true }) + (IMAGES[a.image].caption ? "<figcaption>" + esc(IMAGES[a.image].caption) + "</figcaption>" : "") + "</figure>" : "") +
      '<div class="article-body">' + body + "</div>" +
      (related.length ? '<hr style="margin:3rem 0;border:0;border-top:1px solid var(--border)"><h2 class="h3" style="margin-bottom:1.5rem">Related news</h2><div class="grid grid--3">' + related.map(newsCard).join("") + "</div>" : "");
  };

  R["gallery"] = function (el) {
    var keys = (el.getAttribute("data-keys") || (D.gallery || []).join(",")).split(",").filter(function (k) { return IMAGES[k]; });
    el.className = "gallery";
    el.setAttribute("role", "list");
    el.innerHTML = keys.map(function (k, i) {
      var im = IMAGES[k];
      return '<figure class="gallery-item" role="listitem"><button class="gallery-btn" type="button" data-lightbox="' + esc(k) + '" aria-label="View larger: ' + esc(im.caption || im.alt) + '">' +
        img(k, { sizes: i === 0 ? "(min-width:800px) 58vw, 100vw" : "(min-width:800px) 42vw, 100vw" }) +
        '<span class="zoom" aria-hidden="true">' + ICON.zoom + "</span></button>" +
        "<figcaption><strong>" + esc(im.caption || "") + "</strong>" + (im.credit ? "<span>" + esc(im.credit) + "</span>" : "") + "</figcaption></figure>";
    }).join("");
  };

  R["partners"] = function (el) {
    var list = D.partners || [];
    if (!list.length) {
      el.innerHTML = '<div class="panel panel--row"><div class="stack"><h3>Partner with EriStars</h3>' +
        '<p class="text-muted">Local businesses and organizations help keep youth soccer accessible for DMV families. Partner recognition will appear here as sponsorships are confirmed.</p></div>' +
        '<div class="btn-row"><a class="btn" href="get-involved.html#sponsorship">Become a sponsor ' + ICON.arrow + "</a></div></div>";
      return;
    }
    el.innerHTML = '<div class="partner-grid">' + list.map(function (p) {
      var logo = '<img src="' + esc(p.logo) + '" alt="' + esc(p.name) + '" loading="lazy">';
      return p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + logo + "</a>" : "<div>" + logo + "</div>";
    }).join("") + '</div><div class="btn-row mt-6"><a class="btn btn--outline" href="get-involved.html#sponsorship">Become a sponsor</a></div>';
  };

  R["locations"] = function (el) {
    var list = D.locations || [];
    if (!list.length) {
      el.innerHTML = emptyState({
        icon: "pin",
        title: "Field locations are being confirmed",
        text: "Training and match venues for the current season will be published here with maps and parking details. Registered families receive location information directly from their coaches.",
        actions: contactAction("Ask about locations")
      });
      return;
    }
    el.innerHTML = '<div class="stack-lg">' + list.map(function (l) {
      var q = encodeURIComponent(l.mapQuery || l.address);
      return '<article class="location-card"><div class="location-map"><iframe title="Map of ' + esc(l.name) + '" src="https://www.google.com/maps?q=' + q + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
        '<div class="location-body">' + (l.use ? '<span class="eyebrow">' + esc(l.use) + "</span>" : "") +
        '<h2 class="h3">' + esc(l.name) + "</h2><p>" + esc(l.address) + "</p>" +
        (l.notes ? '<p class="text-muted">' + esc(l.notes) + "</p>" : "") +
        '<div class="btn-row"><a class="btn btn--sm" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">Open in Google Maps</a></div></div></article>';
    }).join("") + "</div>";
  };

  function peopleRenderer(key, title, text) {
    return function (el) {
      var list = D[key] || [];
      el.innerHTML = list.length
        ? '<div class="grid grid--4">' + list.map(personCard).join("") + "</div>"
        : emptyState({ icon: "users", title: title, text: text });
    };
  }
  R["leadership"] = peopleRenderer("leadership", "Leadership profiles coming soon", "EriStars is led by a volunteer board of parents and community members. Board member profiles will be published here once approved.");
  R["coaches"] = peopleRenderer("coaches", "Coaching staff profiles coming soon", "Coach profiles, with official titles and approved biographies, will be added for the current season.");

  R["registration"] = function (el) {
    var list = D.registration || [];
    if (!list.length) {
      el.innerHTML = emptyState({
        icon: "clipboard",
        title: "No registration is open right now",
        text: "Registration dates for upcoming seasons have not been announced. Contact the club to ask about joining, and we’ll share details as soon as registration opens.",
        actions: '<a class="btn btn--sm" href="contact.html">Contact the club</a>' +
          (SITE.social && SITE.social.facebook ? '<a class="btn btn--outline btn--sm" href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">Follow for updates</a>' : "")
      });
      return;
    }
    var STATUS = { open: ["status--open", "Open"], closed: ["status--closed", "Closed"], soon: ["status--soon", "Coming soon"] };
    el.innerHTML = '<div class="grid grid--2">' + list.map(function (r) {
      var s = STATUS[r.status];
      return '<article class="reg-card"><div class="reg-card-head"><h3>' + esc(r.program) + "</h3>" +
        (s ? '<span class="status ' + s[0] + '">' + s[1] + "</span>" : "") + "</div>" +
        '<dl class="info-list mt-0">' + infoRow("Eligible ages", r.ages) + infoRow("Season", r.season) + infoRow("Fee", r.fee) + infoRow("Deadline", r.deadline ? formatDate(r.deadline) : null) + "</dl>" +
        (r.status === "open" && r.url ? '<div><a class="btn" href="' + esc(r.url) + '" target="_blank" rel="noopener">Register now ' + ICON.arrow + "</a></div>" : "") +
        "</article>";
    }).join("") + "</div>";
  };

  R["form-notice"] = function (el) {
    if (SITE.contactFormEndpoint) return;
    el.innerHTML = '<p class="form-status form-status--info">Online messaging is still being set up, so this form can’t send messages yet.' +
      (SITE.email ? ' Please email <a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>" : "") +
      (SITE.social && SITE.social.facebook ? (SITE.email ? " or" : " Please") + ' <a href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">message us on Facebook</a>' : "") + ".</p>";
  };

  R["social"] = function (el) { el.innerHTML = socialLinks(); };

  R["contact-details"] = function (el) {
    var rows = [];
    if (SITE.email) rows.push(["mail", "Email", '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>"]);
    if (SITE.phone) rows.push(["phone", "Phone", '<a href="tel:' + esc(SITE.phone.replace(/[^\d+]/g, "")) + '">' + esc(SITE.phone) + "</a>"]);
    rows.push(["pin", "Service area", esc(SITE.serviceArea) + "<br>Based in " + esc(SITE.baseCity)]);
    if (SITE.social && SITE.social.facebook) rows.push(["facebook", "Facebook", '<a href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">Message us on Facebook</a>']);
    el.innerHTML = '<ul class="contact-list" role="list">' + rows.map(function (r) {
      return '<li><span class="ic">' + ICON[r[0]] + "</span><div><strong>" + r[1] + "</strong>" + r[2] + "</div></li>";
    }).join("") + "</ul>";
  };

  R["org-facts"] = function (el) {
    el.innerHTML = '<dl class="facts">' +
      "<div><dt>Founded</dt><dd>" + esc(SITE.founded) + "</dd></div>" +
      "<div><dt>Based in</dt><dd>" + esc(SITE.baseCity.split(",")[0]) + ", MD</dd></div>" +
      "<div><dt>Serving</dt><dd>D.C. · MD · VA</dd></div>" +
      "<div><dt>Status</dt><dd>Nonprofit</dd></div></dl>" +
      '<p class="media-caption">' + esc(SITE.legalName) + " · EIN " + esc(SITE.ein) + "</p>";
  };

  function renderAll(root) {
    $$("[data-render]", root).forEach(function (el) {
      var fn = R[el.getAttribute("data-render")];
      if (fn && !el.hasAttribute("data-rendered")) {
        el.setAttribute("data-rendered", "");
        try { fn(el); } catch (err) { console.error("Render failed:", el.getAttribute("data-render"), err); }
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Lightbox                                                            */
  /* ------------------------------------------------------------------ */
  function initLightbox() {
    var dialog;
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-lightbox]");
      if (!trigger) return;
      var im = IMAGES[trigger.getAttribute("data-lightbox")];
      if (!im) return;
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.className = "lightbox";
        dialog.setAttribute("aria-label", "Image viewer");
        dialog.innerHTML = '<div class="lightbox-inner"><button class="lightbox-close" type="button" aria-label="Close image viewer">' + ICON.close + '</button><figure class="lightbox-figure"><img alt=""></figure><p class="lightbox-caption"></p></div>';
        document.body.appendChild(dialog);
        $(".lightbox-close", dialog).addEventListener("click", function () { dialog.close(); });
        dialog.addEventListener("click", function (ev) { if (ev.target === dialog || ev.target.classList.contains("lightbox-figure")) dialog.close(); });
        dialog.addEventListener("close", function () { if (dialog._trigger) dialog._trigger.focus(); });
      }
      var pic = $("img", dialog);
      pic.src = im.full || im.src;
      pic.alt = im.alt;
      $(".lightbox-caption", dialog).textContent = [im.caption, im.credit].filter(Boolean).join(" · ");
      dialog._trigger = trigger;
      if (typeof dialog.showModal === "function") dialog.showModal(); else window.open(im.full || im.src, "_blank");
    });
  }

  /* ------------------------------------------------------------------ */
  /* LomiSpeak promo: floating card, bottom-right                        */
  /* Appears after scrolling past the first screen, hides over the       */
  /* footer, and stays closed for the session once dismissed.            */
  /* ------------------------------------------------------------------ */
  var PROMO_KEY = "eristars-promo-dismissed";

  function initPromo() {
    var dismissed = false;
    try { dismissed = sessionStorage.getItem(PROMO_KEY) === "1"; } catch (e) {}
    if (dismissed) return;

    var apple = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.15 6.9c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01-2.12 3.68-.55 9.1 1.52 12.09 1.01 1.45 2.2 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.15-1.69 1.63-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.63-2.32-4.4-2.38-2-.15-3.67 1.09-4.6 1.09zM15.53 3.83c.84-1.01 1.4-2.43 1.25-3.83-1.21.05-2.67.8-3.54 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.71-.69 3.56-1.7"/></svg>';
    var play = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m22.02 13.3-3.92 2.22-3.52-3.5 3.55-3.52 3.89 2.2a1.49 1.49 0 0 1 0 2.6zM1.34.92a1.49 1.49 0 0 0-.11.57v21.02c0 .22.04.42.12.6l11.15-11.09L1.34.92zm12.2 10.07 3.26-3.24L3.45.2a1.47 1.47 0 0 0-.95-.18l11.04 10.97zm0 2.07-11 10.93c.3.04.61-.02.9-.18l13.33-7.54-3.23-3.21z"/></svg>';
    var mac = '<svg viewBox="0 0 24 24" ' + P + ' aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M1 20h22"/></svg>';
    var links = [
      ["https://apps.apple.com/app/apple-store/id6768473172?pt=128865327&ct=EriStars&mt=8", apple, "Download on the", "App Store"],
      ["https://play.google.com/store/apps/details?id=com.tigrinya.app&referrer=utm_source%3Deristars%26utm_medium%3Dweb%26utm_campaign%3DEriStars", play, "Get it on", "Google Play"],
      ["https://lomispeak.com/desktop?utm_source=eristars&utm_medium=web&utm_campaign=EriStars", mac, "Download for", "Mac"]
    ];

    var promo = document.createElement("aside");
    promo.className = "promo";
    promo.setAttribute("aria-label", "LomiSpeak app");
    promo.innerHTML =
      '<button class="promo-close" type="button" aria-label="Close LomiSpeak banner">' + ICON.close + "</button>" +
      '<div class="promo-head">' +
        '<img src="assets/images/lomispeaklogo.webp" alt="" width="64" height="64">' +
        '<p><strong>LomiSpeak</strong>Use your voice to type Tigrinya</p>' +
      "</div>" +
      '<ul class="promo-badges" role="list">' + links.map(function (l) {
        return '<li><a href="' + esc(l[0]) + '" target="_blank" rel="noopener">' + l[1] +
          "<span><small>" + l[2] + "</small>" + l[3] + '<span class="visually-hidden"> (opens in a new tab)</span></span></a></li>';
      }).join("") + "</ul>";
    document.body.appendChild(promo);

    var footer = $(".site-footer");
    var ticking = false;
    function update() {
      ticking = false;
      var past = window.scrollY > Math.min(window.innerHeight * 0.75, 640);
      var atFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
      promo.classList.toggle("is-visible", past && !atFooter);
    }
    function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    $(".promo-close", promo).addEventListener("click", function () {
      try { sessionStorage.setItem(PROMO_KEY, "1"); } catch (e) {}
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      promo.classList.remove("is-visible");
      setTimeout(function () { promo.remove(); }, 400);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form                                                        */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var status = $(".form-status", form);
    var submit = $('button[type="submit"]', form);
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address, like name@example.com."; },
      subject: function (v) { return v.trim() ? "" : "Please choose a subject."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters."; }
    };
    function validate(field) {
      var msg = rules[field.name] ? rules[field.name](field.value) : "";
      var err = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      return !msg;
    }
    $$("input, select, textarea", form).forEach(function (f) {
      if (!rules[f.name]) return;
      f.addEventListener("blur", function () { if (f.value) validate(f); });
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") validate(f); });
    });
    function show(type, html) {
      status.hidden = false;
      status.className = "form-status form-status--" + type;
      status.innerHTML = html;
      status.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("input, select, textarea", form).filter(function (f) { return rules[f.name]; });
      var invalid = fields.filter(function (f) { return !validate(f); });
      if (invalid.length) {
        show("error", "Please fix the " + (invalid.length === 1 ? "highlighted field" : invalid.length + " highlighted fields") + " and try again.");
        invalid[0].focus();
        return;
      }
      if (form.elements.company && form.elements.company.value) return; // spam honeypot

      var data = {};
      fields.forEach(function (f) { data[f.name] = f.value.trim(); });

      if (!SITE.contactFormEndpoint) {
        // Not connected to a delivery service yet: say so honestly and offer working alternatives.
        var alt = [];
        if (SITE.email) {
          alt.push('<a href="mailto:' + esc(SITE.email) + "?subject=" + encodeURIComponent(data.subject + ": " + data.name) + "&body=" + encodeURIComponent(data.message + "\n\n" + data.name + "\n" + data.email) + '">open it in your email app</a>');
        }
        if (SITE.social && SITE.social.facebook) alt.push('<a href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">message us on Facebook</a>');
        show("info", "<strong>Your message has not been sent.</strong> Online messaging is still being set up." +
          (alt.length ? " For now, please " + alt.join(" or ") + "." : ""));
        return;
      }

      submit.disabled = true;
      var label = submit.innerHTML;
      submit.textContent = "Sending…";
      fetch(SITE.contactFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        fields.forEach(function (f) { f.removeAttribute("aria-invalid"); });
        show("success", "<strong>Thank you! Your message was sent.</strong> A club representative will reply to " + esc(data.email) + ".");
      }).catch(function () {
        show("error", "<strong>Sorry, your message could not be sent.</strong> Please check your connection and try again" +
          (SITE.social && SITE.social.facebook ? ', or <a href="' + esc(SITE.social.facebook) + '" target="_blank" rel="noopener">message us on Facebook</a>' : "") + ".");
      }).then(function () {
        submit.disabled = false;
        submit.innerHTML = label;
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  renderHeader();
  renderFooter();
  initHeaderScroll();
  initDropdowns();
  initDrawer();
  renderAll(document);
  initLightbox();
  initContactForm();
  initPromo();

  // Re-apply hash scrolling after content renders (for links like teams.html#schedules)
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView(); }, 0);
  }
})();
