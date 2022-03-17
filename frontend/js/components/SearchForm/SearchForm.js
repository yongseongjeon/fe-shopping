import { recentSearch } from "../../data.js";
import {
  $,
  delay,
  hide,
  initLocalStorage,
  saveLocalStorage,
  show,
} from "../../utils.js";
import Component from "/frontend/js/Component.js";

export default function SearchForm(target) {
  Component.call(this, target);
}

SearchForm.prototype = Object.create(Component.prototype);

SearchForm.prototype.template = function () {
  return `
  <div class="search-form flex-row">
    <div class="select-category"></div>
    <div class="flex-row">
      <div class="search-input flex-col">
        <input data-name="input-search"></input>
        <div class="recent">
          <h3>최근 검색어</h3>
          <ol>
            ${recentSearch.reduce((acc, x) => acc + `<li>${x}</li>`, "")}
          </ol>
          <div class="search-footer flex-row">
            <button data-name="전체삭제">전체삭제</button>
            <button data-name="최근검색어끄기">최근검색어끄기</button>
          </div>
        </div>
        <div class="recommend"></div>
      </div>
      <div class="icon-mic"></div>
      <a href="/frontend/index.html" class="icon-search"></a>
    </div>
  </div>`;
};

SearchForm.prototype.addEvent = function () {
  const inputEl = $(".search-input input");
  const iconSearchEl = $(".icon-search");
  const searchFooterEl = $(".search-footer");
  inputEl.addEventListener("focus", recentSearchFocusHandler);
  inputEl.addEventListener("blur", recentSearchBlurHandler);
  searchFooterEl.addEventListener("click", searchFooterBtnHandler);
  iconSearchEl.addEventListener("click", searchBtnHandler);
};

function recentSearchFocusHandler(e) {
  const recentEl = $(".recent");
  show(recentEl);
}

function recentSearchBlurHandler(e) {
  const recentEl = $(".recent");
  delay(100).then(() => hide(recentEl));
}

function searchBtnHandler(e) {
  const inputEl = $(".search-input input");
  saveLocalStorage("recentSearch", inputEl.value);
  clearValue(inputEl);
}

function clearValue(el) {
  el.value = "";
}

function searchFooterBtnHandler(e) {
  const { name } = e.target.dataset;
  if (name === "전체삭제") {
    initLocalStorage("recentSearch");
    location.reload();
    return;
  }
  if (name === "최근검색어끄기") {
    hide($(".recent"));
    return;
  }
}
