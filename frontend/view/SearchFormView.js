import { $ } from "../js/utils.js";

function SearchFormView(target) {
  this.target = target;
}

SearchFormView.prototype.template = function (subCategories, recentSearch) {
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

SearchFormView.prototype.addEvent = function (handlers) {
  const inputEl = $(".search-input input");
  const iconSearchEl = $(".icon-search");
  const searchFooterEl = $(".search-footer");
  const selectedEl = $(".selected-container");
  const selectCategoryEl = $(".select-category ul");

  const events = [
    { elem: inputEl, eventType: "focus" },
    { elem: inputEl, eventType: "blur" },
    { elem: iconSearchEl, eventType: "click" },
    { elem: searchFooterEl, eventType: "mousedown" },
    { elem: selectedEl, eventType: "click" },
    { elem: selectCategoryEl, eventType: "click" },
  ];

  events.forEach((event, i) => {
    const { elem, eventType } = event;
    elem.addEventListener(eventType, handlers[i]);
  });
};

SearchFormView.prototype.render = function (subCategories, recentSearch) {
  this.target.innerHTML = this.template(subCategories, recentSearch);
};

function createListEl(el) {
  return el.reduce((acc, el) => acc + `<li data-name="${el}">${el}</li>`, "");
}

export default SearchFormView;
