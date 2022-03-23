import { recentSearch, subCategories } from "/frontend/js/data.js";
import {
  $,
  delay,
  hide,
  clearLocalStorage,
  saveLocalStorage,
  show,
  getLocalStorage,
  setLocalStorage,
} from "/frontend/js/utils.js";
import Component from "/frontend/js/Component.js";

export default function SearchForm(target) {
  Component.call(this, target);

  (function renderWhetherOnRecentSearch() {
    if (getLocalStorage("isOnRecentSearch") === "true") {
      $(".history-off-msg__container").classList.add("hide");
      $(".recent-search-on-btn").classList.add("hide");
      return;
    }
    $(".recent-search").classList.add("hide");
    $(".recent-search-off-btn").classList.add("hide");
  })();
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
          <div class="recent-search">
            <h3>최근 검색어</h3>
            <ol>
              ${recentSearch.reduce((acc, el) => acc + `<li>${el}</li>`, "")}
            </ol>
          </div>
          <div class="history-off-msg__container">
            <div class="history-off-msg">최근 검색어 저장 기능이 꺼져 있습니다.</div>
          </div>
          <div class="search-footer flex-row">
            <button data-name="전체삭제">전체삭제</button>
            <button class="recent-search-off-btn" data-name="최근검색어끄기">최근검색어끄기</button>
            <button class="recent-search-on-btn" data-name="최근검색어켜기">최근검색어켜기</button>
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
  const selectCategoryEl = $(".select-category ul");
  inputEl.addEventListener("focus", recentSearchFocusHandler);
  inputEl.addEventListener("blur", recentSearchBlurHandler);
  inputEl.addEventListener("keydown", recentSearchKeyHandler);
  searchFooterEl.addEventListener("mousedown", searchFooterBtnHandler);
  iconSearchEl.addEventListener("click", searchBtnHandler);
  selectedEl.addEventListener("click", selectCategoryHandler);
  selectCategoryEl.addEventListener("click", listClickHandler);
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

function recentSearchKeyHandler(e) {
  const isPressEnter = e.keyCode === 13;
  if (isPressEnter) {
    searchBtnHandler();
    reload();
  }
  console.log(e.keyCode);
}

function reload() {
  document.location.reload();
}

function searchBtnHandler() {
  const inputEl = $(".search-input input");
  const isOnRecentSearch = getLocalStorage("isOnRecentSearch");
  if (isOnRecentSearch === "true") {
    saveLocalStorage("recentSearch", inputEl.value);
  }
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
    $(".recent-search").classList.add("hide");
    $(".history-off-msg__container").classList.remove("hide");
    $(".recent-search-off-btn").classList.add("hide");
    $(".recent-search-on-btn").classList.remove("hide");
    "isOnRecentSearch", "false";
    return;
  }
  if (name === "최근검색어켜기") {
    $(".recent-search").classList.remove("hide");
    $(".history-off-msg__container").classList.add("hide");
    $(".recent-search-on-btn").classList.add("hide");
    $(".recent-search-off-btn").classList.remove("hide");
    setLocalStorage("isOnRecentSearch", "true");
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
