import { boot, gsap, ScrollTrigger, reduced, ext, workLinks, actions, fig } from "../src/shared/boot.js";
import { em } from "../src/config/content.js";
import { projectHref, imagesOf, thumbOf } from "../src/shared/data.js";
import { formFields } from "../src/shared/form.js";
import "./style.css";

const star = `<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`;
const sign = `<span class="sign" aria-hidden="true"><i></i><i></i></span>`;
const pad = (i) => String(i + 1).padStart(2, "0");

/**
 * A ledger row. Big word on the left; on the right a kicker, a label and
 * either a +/− panel (body) or a link (href).
 */
const row = ({ title, kicker = "", label, body, open, href, size = "" }) => `
  <li class="row ${size}${open ? " is-open" : ""}">
    ${href ? `<a class="row-link" href="${href}"${/^https?:|\.pdf/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ""}>` : ""}
    <h3 class="big" data-split>${title}</h3>
    <div class="side">
      <p class="kicker">${kicker}</p>
      ${href || !body
        ? `<p class="toggle"><span>${label}</span>${href ? '<span class="go">↗</span>' : ""}</p>`
        : `<button class="toggle" aria-expanded="${!!open}"><span>${label}</span>${sign}</button>
           <div class="panel"${open ? "" : " hidden"}><div class="panel-in">${body}</div></div>`}
    </div>
    ${href ? "</a>" : ""}
  </li>`;

/* ---------- chrome ---------- */

const header = ({ c, page }) => `
  <div class="ghost" aria-hidden="true">${page === "work" ? "" : c.person.role}</div>
  <nav class="nav" aria-label="Pages">
    <a href="./index.html" class="${page === "index" ? "on" : ""}">01.${c.nav.home}</a>
    <a href="./index.html#work" class="${page === "work" ? "on" : ""}">02.${c.nav.work}</a>
    <a href="./about.html" class="${page === "about" ? "on" : ""}">03.${c.nav.about}</a>
    <a href="./contact.html" class="${page === "contact" ? "on" : ""}">${star}${c.nav.contact}</a>
  </nav>`;

const footer = ({ c }) => `
  <footer class="foot" id="contact">
    <a class="foot-big" href="mailto:${c.person.email}"><span>${c.contact.title}</span><span class="go">↗</span></a>
    <div class="foot-grid">
      <p><span class="label">Direct</span><a class="hl" href="mailto:${c.person.email}">${c.person.email}</a><br /><a class="hl" href="./contact.html">Write a message</a><br /><a class="hl" href="${c.person.resume}" target="_blank" rel="noopener">${c.nav.resume}</a></p>
      <p><span class="label">Elsewhere</span>${c.socials.map((s) => ext(s.href, s.label, "hl")).join("<br />")}</p>
      <p><span class="label">How to reach me</span>${c.contact.ping}<br /><span class="dim">${c.contact.line}</span></p>
      <p><span class="label">Local</span>${c.person.location} · <span data-clock></span><br /><span class="dim">${c.contact.availability}</span></p>
    </div>
    <div class="foot-end"><a href="#" class="foot-star" aria-label="Back to top">${star}</a><span>${c.footer.copyright}</span></div>
  </footer>`;

const strip = (label, items) => `
  <section class="strip" aria-label="${label}">
    <p class="label">${label}</p>
    <ol>${items.map(([n, t, b]) => `<li data-reveal><span>${n}</span><h4>${t}</h4><p>${b}</p></li>`).join("")}</ol>
  </section>`;

const facts = (c) => `
  <section class="facts">
    <div data-reveal>
      <p class="label">Recognition</p>
      ${c.recognition.map((r) => `<p>${r.title} <span class="mono">(${r.year})</span><br /><span class="dim">${r.detail}</span></p>`).join("")}
    </div>
    <div data-reveal>
      <p class="label">Education</p>
      ${c.education.map((e) => `<p>${e.school} <span class="mono">(${e.years})</span><br /><span class="dim">${e.degree} — ${e.note}</span></p>`).join("")}
    </div>
    <div data-reveal>
      <p class="label">Stack</p>
      ${c.stack.map((s) => `<p><span class="mono">${s.label}</span><br /><span class="dim">${s.items.join(", ")}</span></p>`).join("")}
    </div>
  </section>`;

/* ---------- pages ---------- */

const pages = {
  index: ({ c, portrait }) => `
    <ol class="ledger" id="profile">
      ${row({
        title: c.person.name,
        kicker: `(${c.person.location})`,
        label: `A. ${c.person.role}`,
        open: true,
        body: `<p>${c.about.lead}</p>${c.about.body.map((p) => `<p class="dim">${em(p)}</p>`).join("")}
               <p class="links"><a href="./about.html">More about me ↗</a></p>
               ${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true })}`,
      })}
    </ol>

    <section class="proof">${c.hero.proof.map((p) => `<div data-reveal><strong>${p.value}</strong><span>${p.label}</span></div>`).join("")}</section>

    ${strip(c.focus.title, c.focus.items.map((f) => [f.n, f.title, f.body]))}

    <ol class="ledger" id="work">
      ${c.work
        .map((w) => {
          const href = projectHref(w);
          return row({
            title: w.title,
            kicker: `(${w.year})`,
            label: w.role,
            body: `${fig(thumbOf(w), { cls: "cover", alt: "" })}
                   <p>${w.summary}</p><p class="mono">${w.stack.join(" / ")}</p>
                   <p class="links">${href ? `<a href="${href}">Read the case ↗</a>` : ""}${workLinks(w.links)}</p>`,
          });
        })
        .join("")}
    </ol>

    ${facts(c)}`,

  work: ({ c, project: w, next }) => {
    const img = imagesOf(w);
    return `
    <ol class="ledger">
      ${row({
        title: w.title,
        kicker: `(${w.year} — ${w.role})`,
        label: w.tagline,
        open: true,
        body: `<p>${w.overview}</p>${w.status ? `<p class="dim">${w.status}</p>` : ""}
               <p class="mono">${w.stack.join(" / ")}</p>${actions(w.links)}`,
      })}
    </ol>

    ${fig(img.cover, { cls: "hero-img", alt: `${w.title} cover`, attrs: "data-clip" })}

    ${w.metrics?.length ? `<ol class="ledger metrics">${w.metrics.map((m) => row({ title: m.value, label: m.label, size: "sm", body: "" })).join("")}</ol>` : ""}

    <ol class="ledger">
      ${row({ title: "Highlights", kicker: "(Engineering)", label: c.nav.highlights, size: "md", open: true, body: `<ol class="hls">${w.highlights.map((h) => `<li>${h}</li>`).join("")}</ol>` })}
    </ol>

    <ol class="ledger">
      ${w.sections.map((s, i) => row({ title: s.kicker, kicker: `(${pad(i)})`, label: s.title, body: `<p>${s.body}</p>`, open: i === 0, size: "md" })).join("")}
    </ol>

    <section class="gallery">
      ${img.gallery.map((g, i) => `<div class="g" data-reveal>${fig(g, { alt: "" })}<p class="mono">Fig. ${pad(i)}</p></div>`).join("")}
    </section>

    <div class="end-actions" data-reveal>${actions(w.links)}</div>

    <ol class="ledger next">
      ${row({ title: next.title, kicker: `(${c.nav.next})`, label: next.role, href: `./work.html?p=${next.slug}` })}
    </ol>`;
  },

  about: ({ c, portrait, photos }) => `
    <ol class="ledger">
      ${row({
        title: c.nav.about,
        kicker: `(${c.person.name})`,
        label: `B. ${c.about.statement.replace(/\*/g, "")}`,
        open: true,
        body: `${c.about.story.map((p) => `<p>${em(p)}</p>`).join("")}${fig(portrait, { cls: "portrait", alt: c.person.name, veil: true })}`,
      })}
    </ol>

    <section class="photos">
      ${photos.map((p, i) => `<div data-reveal data-delay="${i * 0.1}">${fig(p, { alt: "" })}<p class="mono">(${pad(i)})</p></div>`).join("")}
    </section>

    <p class="label section-label">Principles</p>
    <ol class="ledger">
      ${c.about.principles.map((p, i) => row({ title: p.title, kicker: `(${pad(i)})`, label: "Why", body: `<p>${p.body}</p>`, open: i === 0, size: "md" })).join("")}
    </ol>

    ${strip("Now", c.about.now.map((n, i) => [pad(i), n.label, n.value]))}

    <p class="label section-label">Timeline</p>
    <ol class="ledger">
      ${c.about.timeline.map((t) => row({ title: t.year, kicker: "", label: t.title, size: "md", body: `<p class="dim">${t.detail}</p>`, open: true })).join("")}
    </ol>

    ${facts(c)}

    <p class="label section-label">Writing</p>
    <ol class="ledger">
      ${c.writing.map((b, i) => row({ title: `Part ${i + 1}`, kicker: `(${b.date} · ${b.read})`, label: b.topic, href: b.url, size: "md" })).join("")}
    </ol>`,

  contact: ({ c }) => `
    <ol class="ledger">
      ${row({
        title: c.nav.contact,
        kicker: `(${c.person.location} · <span data-clock></span>)`,
        label: `C. ${c.contact.title}`,
        open: true,
        body: `<p>${em(c.contact.headline)}</p><p class="dim">${c.contact.availability}</p>`,
      })}
    </ol>

    <ol class="ledger">
      ${row({ title: "Email", kicker: "(Direct)", label: c.person.email, href: `mailto:${c.person.email}`, size: "md" })}
      ${c.socials.map((s) => row({ title: s.label, kicker: "(Elsewhere)", label: s.href.replace(/^https?:\/\/(www\.)?/, ""), href: s.href, size: "md" })).join("")}
      ${row({ title: c.nav.resume, kicker: "(PDF)", label: "Download", href: c.person.resume, size: "md" })}
    </ol>

    <section class="form-wrap">
      <p class="label">Write</p>
      ${formFields()}
    </section>`,
};

boot(
  "ledger",
  (ctx) => `${header(ctx)}<main class="p-${ctx.page}">${pages[ctx.page](ctx)}</main>${footer(ctx)}`,
  () => {
    // Accordion: one row open at a time within each ledger.
    document.querySelectorAll(".ledger").forEach((ledger) => {
      const rows = [...ledger.querySelectorAll(":scope > .row")].filter((r) => r.querySelector("button.toggle"));
      const set = (r, open) => {
        const panel = r.querySelector(".panel");
        r.classList.toggle("is-open", open);
        r.querySelector(".toggle").setAttribute("aria-expanded", open);
        if (open) panel.hidden = false;
        gsap.fromTo(panel, { height: open ? 0 : panel.offsetHeight }, {
          height: open ? "auto" : 0,
          duration: reduced ? 0 : 0.7,
          ease: "expo.inOut",
          onComplete: () => { if (!open) panel.hidden = true; ScrollTrigger.refresh(); },
        });
      };
      rows.forEach((r) =>
        r.querySelector(".toggle").addEventListener("click", () => {
          const opening = !r.classList.contains("is-open");
          rows.forEach((o) => o !== r && o.classList.contains("is-open") && set(o, false));
          set(r, opening);
        })
      );
    });

    if (reduced) return;
    gsap.to(".ghost", { yPercent: -18, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
    gsap.to(".star", { rotate: 180, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1 } });
  }
);
