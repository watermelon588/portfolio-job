import { boot, gsap, reduced, ext, actions, fig } from "../src/shared/boot.js";
import { em } from "../src/config/content.js";
import { projectHref, imagesOf, thumbOf } from "../src/shared/data.js";
import { formFields } from "../src/shared/form.js";
import "./style.css";

const email = (e) => e.replace("@", "<sup>at</sup>");
const pad = (i) => String(i + 1).padStart(2, "0");

/** CV list: underlined heading + two-column definition rows. */
const list = (title, rows) => `
  <section class="cv" data-reveal>
    <h2>${title}</h2>
    <dl>${rows.map(([k, v, cover]) => `<dt>${k}</dt><dd${cover ? ` data-cover="${cover}"` : ""}>${v}</dd>`).join("")}</dl>
  </section>`;

/* ---------- chrome ---------- */

const header = ({ c, page }) => `
  <header class="top">
    <a href="./index.html" class="who"><span>${c.person.name}</span><span lang="bn">${c.person.nativeName}</span></a>
    <a href="./index.html#work" class="u${page === "work" ? " on" : ""}">${c.nav.work}</a>
    <a href="./about.html" class="u${page === "about" ? " on" : ""}">${c.nav.about}</a>
    <div>
      <a href="./contact.html" class="u${page === "contact" ? " on" : ""}">${c.nav.contact}</a>
      <p class="small"><a href="mailto:${c.person.email}">${email(c.person.email)}</a></p>
      <p class="small arrows">${c.socials.slice(0, 2).map((s) => ext(s.href, `→ ${s.label}`)).join("<br />")}</p>
    </div>
  </header>`;

const footer = ({ c }) => `
  <footer class="bar" id="contact">
    <p class="bar-line">${c.contact.line} <a class="u" href="mailto:${c.person.email}">${email(c.person.email)}</a></p>
    <div class="bar-grid">
      <div><h2>How to reach me</h2><p>${c.contact.ping}</p><p><a class="u" href="./contact.html">→ Write a message</a></p></div>
      <div><h2>Elsewhere</h2>${c.socials.map((s) => ext(s.href, `→ ${s.label}`, "u")).join("<br />")}</div>
      <div><h2>Availability</h2><p>${c.contact.availability}</p><p><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">→ ${c.nav.resume}</a></p></div>
      <div><h2>Local time</h2><p>${c.person.location}<br /><span data-clock></span> IST</p></div>
    </div>
    <div class="bar-end"><span>${c.footer.copyright}</span><a class="u" href="#">↑ Top</a></div>
  </footer>`;

const workList = (c) =>
  list(
    "Selected Work",
    c.work.map((w) => {
      const href = projectHref(w);
      const name = href ? `<a class="u" href="${href}">${w.title}</a>` : w.title;
      return [w.year, `${name} <span class="dim">— ${w.role}</span><br /><span class="dim">${w.summary}</span>`, thumbOf(w)];
    })
  );

const facts = (c) => `
  ${list("Awards & Recognition", c.recognition.map((r) => [r.year, `${r.title}<br /><span class="dim">${r.detail}</span>`]))}
  ${list("Education", c.education.map((e) => [e.years.replace(" — ", " –<br />"), `${e.degree}, ${e.school}<br /><span class="dim">${e.note}</span>`]))}
  ${list("Stack", c.stack.map((s) => [s.label, s.items.join(", ")]))}`;

/** Duotone figure; a second layer shows the hovered project's cover. */
const figure = (portrait, name) => `
  <div class="figure" data-clip data-delay="0.3">
    ${fig(portrait, { cls: "portrait", alt: name, veil: true })}
    <figure class="swap m" aria-hidden="true"><img alt="" /></figure>
  </div>`;

/* ---------- pages ---------- */

const pages = {
  index: ({ c, portrait }) => `
    <div class="grid">
      <div class="left sticky" id="about">
        <div class="text">
          <p data-split>I'm ${c.person.name}, a ${c.person.role.toLowerCase()} in ${c.person.location.split(",")[0]}. ${em(c.hero.statement)}</p>
          ${c.about.body.map((p) => `<p data-split>${em(p)}</p>`).join("")}
          <p class="more" data-reveal><a class="u" href="./about.html">→ More about me</a></p>
        </div>
        ${figure(portrait, c.person.name)}
      </div>
      <div class="right">
        ${list("In numbers", c.hero.proof.map((p) => [p.value, p.label]))}
        <div id="work">${workList(c)}</div>
        ${list(c.focus.title, c.focus.items.map((f) => [f.n, `${f.title}<br /><span class="dim">${f.body}</span>`]))}
        ${facts(c)}
      </div>
    </div>`,

  work: ({ c, project: w, next }) => {
    const img = imagesOf(w);
    const gallery = [...img.gallery];
    return `
    <div class="grid">
      <div class="left sticky">
        <div class="text">
          <h1 class="ptitle" data-split>${w.title}</h1>
          <p data-split>${w.tagline}</p>
          <p class="dim" data-split>${w.overview}</p>
        </div>
        <dl class="meta" data-reveal>
          <dt>Year</dt><dd>${w.year}</dd>
          <dt>Role</dt><dd>${w.role}</dd>
          <dt>Stack</dt><dd>${w.stack.join(", ")}</dd>
          ${w.status ? `<dt>Status</dt><dd>${w.status}</dd>` : ""}
        </dl>
        <div data-reveal>${actions(w.links)}</div>
      </div>
      <div class="right">
        ${fig(img.cover, { cls: "pimg", alt: `${w.title} cover`, attrs: "data-clip" })}
        ${w.metrics?.length ? list("In numbers", w.metrics.map((m) => [m.value, m.label])) : ""}
        ${list(c.nav.highlights, w.highlights.map((h, i) => [pad(i), h]))}
        ${w.sections
          .map((s, i) => `
          <section class="cv sec" data-reveal>
            <h2>${pad(i)} ${s.kicker}</h2>
            <h3>${s.title}</h3>
            <p>${s.body}</p>
          </section>
          ${gallery.length ? fig(gallery.shift(), { cls: "pimg", alt: "", attrs: "data-clip" }) : ""}`)
          .join("")}
        ${gallery.map((g) => fig(g, { cls: "pimg", alt: "", attrs: "data-reveal" })).join("")}
        <div data-reveal>${actions(w.links)}</div>
        <a class="next" href="./work.html?p=${next.slug}" data-reveal><span class="dim">${c.nav.next}</span><br />→ ${next.title}</a>
      </div>
    </div>`;
  },

  about: ({ c, portrait, photos }) => `
    <div class="grid">
      <div class="left">
        <div class="text">
          <h1 class="ptitle" data-split>${em(c.about.statement)}</h1>
          ${c.about.story.map((p) => `<p data-split>${em(p)}</p>`).join("")}
        </div>
        ${figure(portrait, c.person.name)}
      </div>
      <div class="right">
        ${list("Principles", c.about.principles.map((p, i) => [pad(i), `${p.title}<br /><span class="dim">${p.body}</span>`]))}
        ${list("Now", c.about.now.map((n) => [n.label, n.value]))}
        ${list("Timeline", c.about.timeline.map((t) => [t.year, `${t.title}<br /><span class="dim">${t.detail}</span>`]))}
        ${facts(c)}
        ${list("Writing", c.writing.map((b) => [b.date, `${ext(b.url, b.title, "u")}<br /><span class="dim">${b.topic} · ${b.read}</span>`]))}
      </div>
    </div>
    <section class="photos">${photos.map((p, i) => fig(p, { alt: "", attrs: `data-clip data-delay="${i * 0.12}"` })).join("")}</section>`,

  contact: ({ c }) => `
    <div class="grid">
      <div class="left">
        <div class="text">
          <h1 class="ptitle" data-split>${em(c.contact.headline)}</h1>
          <p data-split>${c.contact.availability}</p>
        </div>
        <dl class="meta" data-reveal>
          <dt>Email</dt><dd><a class="u" href="mailto:${c.person.email}">${email(c.person.email)}</a></dd>
          <dt>Local</dt><dd>${c.person.location} · <span data-clock></span></dd>
          <dt>Elsewhere</dt><dd>${c.socials.map((s) => ext(s.href, `→ ${s.label}`, "u")).join("<br />")}</dd>
          <dt>${c.nav.resume}</dt><dd><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">→ PDF</a></dd>
        </dl>
      </div>
      <div class="right" data-reveal>${formFields()}</div>
    </div>`,
};

boot(
  "blueprint",
  (ctx) => `${header(ctx)}<main class="p-${ctx.page}">${pages[ctx.page](ctx)}</main>${footer(ctx)}`,
  () => {
    // Hovering a work row swaps the figure to that project's cover.
    const swap = document.querySelector(".swap");
    if (!swap) return;
    const img = swap.querySelector("img");
    document.querySelectorAll("[data-cover]").forEach((dd) => {
      dd.addEventListener("mouseenter", () => {
        img.src = dd.dataset.cover;
        gsap.to(swap, { autoAlpha: 1, duration: reduced ? 0 : 0.5, ease: "power2.out" });
      });
      dd.addEventListener("mouseleave", () => gsap.to(swap, { autoAlpha: 0, duration: reduced ? 0 : 0.5 }));
    });
  }
);
