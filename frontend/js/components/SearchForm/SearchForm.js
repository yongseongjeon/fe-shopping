import { recentSearch } from "../../data.js";
import {
  $,
  getLocalStorage,
  hide,
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
            <button>전체삭제</button>
            <button>최근검색어끄기</button>
          </div>
        </div>
        <div class="recommend"></div>
      </div>
      <div class="icon-mic"></div>
      <div class="icon-search"></div>
    </div>
  </div>`;
};

SearchForm.prototype.addEvent = function () {
  const inputEl = $(".search-input input");
  inputEl.addEventListener("focus", recentSearchFocusHandler);
  inputEl.addEventListener("blur", recentSearchBlurHandler);
  $(".icon-search").addEventListener("click", searchBtnHandler);
};

function recentSearchFocusHandler(e) {
  const recentEl = $(".recent");
  const { name } = e.target.dataset;
  show(recentEl);
}

function recentSearchBlurHandler(e) {
  const recentEl = $(".recent");
  const { name } = e.target.dataset;
  hide(recentEl);
}

function searchBtnHandler(e) {
  const value = $(".search-input input").value;
  saveLocalStorage("recentSearch", value);
  $(".search-input input").value = "";
}
