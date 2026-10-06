import { boot, gsap, reduced, ext, actions, fig } from "../src/shared/boot.js";
import { em } from "../src/config/content.js";
import { cases, projectHref, imagesOf, thumbOf } from "../src/shared/data.js";
import { formFields } from "../src/shared/form.js";
import "./style.css";

const STEP = 24; // degrees between dial items
const pad = (i) => String(i + 1).padStart(2, "0");

/* ---------- chrome ---------- */

const header = ({ c, page }) => `
  <header class="top">
    <a href="./index.html" class="mark">${c.person.first[0]}. <em>${c.person.last}</em></a>
    <nav class="mono" aria-label="Pages">
      <a href="./index.html#work" class="u${page === "work" ? " on" : ""}">${c.nav.work}</a>
      <a href="./about.html" class="u${page === "about" ? " on" : ""}">${c.nav.about}</a>
      <a href="./contact.html" class="u${page === "contact" ? " on" : ""}">${c.nav.contact}</a>
    </nav>
  </header>`;

const footer = ({ c, page }) => `
  <footer class="contact" id="contact">
    ${page === "contact" ? "" : `
      <p class="say" data-split>Say <em>hello</em> —</p>
      <a class="email" href="mailto:${c.person.email}" data-reveal>${c.person.email}</a>
      <p class="line" data-reveal>${c.contact.line}</p>`}
    <dl class="foot-grid mono">
      <div><dt>(Email)</dt><dd><a class="u" href="mailto:${c.person.email}">${c.person.email}</a></dd></div>
      <div><dt>(How to reach me)</dt><dd>${c.contact.ping}<br /><a class="u" href="./contact.html">Write a message ↗</a></dd></div>
      <div><dt>(Elsewhere)</dt><dd>${c.socials.map((s) => ext(s.href, s.label, "u")).join("<br />")}</dd></div>
      <div><dt>(Availability)</dt><dd>${c.contact.availability}<br /><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">${c.nav.resume} ↗</a></dd></div>
    </dl>
    <div class="fine mono">
      <span>${c.footer.copyright}</span>
      <span>${c.person.location} — <span data-clock></span></span>
    </div>
  </footer>`;

/** Serif index row: number, title, italic aside, mono right. */
const indexRow = ({ n, title, aside, right, href, cover, sum = "" }) => {
  const ext_ = /^https?:/.test(href || "");
  const open = href ? `a href="${href}"${ext_ ? ' target="_blank" rel="noopener noreferrer"' : ""}` : "div";
  return `
  <li data-reveal>
    <${open} class="w">
      <span class="mono n">${n}</span>
      <span class="w-title">${title}${href ? `<span class="go" aria-hidden="true">↗</span>` : ""}</span>
      <span class="w-role">${aside}</span>
      <span class="mono">${right}</span>
      ${cover ? fig(cover, { cls: "w-cover", alt: "" }) : ""}
    </${open.split(" ")[0]}>
    ${sum ? `<p class="w-sum">${sum}</p>` : ""}
  </li>`;
};

const facts = (c) => `
  <section class="facts mono">
    <div data-reveal><p class="label">(Recognition)</p>${c.recognition.map((r) => `<p>${r.title}, ${r.year}<br /><span>${r.detail}</span></p>`).join("")}</div>
    <div data-reveal><p class="label">(Education)</p>${c.education.map((e) => `<p>${e.school}<br /><span>${e.degree} · ${e.years} · ${e.note}</span></p>`).join("")}</div>
    <div data-reveal><p class="label">(Stack)</p>${c.stack.map((s) => `<p>${s.label}<br /><span>${s.items.join(", ")}</span></p>`).join("")}</div>
  </section>`;

/* ---------- pages ---------- */

const pages = {
  index: ({ c, portrait }) => `
    <section class="hero">
      <h1 class="statement" data-split data-delay="0.15">${em(c.hero.statement)}</h1>
      ${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.7"' })}
      <dl class="meta mono" data-reveal data-delay="0.6">
        <div><dt>Name</dt><dd>${c.person.name}</dd></div>
        <div><dt>Role</dt><dd>${c.person.role}</dd></div>
        <div><dt>Based</dt><dd>${c.person.location} — <span data-clock></span></dd></div>
        <div><dt>Status</dt><dd>${c.person.status}</dd></div>
      </dl>
    </section>

    <section class="two">
      <p class="label mono" data-reveal>(About)</p>
      <div>
        <p class="lead" data-split>${c.about.lead}</p>
        ${c.about.body.map((p) => `<p class="body" data-reveal>${em(p)}</p>`).join("")}
        <p class="body" data-reveal><a class="u mono" href="./about.html">More about me ↗</a></p>
      </div>
    </section>

    <section class="metrics proof">${c.hero.proof.map((p) => `<div data-reveal><strong>${p.value}</strong><span class="mono">${p.label}</span></div>`).join("")}</section>

    <section class="dial" id="focus" aria-label="${c.focus.title}">
      <p class="label mono dial-label">(${c.focus.title})</p>
      <div class="wheel" aria-hidden="true">
        <svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="49.8" /></svg>
        ${c.focus.items.map((f, i) => `<div class="spoke" style="--a:${i * STEP}deg"><i></i><span class="num">${f.n}</span></div>`).join("")}
      </div>
      <div class="readout" aria-live="polite">
        <h3 class="r-title">${c.focus.items[0].title}</h3>
        <p class="r-body">${c.focus.items[0].body}</p>
      </div>
      <ol class="plain">${c.focus.items.map((f) => `<li><span class="mono">${f.n}</span><h3>${f.title}</h3><p>${f.body}</p></li>`).join("")}</ol>
    </section>

    <section class="work" id="work">
      <p class="label mono" data-reveal>(Selected work)</p>
      <ol>
        ${c.work.map((w, i) => indexRow({ n: pad(i), title: w.title, aside: w.role, right: w.year, href: projectHref(w), cover: thumbOf(w), sum: w.summary })).join("")}
      </ol>
    </section>

    ${facts(c)}`,

  work: ({ c, project: w, next }) => {
    const img = imagesOf(w);
    const gallery = [...img.gallery];
    return `
    <section class="phero">
      <p class="label mono" data-reveal>(Case ${pad(cases.indexOf(w))} of ${pad(cases.length - 1)})</p>
      <h1 class="ptitle" data-split data-delay="0.1">${w.title}</h1>
      <p class="ptag" data-split data-delay="0.3">${w.tagline}</p>
      <dl class="meta mono" data-reveal data-delay="0.5">
        <div><dt>Year</dt><dd>${w.year}</dd></div>
        <div><dt>Role</dt><dd>${w.role}</dd></div>
        <div><dt>Stack</dt><dd>${w.stack.join(", ")}</dd></div>
      </dl>
      <div data-reveal data-delay="0.6">${actions(w.links)}</div>
    </section>

    ${fig(img.cover, { cls: "pcover", alt: `${w.title} cover`, attrs: "data-clip" })}

    <section class="two">
      <p class="label mono" data-reveal>(Overview)</p>
      <div>
        <p class="lead" data-split>${w.overview}</p>
        ${w.status ? `<p class="body" data-reveal><em>${w.status}</em></p>` : ""}
      </div>
    </section>

    ${w.metrics?.length ? `<section class="metrics">${w.metrics.map((m) => `<div data-reveal><strong>${m.value}</strong><span class="mono">${m.label}</span></div>`).join("")}</section>` : ""}

    <section class="two">
      <p class="label mono" data-reveal>(${c.nav.highlights})</p>
      <ol class="hls">${w.highlights.map((h) => `<li data-reveal>${h}</li>`).join("")}</ol>
    </section>

    ${w.sections
      .map((s, i) => `
      <section class="two sec">
        <p class="label mono" data-reveal>(${pad(i)}) ${s.kicker}</p>
        <div><h2 class="sec-title" data-split><em>${s.title}</em></h2><p class="body" data-reveal>${s.body}</p></div>
      </section>
      ${gallery.length ? fig(gallery.shift(), { cls: `shot${i % 2 ? " shot-r" : ""}`, alt: "", attrs: "data-clip" }) : ""}`)
      .join("")}

    ${gallery.length ? `<section class="grid2">${gallery.map((g) => fig(g, { alt: "", attrs: "data-reveal" })).join("")}</section>` : ""}

    <section class="two"><p class="label mono">(Links)</p><div data-reveal>${actions(w.links)}</div></section>

    <a class="next" href="./work.html?p=${next.slug}">
      <span class="label mono">(${c.nav.next})</span>
      <span class="next-title">${next.title} <em>↗</em></span>
    </a>`;
  },

  about: ({ c, portrait, photos }) => `
    <section class="hero hero-about">
      <h1 class="statement" data-split data-delay="0.15">${em(c.about.statement)}</h1>
      ${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true, attrs: 'data-reveal data-delay="0.6"' })}
    </section>

    <section class="photos">${photos.map((p, i) => fig(p, { cls: `ph ph-${i}`, alt: "", attrs: `data-clip data-delay="${i * 0.12}"` })).join("")}</section>

    <section class="two">
      <p class="label mono" data-reveal>(Story)</p>
      <div>${c.about.story.map((p, i) => `<p class="${i ? "body" : "lead"}" data-split>${em(p)}</p>`).join("")}</div>
    </section>

    <section class="work">
      <p class="label mono" data-reveal>(Principles)</p>
      <ol>${c.about.principles.map((p, i) => indexRow({ n: pad(i), title: p.title, aside: "", right: "", sum: p.body })).join("")}</ol>
    </section>

    <section class="two">
      <p class="label mono" data-reveal>(Now)</p>
      <dl class="meta mono now" data-reveal>${c.about.now.map((n) => `<div><dt>${n.label}</dt><dd>${n.value}</dd></div>`).join("")}</dl>
    </section>

    <section class="work">
      <p class="label mono" data-reveal>(Timeline)</p>
      <ol class="tl">${c.about.timeline.map((t) => indexRow({ n: t.year, title: t.title, aside: t.detail, right: "" })).join("")}</ol>
    </section>

    ${facts(c)}

    <section class="work">
      <p class="label mono" data-reveal>(Writing)</p>
      <ol>${c.writing.map((b, i) => indexRow({ n: pad(i), title: `Absurd JavaScript, part ${i + 1}`, aside: b.topic, right: `${b.date} · ${b.read}`, href: b.url })).join("")}</ol>
    </section>`,

  contact: ({ c }) => `
    <section class="phero">
      <p class="label mono" data-reveal>(${c.nav.contact})</p>
      <h1 class="say" data-split data-delay="0.1">Say <em>hello</em> —</h1>
      <p class="ptag" data-split data-delay="0.3">${em(c.contact.headline)}</p>
    </section>

    <section class="two">
      <dl class="meta mono stack" data-reveal>
        <div><dt>Email</dt><dd><a class="u" href="mailto:${c.person.email}">${c.person.email}</a></dd></div>
        <div><dt>Based</dt><dd>${c.person.location} — <span data-clock></span></dd></div>
        <div><dt>Availability</dt><dd>${c.contact.availability}</dd></div>
        <div><dt>Elsewhere</dt><dd>${c.socials.map((s) => ext(s.href, s.label, "u")).join(" · ")}</dd></div>
        <div><dt>${c.nav.resume}</dt><dd><a class="u" href="${c.person.resume}" target="_blank" rel="noopener">PDF ↗</a></dd></div>
      </dl>
      <div data-reveal data-delay="0.1">${formFields()}</div>
    </section>`,
};

boot(
  "dial",
  (ctx) => `${header(ctx)}<main class="p-${ctx.page}">${pages[ctx.page](ctx)}</main>${footer(ctx)}`,
  ({ c }) => {
    if (reduced || !document.querySelector(".wheel")) return;
    const items = c.focus.items;
    const nums = [...document.querySelectorAll(".spoke")];
    const title = document.querySelector(".r-title");
    const body = document.querySelector(".r-body");
    let current = 0;
    nums[0].classList.add("on");

    const setActive = (i) => {
      if (i === current) return;
      current = i;
      nums.forEach((n, k) => n.classList.toggle("on", k === i));
      gsap.to([title, body], {
        autoAlpha: 0, y: -8, duration: 0.2, ease: "power2.in",
        onComplete: () => {
          title.textContent = items[i].title;
          body.textContent = items[i].body;
          gsap.fromTo([title, body], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 });
        },
      });
    };

    // Desktop only: pin the section and turn the dial with scroll.
    gsap.matchMedia().add("(min-width: 860px)", () => {
      const last = items.length - 1;
      gsap.to(".wheel", {
        rotate: -last * STEP,
        ease: "none",
        scrollTrigger: {
          trigger: ".dial",
          pin: true,
          start: "top top",
          end: `+=${items.length * 55}%`,
          scrub: 0.8,
          snap: { snapTo: 1 / last, duration: 0.5, ease: "power2.inOut" },
          onUpdate: (self) => setActive(Math.round(self.progress * last)),
        },
      });
    });
  }
);
