import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../js/utils.js";

const LAST_INDEX = 9;

class SearchFormModel {
  constructor() {
    return (async () => {
      this.idx = -1;
      this.isOnRecentSearch = getLocalStorage("isOnRecentSearch");
      this.recentSearchList = getLocalStorage("recentSearch").split(",");
      this.subCategories = await fetchCategories();
      return this;
    })();
  }

  getIdx() {
    return this.idx;
  }
  setIdx(idx) {
    this.idx = idx;
  }
  plusIdx() {
    this.idx = (this.idx + 1) % 10;
  }
  minusIdx() {
    if (this.idx === 0) {
      this.idx = LAST_INDEX;
      return;
    }
    this.idx = this.idx - 1;
  }

  getRecentSearchState() {
    return this.isOnRecentSearch;
  }
  getRecentSearchList() {
    return this.recentSearchList;
  }
  toggleRecentSearch() {
    if (this.isOnRecentSearch === "true") {
      this.isOnRecentSearch = "false";
      setLocalStorage("isOnRecentSearch", "false");
      return;
    }
    this.isOnRecentSearch = "true";
    setLocalStorage("isOnRecentSearch", "true");
  }
  saveRecentSearch(keyword) {
    this.recentSearchList.push(keyword);
    this.updateRecentSearch();
  }
  updateRecentSearch() {
    setLocalStorage("recentSearch", this.recentSearchList);
  }
  clearRecentSearch() {
    this.recentSearchList = [];
    clearLocalStorage("recentSearch");
  }
  getSubCategories() {
    return this.subCategories;
  }
}

async function fetchCategories() {
  const URL_CATEGORY = "http://localhost:3000/sub-category";
  const res = await fetch(URL_CATEGORY);
  const categoryJSON = await res.json();
  return categoryJSON.subCategories;
}

export const searchFormModel = await new SearchFormModel();
