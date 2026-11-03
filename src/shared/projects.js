import { content } from "../config/content.js";
import { cases, projectHref, thumbOf } from "./data.js";
import "./projects.css";

export const categories = [
  { id: "all", label: "All projects" },
  { id: "ai", label: "AI" },
  { id: "ml", label: "ML & search" },
  { id: "development", label: "Full-stack" },
  { id: "backend", label: "Backend" },
];

const params = () => new URLSearchParams(location.search);
const categoryFromURL = () => categories.find((c) => c.id === params().get("category"))?.id ?? "all";
const matches = (project, category) => category === "all" || project.categories?.includes(category);
const labelOf = (id) => categories.find((c) => c.id === id)?.label;
const number = (n) => String(n + 1).padStart(2, "0");
const categoryOptions = (selected) => categories.map((c) => `<option value="${c.id}"${c.id === selected ? " selected" : ""}>${c.label}</option>`).join("");
const syncThemeLinks = () => document.querySelectorAll(".ts-menu a").forEach((a) => {
  const url = new URL(a.href);
  url.search = location.search;
  a.href = url.href;
});

function projectRow(w, index) {
  const href = projectHref(w);
  return `<li class="catalog-row" data-project="${w.slug}"${matches(w, categoryFromURL()) ? "" : " hidden"}>
    <a class="catalog-image m" href="${href}" tabindex="-1" aria-hidden="true"><img src="${thumbOf(w)}" alt="" loading="lazy" width="1200" height="900" /></a>
    <article class="catalog-copy">
      <p class="catalog-meta">${number(index)} / ${w.year} <span>${(w.categories ?? []).map(labelOf).join(" · ")}</span></p>
      <h2><a href="${href}">${w.title} <span aria-hidden="true">↗</span></a></h2>
      <p class="catalog-role">${w.role}</p>
      <p class="catalog-summary">${w.summary}</p>
      <p class="catalog-stack">${w.stack.slice(0, 5).join(" / ")}</p>
      <div class="catalog-actions"><a href="${href}">Read case study ↗</a>${w.links.live ? `<a href="${w.links.live}" target="_blank" rel="noopener noreferrer">Live site ↗</a>` : ""}</div>
    </article>
  </li>`;
}

export function projectsPage() {
  const selected = categoryFromURL();
  return `<section class="project-catalog" aria-labelledby="projects-title">
    <header class="catalog-heading">
      <p class="catalog-eyebrow">The complete collection / ${number(cases.length - 1)}</p>
      <h1 id="projects-title">Projects<span>.</span></h1>
      <p>From AI agents and retrieval to realtime services and full-stack applications. Explore the work, the engineering decisions, and the products you can try.</p>
    </header>
    <div class="catalog-tools">
      <div class="catalog-filters" role="group" aria-label="Filter projects by category">${categories.map((c) => `<button type="button" data-category="${c.id}" aria-pressed="${selected === c.id}" aria-controls="project-list">${c.label}<span>${cases.filter((w) => matches(w, c.id)).length}</span></button>`).join("")}</div>
      <p class="catalog-count" role="status" aria-live="polite" aria-atomic="true">${cases.filter((w) => matches(w, selected)).length} of ${cases.length} projects</p>
    </div>
    <ol id="project-list" class="catalog-list">${cases.map(projectRow).join("")}</ol>
  </section>`;
}

function caseBrowser(project) {
  const selected = categoryFromURL();
  return `<nav class="case-browser" aria-label="Browse projects">
    <a class="catalog-all" href="./projects.html${selected === "all" ? "" : `?category=${selected}`}">← All projects</a>
    <label>Category<select id="case-category">${categoryOptions(selected)}</select></label>
    <label>Project<select id="case-project" aria-label="Choose a project">${projectOptions(selected, project)}</select></label>
    <p class="sr-only" id="case-filter-status" role="status" aria-live="polite"></p>
  </nav>`;
}

function projectOptions(category, current) {
  const filtered = cases.filter((w) => matches(w, category));
  const selected = filtered.includes(current);
  return `${selected ? "" : '<option value="">Choose a project</option>'}${filtered.map((w) => `<option value="${w.slug}"${w === current ? " selected" : ""}>${w.title}</option>`).join("")}`;
}

export function wireProjects(ctx) {
  if (ctx.page === "index") {
    document.querySelector("#work")?.insertAdjacentHTML("afterend", `<p class="projects-more"><a href="./projects.html">View all ${content.work.length} projects <span aria-hidden="true">↗</span></a></p>`);
  }
  if (ctx.page === "projects") {
    const update = () => {
      const category = categoryFromURL();
      document.querySelectorAll("[data-category]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.category === category));
      document.querySelectorAll("[data-project]").forEach((row) => {
        row.hidden = !matches(cases.find((w) => w.slug === row.dataset.project), category);
        row.querySelectorAll('a[href*="work.html"]').forEach((a) => {
          const url = new URL(a.href);
          if (category === "all") url.searchParams.delete("category"); else url.searchParams.set("category", category);
          a.href = url.href;
        });
      });
      document.querySelector(".catalog-count").textContent = `${cases.filter((w) => matches(w, category)).length} of ${cases.length} projects`;
      ctx.lenis?.resize();
      // Keep theme switching attached to the filter currently shown.
      syncThemeLinks();
    };
    document.querySelector(".catalog-filters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const url = new URL(location.href);
      if (button.dataset.category === "all") url.searchParams.delete("category"); else url.searchParams.set("category", button.dataset.category);
      if (url.href !== location.href) history.pushState(null, "", url);
      update();
    });
    addEventListener("popstate", update);
    update();
  }
  if (ctx.page === "work") {
    const main = document.querySelector("main");
    main.insertAdjacentHTML("afterbegin", caseBrowser(ctx.project));
    const category = document.querySelector("#case-category");
    const project = document.querySelector("#case-project");
    category.addEventListener("change", () => {
      project.innerHTML = projectOptions(category.value, ctx.project);
      const suffix = category.value === "all" ? "" : `?category=${category.value}`;
      document.querySelector(".catalog-all").href = `./projects.html${suffix}`;
      document.querySelector("#case-filter-status").textContent = `${cases.filter((w) => matches(w, category.value)).length} projects available`;
      const url = new URL(location.href);
      if (category.value === "all") url.searchParams.delete("category"); else url.searchParams.set("category", category.value);
      history.replaceState(null, "", url);
      syncThemeLinks();
    });
    project.addEventListener("change", () => {
      if (!cases.some((w) => w.slug === project.value)) return;
      location.href = `./work.html?p=${project.value}${category.value === "all" ? "" : `&category=${category.value}`}`;
    });
  }
}
