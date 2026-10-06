import { boot, gsap, reduced, ext, actions, fig } from "../src/shared/boot.js";
import { em } from "../src/config/content.js";
import { cases, projectHref, imagesOf, thumbOf } from "../src/shared/data.js";
import { formFields } from "../src/shared/form.js";
import "./style.css";

const pad = (i) => String(i + 1).padStart(2, "0");

/* ---------- chrome ---------- */

const header = ({ c, page }) => `
  <header class="top">
    <a href="./index.html" class="mono">${c.person.first[0]}. ${c.person.last}</a>
    <nav class="mono" aria-label="Pages">
      <a href="./index.html" class="u${page === "index" ? " on" : ""}">${c.nav.home}</a>
      <a href="./index.html#work" class="u${page === "work" ? " on" : ""}">${c.nav.work}</a>
      <a href="./about.html" class="u${page === "about" ? " on" : ""}">${c.nav.about}</a>
      <a href="./contact.html" class="u${page === "contact" ? " on" : ""}">${c.nav.contact}</a>
    </nav>
    <p class="mono status"><i class="dot"></i>Available · <span data-clock></span></p>
  </header>`;

const contactStrip = (c) => `
  <section class="contact">
    <p class="label mono" data-reveal>${c.contact.title}</p>
    <a class="email" href="mailto:${c.person.email}" data-split>${c.person.email}</a>
    <p class="line" data-reveal>${c.contact.line}</p>
    <p class="socials mono" data-reveal>
      ${c.socials.map((s) => ext(s.href, s.label, "u")).join("")}
      <a class="u" href="${c.person.resume}" target="_blank" rel="noopener">${c.nav.resume}</a>
    </p>
  </section>`;

const footer = ({ c, page }) => `
  <footer class="foot">
    ${page === "contact" ? "" : contactStrip(c)}
    <div class="foot-grid mono">
      <div><p class="label">Email</p><a class="u" href="mailto:${c.person.email}">${c.person.email}</a></div>
      <div><p class="label">How to reach me</p><p>${c.contact.ping}</p></div>
      <div><p class="label">Elsewhere</p>${c.socials.map((s) => ext(s.href, s.label, "u")).join("<br />")}</div>
      <div><p class="label">Availability</p><p>${c.contact.availability}</p><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">${c.nav.resume} ↗</a></div>
    </div>
    <div class="fine mono"><span>${c.footer.copyright}</span><a class="u" href="./contact.html">Write a message →</a><span>${c.person.location} · <span data-clock></span></span></div>
  </footer>`;

/** Centred list; an accent band glides to the hovered row. */
const bandList = (items) => `
  <ul class="list">
    <li class="band" aria-hidden="true"></li>
    ${items
      .map(({ href, meta, title, aside, cover }) => {
        const open = href ? `a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ""}` : "div";
        return `
      <li class="item" data-reveal${cover ? ` data-cover="${cover}"` : ""}>
        <${open} class="item-in">
          <span class="meta mono">${meta}</span>
          <span class="title">${title}</span>
          <span class="year mono">${aside}</span>
        </${open.split(" ")[0]}>
      </li>`;
      })
      .join("")}
  </ul>`;

const facts = (c) => `
  <section class="facts mono">
    <div data-reveal><p class="label">Recognition</p>${c.recognition.map((r) => `<p>${r.year} — ${r.title}<br /><span>${r.detail}</span></p>`).join("")}</div>
    <div data-reveal><p class="label">Education</p>${c.education.map((e) => `<p>${e.years}<br />${e.school}<br /><span>${e.degree} · ${e.note}</span></p>`).join("")}</div>
    <div data-reveal><p class="label">Stack</p>${c.stack.map((s) => `<p>${s.label}<br /><span>${s.items.join(", ")}</span></p>`).join("")}</div>
  </section>`;

const grid = (label, items) => `
  <section class="focus">
    <p class="label mono" data-reveal>${label}</p>
    <ol>${items.map(([n, t, b]) => `<li data-reveal><span class="mono">${n}</span><h3>${t}</h3><p>${b}</p></li>`).join("")}</ol>
  </section>`;

/* ---------- pages ---------- */

const pages = {
  index: ({ c, portrait }) => `
    <section class="hero">
      ${fig(portrait, { cls: "portrait-wrap", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.1"' })}
      <h1 class="name" data-split data-delay="0.35">${c.person.name}</h1>
      <p class="role" data-reveal data-delay="0.6">${c.person.roleLong}</p>
    </section>

    <section class="statement"><p data-split>${em(c.hero.statement)}</p></section>

    <section class="metrics proof">${c.hero.proof.map((p) => `<div data-reveal><strong>${p.value}</strong><span class="mono">${p.label}</span></div>`).join("")}</section>

    <section id="work" class="work">
      <p class="side mono" aria-hidden="true">/Work</p>
      ${bandList(
        c.work.map((w) => ({
          href: projectHref(w),
          meta: `${w.role} &nbsp;|&nbsp; ${w.stack.slice(0, 2).join(" · ")}`,
          title: w.title,
          aside: w.year,
          cover: thumbOf(w),
        }))
      )}
    </section>

    ${grid(c.focus.title, c.focus.items.map((f) => [f.n, f.title, f.body]))}
    ${facts(c)}
    <p class="center" data-reveal><a class="u mono" href="./about.html">More about me →</a></p>
    `,

  work: ({ c, project: w, next }) => {
    const img = imagesOf(w);
    const gallery = [...img.gallery];
    return `
    <section class="phero">
      <p class="mono label" data-reveal>/Work — ${pad(cases.indexOf(w))} / ${pad(cases.length - 1)}</p>
      <h1 class="name big" data-split data-delay="0.15">${w.title}</h1>
      <p class="role" data-reveal data-delay="0.4">${w.tagline}</p>
      <p class="pmeta mono" data-reveal data-delay="0.5"><span>${w.year}</span><span>${w.role}</span></p>
      <div data-reveal data-delay="0.6">${actions(w.links)}</div>
    </section>

    ${fig(img.cover, { cls: "pcover", alt: `${w.title} cover`, attrs: "data-clip" })}

    <section class="statement"><p data-split>${w.overview}</p></section>

    ${w.metrics?.length ? `<section class="metrics">${w.metrics.map((m) => `<div data-reveal><strong>${m.value}</strong><span class="mono">${m.label}</span></div>`).join("")}</section>` : ""}

    <section class="hls">
      <p class="label mono" data-reveal>${c.nav.highlights}</p>
      <ol>${w.highlights.map((h, i) => `<li data-reveal><span class="mono">${String(i + 1).padStart(2, "0")}</span><p>${h}</p></li>`).join("")}</ol>
    </section>

    <section class="sections">
      ${w.sections
        .map((s, i) => `
        <article class="sec">
          <p class="mono sec-k">${pad(i)} / ${s.kicker}</p>
          <div><h2 data-split>${s.title}</h2><p data-reveal>${s.body}</p></div>
        </article>
        ${gallery.length ? fig(gallery.shift(), { cls: `shot${i % 2 ? " shot-n" : ""}`, alt: "", attrs: "data-clip" }) : ""}`)
        .join("")}
    </section>

    ${gallery.length ? `<section class="grid2">${gallery.map((g) => fig(g, { alt: "", attrs: "data-reveal" })).join("")}</section>` : ""}

    <section class="stack mono" data-reveal>
      <p class="label">Stack</p>
      <ul>${w.stack.map((s) => `<li>${s}</li>`).join("")}</ul>
      ${w.status ? `<p class="status-line">${w.status}</p>` : ""}
      ${actions(w.links)}
    </section>

    <section class="work next">
      <p class="label mono center" data-reveal>${c.nav.next}</p>
      ${bandList([{ href: `./work.html?p=${next.slug}`, meta: next.role, title: next.title, aside: "→" }])}
    </section>
    `;
  },

  about: ({ c, portrait, photos }) => `
    <section class="hero hero-sm">
      ${fig(portrait, { cls: "portrait-wrap sm", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.1"' })}
      <h1 class="name" data-split data-delay="0.3">${em(c.about.statement)}</h1>
    </section>

    <section class="story">${c.about.story.map((p) => `<p data-split>${em(p)}</p>`).join("")}</section>

    <section class="photos">${photos.map((p, i) => fig(p, { alt: "", attrs: `data-clip data-delay="${i * 0.12}"` })).join("")}</section>

    ${grid("Principles", c.about.principles.map((p, i) => [pad(i), p.title, p.body]))}

    <section class="rows mono">
      <p class="label" data-reveal>Now</p>
      ${c.about.now.map((n) => `<p class="r" data-reveal><span>${n.label}</span><span>${n.value}</span></p>`).join("")}
    </section>

    <section class="rows mono">
      <p class="label" data-reveal>Timeline</p>
      ${c.about.timeline.map((t) => `<p class="r" data-reveal><span>${t.year}</span><span>${t.title}</span><span>${t.detail}</span></p>`).join("")}
    </section>

    ${facts(c)}

    <section class="work">
      <p class="label mono center" data-reveal>Writing</p>
      ${bandList(c.writing.map((b, i) => ({ href: b.url, meta: `${b.topic} · ${b.read}`, title: `Absurd JS — Part ${i + 1}`, aside: b.date })))}
    </section>
    `,

  contact: ({ c }) => `
    <section class="phero">
      <p class="mono label" data-reveal>/${c.nav.contact}</p>
      <h1 class="name big" data-split data-delay="0.15">${c.contact.title}</h1>
      <p class="role" data-reveal data-delay="0.4">${em(c.contact.headline)}</p>
    </section>

    <section class="cgrid">
      <dl class="mono" data-reveal>
        <dt>Email</dt><dd><a class="u" href="mailto:${c.person.email}">${c.person.email}</a></dd>
        <dt>Local time</dt><dd>${c.person.location} · <span data-clock></span></dd>
        <dt>Availability</dt><dd>${c.contact.availability}</dd>
        <dt>Elsewhere</dt><dd>${c.socials.map((s) => ext(s.href, s.label, "u")).join(" &nbsp; ")}</dd>
        <dt>${c.nav.resume}</dt><dd><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">Download PDF</a></dd>
      </dl>
      <div data-reveal data-delay="0.1">${formFields()}</div>
    </section>`,
};

boot(
  "signal",
  (ctx) => `${header(ctx)}<main class="p-${ctx.page}">${pages[ctx.page](ctx)}</main>${footer(ctx)}`,
  () => {
    const dur = reduced ? 0 : 0.55;
    const fine = matchMedia("(pointer: fine)").matches;

    // Cursor preview of the hovered project's cover.
    let preview;
    if (fine && !reduced && document.querySelector("[data-cover]")) {
      preview = Object.assign(document.createElement("div"), { className: "preview m", innerHTML: "<img alt='' />" });
      document.body.append(preview);
      const px = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      const py = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
      addEventListener("pointermove", (e) => { px(e.clientX + 24); py(e.clientY - 90); });
    }

    // Accent band glides to whichever row is hovered / focused.
    const offs = [];
    document.querySelectorAll(".list").forEach((list) => {
      const band = list.querySelector(".band");
      const items = [...list.querySelectorAll(".item")];
      const on = (item) => {
        items.forEach((i) => i.classList.toggle("is-on", i === item));
        gsap.to(band, { y: item.offsetTop, height: item.offsetHeight, autoAlpha: 1, duration: dur, ease: "expo.out", overwrite: "auto" });
        if (preview && item.dataset.cover) {
          preview.querySelector("img").src = item.dataset.cover;
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, overwrite: "auto" });
        }
      };
      const off = () => {
        items.forEach((i) => i.classList.remove("is-on"));
        gsap.to(band, { autoAlpha: 0, duration: dur * 0.6, overwrite: "auto" });
        if (preview) gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.3, overwrite: "auto" });
      };
      items.forEach((i) => {
        i.addEventListener("mouseenter", () => on(i));
        i.addEventListener("focusin", () => on(i));
      });
      list.addEventListener("mouseleave", off);
      list.addEventListener("focusout", (e) => !list.contains(e.relatedTarget) && off());
      offs.push({ list, off });
    });
    // Scrolling moves the list out from under a still mouse without firing
    // mouseleave, so check on scroll and clear anything left behind.
    addEventListener("scroll", () => {
      offs.forEach(({ list, off }) => !list.matches(":hover") && !list.contains(document.activeElement) && off());
    }, { passive: true });

    if (reduced) return;
    // Portrait drifts with the cursor and recedes on scroll.
    const wrap = document.querySelector(".portrait-wrap");
    if (wrap) {
      const img = wrap.querySelector("img");
      const x = gsap.quickTo(img, "x", { duration: 1.4, ease: "power3" });
      const y = gsap.quickTo(img, "y", { duration: 1.4, ease: "power3" });
      addEventListener("pointermove", (e) => {
        x((e.clientX / innerWidth - 0.5) * 18);
        y((e.clientY / innerHeight - 0.5) * 12);
      });
      // Recede on the inner image with explicit start values, so it never fights
      // the figure's own fade-in (both used to drive the same opacity).
      gsap.fromTo(img, { scale: 1, opacity: 1 }, { scale: 0.9, opacity: 0.25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }
);
