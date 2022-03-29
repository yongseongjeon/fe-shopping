import { subCategories } from "../js/data.js";
import { $, hide, show } from "../js/utils.js";
import { reload } from "../js/utils.js";
import { searchFormModel } from "../model/SearchFormModel.js";
import SearchFormView from "../view/SearchFormView.js";

class SearchFormController {
  constructor() {
    const searchEl = $(".search");
    this.view = new SearchFormView(searchEl);
    const handlers = [
      this.handleInputFocus,
      this.handleInputBlur,
      this.handleSearchBtn,
      this.handleSearchFooter,
      this.handleCategorySelection,
      this.handleList,
    ];
    this.view.render(
      searchFormModel.getSubCategories(),
      searchFormModel.getRecentSearchList()
    );
    this.view.addEvent(handlers);

    this.renderRecentSearch();
  }

  renderRecentSearch() {
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

  handleInputFocus() {
    const recentEl = $(".recent");
    const recommendEl = $(".recommend");
    const inputEl = $(".search-input input");
    const FIRST_IDX = -1;
    searchFormModel.setIdx(FIRST_IDX);
    inputEl.value ? show(recommendEl) : show(recentEl);
  }

  handleInputBlur() {
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

  handleSearchBtn() {
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

  handleSearchFooter(e) {
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

  handleCategorySelection() {
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

  handleList() {
    const { name } = e.target.dataset;
    selectCategory(name);
    closeDropdown();

    function selectCategory(category) {
      $(".selected").innerText = category;
    }
  }
}

export default SearchFormController;
