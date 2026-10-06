/**
 * Which theme a visitor sees.
 *   session   the theme this tab is browsing (set by every variant page)
 *   last roll the dice's previous result, so it never lands on the same theme twice in a row
 * Storage can be blocked (private mode), so every access is guarded and the site
 * still works without it.
 */
const SESSION = "rm-theme-session";
const LAST = "rm-theme-last-roll";

const read = (store, key) => { try { return store.getItem(key); } catch { return null; } };
const write = (store, key, value) => { try { store.setItem(key, value); } catch {} };

export const getSessionTheme = () => read(sessionStorage, SESSION);
export const setSessionTheme = (key) => write(sessionStorage, SESSION, key);
export const getLastRoll = () => read(localStorage, LAST);
export const setLastRoll = (key) => write(localStorage, LAST, key);
