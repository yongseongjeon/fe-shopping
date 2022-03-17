export function $(selector) {
  return document.querySelector(selector);
}

export function show(el) {
  el.style.display = "block";
}

export function hide(el) {
  el.style.display = "none";
}

export function saveLocalStorage(key, value) {
  return localStorage.setItem(key, `${getLocalStorage(key) || ""}${value},`);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function initLocalStorage(key) {
  return localStorage.setItem(key, "");
}

export const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => res(), ms);
  });
