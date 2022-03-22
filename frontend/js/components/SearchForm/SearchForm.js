import { recentSearch, subCategories } from "../../data.js";
import {
  $,
  delay,
  hide,
  clearLocalStorage,
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
    <div class="select-category flex-col">
    <div class="selected-container flex-row">
      <div class="selected">전체</div>
      <button class="button-down"></button>
    </div>
      <ul>
      ${subCategories.reduce(
        (acc, el) => acc + `<li data-name="${el}">${el}</li>`,
        ""
      )}
      </ul>
    </div>
    <div class="flex-row">
      <div class="search-input flex-col">
        <input placeholder="찾고 싶은 상품을 검색해보세요!"></input>
        <div class="recent">
          <h3>최근 검색어</h3>
          <ol>
            ${recentSearch.reduce((acc, el) => acc + `<li>${el}</li>`, "")}
          </ol>
          <div class="search-footer flex-row">
            <button data-name="전체삭제">전체삭제</button>
            <button data-name="최근검색어끄기">최근검색어끄기</button>
          </div>
        </div>
        <div class="recommend">
        </div>
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
  const selectedEl = $(".selected-container");
  inputEl.addEventListener("focus", recentSearchFocusHandler);
  inputEl.addEventListener("blur", recentSearchBlurHandler);
  searchFooterEl.addEventListener("mousedown", searchFooterBtnHandler);
  iconSearchEl.addEventListener("click", searchBtnHandler);
  selectedEl.addEventListener("click", selectCategoryHandler);
  $(".select-category ul").addEventListener("click", listClickHandler);
};

function recentSearchFocusHandler(e) {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  const inputEl = $(".search-input input");
  inputEl.value ? show(recommendEl) : show(recentEl);
}

function recentSearchBlurHandler(e) {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  hide(recentEl);
  hide(recommendEl);
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
    clearLocalStorage("recentSearch");
    location.reload();
    return;
  }
  if (name === "최근검색어끄기") {
    hide($(".recent"));
    return;
  }
}

function selectCategoryHandler(e) {
  const categoryEl = $(".select-category ul");
  const { transform } = categoryEl.style;
  const isClosed = transform === "scaleY(0)" || transform === "";
  isClosed ? openDropdown() : closeDropdown();
}

function openDropdown() {
  $(".select-category ul").style.transform = "scaleY(1)";
}

function closeDropdown() {
  $(".select-category ul").style.transform = "scaleY(0)";
}

function listClickHandler(e) {
  const { name } = e.target.dataset;
  selectCategory(name);
  closeDropdown();
}

function selectCategory(category) {
  $(".selected").innerText = category;
}
