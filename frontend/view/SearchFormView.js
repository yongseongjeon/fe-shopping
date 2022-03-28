import { recentSearch, subCategories } from "../js/data.js";
import { $, hide, show } from "../js/utils.js";
import Component from "../js/Component.js";
import { reload } from "../js/utils.js";
import { searchFormModel } from "../model/SearchFormModel.js";

export default function SearchFormView(target) {
  Component.call(this, target);

  renderRecentSearch();
}

SearchFormView.prototype = Object.create(Component.prototype);

SearchFormView.prototype.template = function () {
  return `
  <div class="search-form flex-row">
    <div class="select-category flex-col">
    <div class="selected-container flex-row">
      <div class="selected">전체</div>
      <button class="button-down"></button>
    </div>
      <ul>
        ${createListEl(subCategories)}
      </ul>
    </div>
    <div class="flex-row">
      <div class="search-input flex-col">
        <input placeholder="찾고 싶은 상품을 검색해보세요!"></input>
        <div class="recent">
          <div class="recent-search">
            <h3>최근 검색어</h3>
            <ol>
              ${createListEl(recentSearch)}
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

SearchFormView.prototype.addEvent = function () {
  const inputEl = $(".search-input input");
  const iconSearchEl = $(".icon-search");
  const searchFooterEl = $(".search-footer");
  const selectedEl = $(".selected-container");
  const selectCategoryEl = $(".select-category ul");

  inputEl.addEventListener("focus", handleInputFocus);
  inputEl.addEventListener("blur", handleInputBlur);
  searchFooterEl.addEventListener("mousedown", handleSearchFooter);
  iconSearchEl.addEventListener("click", handleSearchBtn);
  selectedEl.addEventListener("click", handleCategorySelection);
  selectCategoryEl.addEventListener("click", handleList);
};

function createListEl(el) {
  return el.reduce((acc, el) => acc + `<li data-name="${el}">${el}</li>`, "");
}

function renderRecentSearch() {
  const isOnRecentSearch = searchFormModel.getRecentSearchState() === "true";
  if (isOnRecentSearch) {
    showRecentSearch();
    return;
  }
  hideRecentSearch();

  function showRecentSearch() {
    $(".history-off-msg__container").classList.add("hide");
    $(".recent-search-on-btn").classList.add("hide");
  }
  function hideRecentSearch() {
    $(".recent-search").classList.add("hide");
    $(".recent-search-off-btn").classList.add("hide");
  }
}

function handleInputFocus() {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  const inputEl = $(".search-input input");
  const FIRST_IDX = -1;
  searchFormModel.setIdx(FIRST_IDX);
  inputEl.value ? show(recommendEl) : show(recentEl);
}

function handleInputBlur() {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  hide(recentEl);
  hide(recommendEl);
  deleteUnderlineAtList();

  function deleteUnderlineAtList() {
    const selected = $(".search-selected");
    if (selected) {
      selected.className = "";
    }
  }
}

function handleSearchBtn() {
  const inputEl = $(".search-input input");
  const isOnRecentSearch = searchFormModel.getRecentSearchState() === "true";
  if (isOnRecentSearch) {
    searchFormModel.saveRecentSearch(inputEl.value);
  }
  clearValue(inputEl);

  function clearValue(el) {
    el.value = "";
  }
}

function handleSearchFooter(e) {
  const { name } = e.target.dataset;
  if (name === "전체삭제") {
    searchFormModel.clearRecentSearch();
    reload();
    return;
  }
  if (name === "최근검색어끄기") {
    offRecentSearch();
    return;
  }
  if (name === "최근검색어켜기") {
    onRecentSearch();
    return;
  }

  function offRecentSearch() {
    $(".recent-search").classList.add("hide");
    $(".history-off-msg__container").classList.remove("hide");
    $(".recent-search-off-btn").classList.add("hide");
    $(".recent-search-on-btn").classList.remove("hide");
    searchFormModel.toggleRecentSearch();
  }
  function onRecentSearch() {
    $(".recent-search").classList.remove("hide");
    $(".history-off-msg__container").classList.add("hide");
    $(".recent-search-on-btn").classList.add("hide");
    $(".recent-search-off-btn").classList.remove("hide");
    searchFormModel.toggleRecentSearch();
  }
}

function handleCategorySelection() {
  const categoryEl = $(".select-category ul");
  const { transform } = categoryEl.style;
  const isClosed = transform === "scaleY(0)" || transform === "";
  isClosed ? openDropdown() : closeDropdown();

  function openDropdown() {
    $(".select-category ul").style.transform = "scaleY(1)";
  }
  function closeDropdown() {
    $(".select-category ul").style.transform = "scaleY(0)";
  }
}

function handleList() {
  const { name } = e.target.dataset;
  selectCategory(name);
  closeDropdown();

  function selectCategory(category) {
    $(".selected").innerText = category;
  }
}
