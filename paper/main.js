import { boot, gsap, SplitText, reduced, ext, actions, fig } from "../src/shared/boot.js";
import { em } from "../src/config/content.js";
import { cases, projectHref, imagesOf, thumbOf } from "../src/shared/data.js";
import { formFields } from "../src/shared/form.js";
import "./style.css";

const arrow = `<svg class="arw" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 3.5V10H3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
const back = `<svg class="arw" viewBox="0 0 12 12" aria-hidden="true"><path d="M10 10L2 2M2 8.5V2h6.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
const lower = (s) => s.toLowerCase();

/* ---------- chrome ---------- */

const header = ({ c, page }) => `
  <header class="top">
    <a href="./index.html" class="mark">${lower(c.person.name)}/</a>
    <nav aria-label="Pages">
      ${[["index.html#work", c.nav.work, "work"], ["about.html", c.nav.about, "about"], ["contact.html", c.nav.contact, "contact"]]
        .map(([h, l, p]) => `<a href="./${h}" class="${page === p ? "accent" : ""}">${lower(l)}</a>`)
        .join("")}
    </nav>
    <a href="${c.person.resume}" target="_blank" rel="noopener">${lower(c.nav.resume)}</a>
  </header>`;

const footer = ({ c }) => `
  <footer id="contact" class="foot">
    <a href="#" class="up" aria-label="Back to top">
      <svg viewBox="0 0 20 28" aria-hidden="true"><path d="M10 26V4M4 10l6-6 6 6" fill="none" stroke="currentColor" stroke-width="1"/></svg>
    </a>
    <p class="foot-h">${c.contact.title.toLowerCase()}.</p>
    <dl class="addr">
      <dt>E</dt>
      <dd>${c.contact.line}<br /><a class="accent" href="mailto:${c.person.email}">${arrow}${c.person.email}</a></dd>
      <dt>P</dt>
      <dd>${c.contact.ping}<br /><a class="accent" href="./contact.html">${arrow}write a message</a></dd>
      <dt>A</dt>
      <dd>${c.contact.availability}</dd>
      <dt>L</dt>
      <dd>${c.person.location}<br /><span data-clock></span> IST</dd>
      <dt>S</dt>
      <dd class="socials">${c.socials.map((s) => ext(s.href, arrow + s.label, "accent")).join("")}<a class="accent" href="${c.person.resume}" target="_blank" rel="noopener">${arrow}${c.nav.resume}</a></dd>
      <dt></dt>
      <dd class="copy">${c.footer.copyright}</dd>
    </dl>
  </footer>`;

/** Big lowercase word sitting on a hairline (the tacto "unlock"). */
const title = (word, sub, delay = 0) => `
  <h1 class="name" data-chars>${lower(word)}</h1>
  <div class="rule" data-rule data-delay="${0.3 + delay}"></div>
  ${sub ? `<p class="role" data-split data-delay="${0.5 + delay}">${sub}</p>` : ""}`;

const row = ({ tag, date, title, body, extra = "", thumb = "", href }) => {
  const inner = `
    <span class="tag">${tag}</span>
    <span class="date">${date}</span>
    <div class="body"><h3>${title}</h3>${body ? `<p>${body}</p>` : ""}${extra}</div>
    ${thumb}`;
  return `<li class="row" data-reveal>${href ? `<a class="row-in" href="${href}">${inner}</a>` : `<div class="row-in">${inner}</div>`}</li>`;
};

const facts = (c) => `
  <section class="facts block">
    <div data-reveal>
      <h2 class="h">Recognition</h2>
      ${c.recognition.map((r) => `<p><span class="date">${r.year}</span>${r.title}<br /><small>${r.detail}</small></p>`).join("")}
    </div>
    <div data-reveal data-delay="0.08">
      <h2 class="h">Education</h2>
      ${c.education.map((e) => `<p><span class="date">${e.years}</span>${e.school}<br /><small>${e.degree} · ${e.note}</small></p>`).join("")}
    </div>
    <div data-reveal data-delay="0.16">
      <h2 class="h">Stack</h2>
      ${c.stack.map((s) => `<p><span class="date">${s.label}</span>${s.items.join(", ")}</p>`).join("")}
    </div>
  </section>`;

/* ---------- pages ---------- */

const pages = {
  index: ({ c, portrait }) => `
    <section class="hero">
      ${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.6"' })}
      ${title(c.person.name, `${lower(c.person.role)}.`)}
      <p class="note" data-reveal data-delay="0.7">${c.hero.note.join("<br />")}</p>
    </section>

    <section class="intro">
      <p class="intro-meta" data-reveal>${c.person.status}<br />${c.person.location}<br /><span data-clock></span> local</p>
      <p class="intro-lead" data-split>${c.about.lead}</p>
    </section>

    <section class="proof block">
      ${c.hero.proof.map((p, i) => `<div data-reveal data-delay="${i * 0.06}"><strong>${p.value}</strong><span>${p.label}</span></div>`).join("")}
    </section>

    <nav class="jump" aria-label="Sections">
      <a href="./about.html" data-reveal>${arrow}<span>Who<br />I Am</span></a>
      <a href="#focus" data-reveal data-delay="0.08">${arrow}<span>What<br />I Do</span></a>
      <a href="#work" data-reveal data-delay="0.16">${arrow}<span>Selected<br />Work (${c.work.length})</span></a>
    </nav>

    <section id="work" class="block">
      <h2 class="h" data-reveal>Selected work</h2>
      <ol class="rows">
        ${c.work
          .map((w) =>
            row({
              tag: `"${w.role}"`,
              date: w.year,
              title: w.title,
              body: w.summary,
              href: projectHref(w),
              extra: projectHref(w) ? `<span class="more accent">see details</span>` : "",
              thumb: fig(thumbOf(w), { cls: "thumb", alt: "" }),
            })
          )
          .join("")}
      </ol>
    </section>

    <section id="about" class="block">
      <h2 class="h" data-reveal>About</h2>
      <div class="about">
        ${c.about.body.map((p) => `<p data-split>${em(p)}</p>`).join("")}
        <p class="more-link" data-reveal><a class="accent" href="./about.html">${arrow}more about me</a></p>
      </div>
    </section>

    <section id="focus" class="block">
      <h2 class="h" data-reveal>${c.focus.title}</h2>
      <ol class="rows">${c.focus.items.map((f) => row({ tag: f.n, date: "", title: f.title, body: f.body })).join("")}</ol>
    </section>

    ${facts(c)}`,

  work: ({ c, project: w, next }) => {
    const img = imagesOf(w);
    const gallery = [...img.gallery];
    return `
    <section class="hero hero-sm">
      <a href="./index.html#work" class="crumb" data-reveal>${back}${lower(c.nav.all)}</a>
      ${title(w.title, w.tagline)}
    </section>

    <dl class="meta" data-reveal data-delay="0.6">
      <div><dt>Year</dt><dd>${w.year}</dd></div>
      <div><dt>Role</dt><dd>${w.role}</dd></div>
      <div><dt>Stack</dt><dd>${w.stack.join(", ")}</dd></div>
    </dl>
    <div data-reveal data-delay="0.7">${actions(w.links)}</div>

    ${fig(img.cover, { cls: "cover", alt: `${w.title} cover`, attrs: "data-clip" })}

    <section class="intro">
      <p class="intro-meta" data-reveal>Overview${w.status ? `<br /><br />${w.status}` : ""}</p>
      <p class="intro-lead big" data-split>${w.overview}</p>
    </section>

    ${w.metrics?.length ? `<section class="metrics block">${w.metrics.map((m) => `<div data-reveal><strong>${m.value}</strong><span>${m.label}</span></div>`).join("")}</section>` : ""}

    <section class="block">
      <h2 class="h" data-reveal>${c.nav.highlights}</h2>
      <ol class="hls">${w.highlights.map((h, i) => `<li data-reveal><span class="date">${String(i + 1).padStart(2, "0")}</span><p>${h}</p></li>`).join("")}</ol>
    </section>

    <section class="block">
      <h2 class="h" data-reveal>The work</h2>
      <ol class="rows">
        ${w.sections
          .map((s, i) => row({ tag: s.kicker, date: String(i + 1).padStart(2, "0"), title: s.title, body: s.body }) +
            (gallery.length ? `<li class="shot ${i % 2 ? "shot-r" : ""}">${fig(gallery.shift(), { alt: "", attrs: "data-clip" })}</li>` : ""))
          .join("")}
      </ol>
    </section>

    ${gallery.length ? `<section class="grid2 block">${gallery.map((g) => fig(g, { alt: "", attrs: "data-reveal" })).join("")}</section>` : ""}

    <div class="block">${actions(w.links)}</div>

    <a class="next block" href="./work.html?p=${next.slug}">
      <span class="tag">${lower(c.nav.next)}</span>
      <span class="next-title">${arrow}${lower(next.title)}</span>
    </a>`;
  },

  about: ({ c, portrait, photos }) => `
    <section class="hero hero-sm">
      ${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.6"' })}
      ${title(c.nav.about, em(c.about.statement))}
    </section>

    <section class="photos block">
      ${photos.map((p, i) => fig(p, { cls: `ph ph-${i}`, alt: "", attrs: `data-clip data-delay="${i * 0.12}"` })).join("")}
    </section>

    <section class="block">
      <h2 class="h" data-reveal>Story</h2>
      <div class="about">${c.about.story.map((p) => `<p data-split>${em(p)}</p>`).join("")}</div>
    </section>

    <section class="block">
      <h2 class="h" data-reveal>Principles</h2>
      <ol class="rows">${c.about.principles.map((p, i) => row({ tag: String(i + 1).padStart(2, "0"), date: "", title: p.title, body: p.body })).join("")}</ol>
    </section>

    <section class="block">
      <h2 class="h" data-reveal>Now</h2>
      <ol class="rows">${c.about.now.map((n) => row({ tag: n.label, date: "", title: n.value })).join("")}</ol>
    </section>

    <section class="block">
      <h2 class="h" data-reveal>Timeline</h2>
      <ol class="rows">${c.about.timeline.map((t) => row({ tag: "", date: t.year, title: t.title, body: t.detail })).join("")}</ol>
    </section>

    ${facts(c)}

    <section class="block">
      <h2 class="h" data-reveal>Writing</h2>
      <ol class="rows">
        ${c.writing
          .map((b) => `<li class="row" data-reveal><a class="row-in" href="${b.url}" target="_blank" rel="noopener noreferrer">
            <span class="tag">${b.topic}</span><span class="date">${b.date}</span>
            <div class="body"><h3>${b.title}</h3><p>${b.read} read · Hashnode</p></div>
</a></li>`)
          .join("")}
      </ol>
    </section>`,

  contact: ({ c }) => `
    <section class="hero hero-sm">
      ${title(c.nav.contact, em(c.contact.headline))}
    </section>

    <section class="contact block">
      <dl class="addr addr-sm" data-reveal>
        <dt>E</dt><dd><a class="accent" href="mailto:${c.person.email}">${arrow}${c.person.email}</a><br /><small>${c.contact.ping}</small></dd>
        <dt>L</dt><dd>${c.person.location}<br /><span data-clock></span> IST</dd>
        <dt>A</dt><dd>${c.contact.availability}</dd>
        <dt>S</dt><dd class="socials">${c.socials.map((s) => ext(s.href, arrow + s.label, "accent")).join("")}</dd>
        <dt>R</dt><dd><a class="accent" href="${c.person.resume}" target="_blank" rel="noopener">${arrow}${c.nav.resume}</a></dd>
      </dl>
      <div class="form" data-reveal data-delay="0.1">${formFields()}</div>
    </section>`,
};

boot(
  "paper",
  (ctx) => `${header(ctx)}<main class="p-${ctx.page}">${pages[ctx.page](ctx)}</main>${footer(ctx)}`,
  () => {
    if (reduced) return;
    // Big words: letters rise from behind the hairline.
    SplitText.create(".name", {
      type: "words,chars",
      mask: "chars",
      onSplit: (self) => gsap.from(self.chars, { yPercent: 100, duration: 1.3, ease: "expo.out", stagger: 0.035 }),
    });
  }
);
