/**
 * Global preloader: a die with the five themes on it. Every visit to `/` rolls
 * a fresh random theme (never the same one twice in a row), lands on it and
 * sends the visitor to that theme's home page.
 */
import { variants } from "./config/theme.js";
import { getLastRoll, setLastRoll, setSessionTheme } from "./shared/theme-choice.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const die = document.getElementById("die");
const label = document.getElementById("label");
const name = document.getElementById("name");

// Faces 1–5 are the themes; face 6 carries the monogram.
die.innerHTML =
  variants
    .map((v, i) => `<div class="face f${i + 1}"><b>0${i + 1}</b><span class="mono">${v.name}</span><i style="background:${v.accent}"></i></div>`)
    .join("") + `<div class="face f6"><b>RM</b><span class="mono">Portfolio</span></div>`;

// Cube rotation that brings each face to the front.
const FACE = [
  { x: 0, y: 0 },   // 1 front
  { x: 0, y: -90 }, // 2 right
  { x: 0, y: 180 }, // 3 back
  { x: 0, y: 90 },  // 4 left
  { x: -90, y: 0 }, // 5 top
];

// Uniform random over the themes, skipping the one rolled last time.
const last = variants.findIndex((v) => v.key === getLastRoll());
const pool = variants.map((_, i) => i).filter((i) => i !== last);
const pick = pool[crypto.getRandomValues(new Uint32Array(1))[0] % pool.length];
setLastRoll(variants[pick].key);
const target = variants[pick];
const { x, y } = FACE[pick];

const land = () => {
  label.textContent = `Theme 0${pick + 1} / 0${variants.length}`;
  name.textContent = target.name;
  // Fade into the chosen theme's colours, then hand over.
  setTimeout(() => {
    document.body.style.background = target.bg;
    document.body.style.color = target.ink;
    document.body.classList.add("is-out");
  }, reduced ? 300 : 650);
  setTimeout(() => {
    setSessionTheme(target.key);
    location.replace(`/${target.key}/`);
  }, reduced ? 700 : 1250);
};

if (reduced) {
  die.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  land();
} else {
  // Tumble: a few full turns on both axes, easing out onto the chosen face.
  const turnsX = 360 * (2 + Math.floor(Math.random() * 2));
  const turnsY = 360 * (3 + Math.floor(Math.random() * 2));
  const roll = die.animate(
    [
      { transform: "rotateX(-24deg) rotateY(32deg) scale(1)" },
      { transform: `rotateX(${turnsX * 0.55}deg) rotateY(${turnsY * 0.5}deg) scale(0.86)`, offset: 0.45 },
      { transform: `rotateX(${x + turnsX}deg) rotateY(${y + turnsY}deg) scale(1)` },
    ],
    { duration: 1700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
  );
  roll.onfinish = land;
}
