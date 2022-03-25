function $(selector) {
  return document.querySelector(selector);
}

function show(el) {
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}

function saveLocalStorage(key, value) {
  return localStorage.setItem(key, `${getLocalStorage(key) || ""}${value},`);
}

function setLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function clearLocalStorage(key) {
  return localStorage.setItem(key, "");
}

function reload() {
  document.location.reload();
}

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => res(), ms);
  });

let debounceTimer;
const debounce = (callback, ms) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, ms);
};

export {
  $,
  show,
  hide,
  saveLocalStorage,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  reload,
  delay,
  debounce,
};
