<<<<<<< HEAD
import { recentSearch } from "../../data.js";
=======
import { recentSearch, subCategories } from "../../data.js";
>>>>>>> step2
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
<<<<<<< HEAD
        <li>전체</li>
        <li>여성패션</li>
        <li>남성패션</li>
        <li>남녀 공동 의류</li>
        <li>유아동패션</li>
        <li>뷰티</li>
=======
      ${subCategories.reduce((acc, el) => acc + `<li>${el}</li>`, "")}
>>>>>>> step2
      </ul>
    </div>
    <div class="flex-row">
      <div class="search-input flex-col">
        <input placeholder="찾고 싶은 상품을 검색해보세요!"></input>
        <div class="recent">
          <h3>최근 검색어</h3>
          <ol>
<<<<<<< HEAD
            ${recentSearch.reduce((acc, x) => acc + `<li>${x}</li>`, "")}
=======
            ${recentSearch.reduce((acc, el) => acc + `<li>${el}</li>`, "")}
>>>>>>> step2
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
  searchFooterEl.addEventListener("click", searchFooterBtnHandler);
  iconSearchEl.addEventListener("click", searchBtnHandler);
  selectedEl.addEventListener("click", selectCategoryHandler);
};

function recentSearchFocusHandler(e) {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  const inputEl = $(".search-input input");
  if (inputEl.value) {
    show(recommendEl);
    return;
  }
  show(recentEl);
}

function recentSearchBlurHandler(e) {
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  delay(200).then(() => hide(recentEl));
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
  const isClosed = transform === "scaleY(0)";
  if (isClosed) {
    openDropdown(categoryEl);
    return;
  }
<<<<<<< HEAD
=======
  console.log(e.target);
>>>>>>> step2
  closeDropdown(categoryEl);
}

function openDropdown(el) {
  el.style.transform = "scaleY(1)";
}

function closeDropdown(el) {
  el.style.transform = "scaleY(0)";
}
