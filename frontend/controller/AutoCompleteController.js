import AutoCompleteView from "../view/AutoCompleteView.js";
import { searchFormModel } from "../model/SearchFormModel.js";
import { $, debounce, hide, show } from "../js/utils.js";

class AutoCompleteController {
  constructor() {
    const recommendEl = $(".recommend");
    this.view = new AutoCompleteView(recommendEl);
    this.view.addEvent(this.autoCompleteHandler, this.recommendKeyHandler);
  }

  async autoCompleteHandler(e) {
    const inputEl = $(".search-input input");
    const recentEl = $(".recent");
    const recommendEl = $(".recommend");

    let autoComplete = await fetch("http://localhost:3000/search");
    autoComplete = await autoComplete.json();

    const autoCompleteList = autoComplete[inputEl.value];
    const hasChangedKeyword = this.recommendList !== autoCompleteList;
    if (autoCompleteList) {
      hide(recentEl);
    }
    const isPressBackspace = e.key === "Backspace";
    if (isPressBackspace && inputEl.value === "") {
      hide(recommendEl);
      show(recentEl);
      return;
    }
    if (hasChangedKeyword && autoCompleteList) {
      const DELAY_MS = 500;
      debounce(() => handleRerendering({ Recommend: this }), DELAY_MS);
    }

    function handleRerendering({ Recommend }) {
      show(recommendEl);
      Recommend.render(autoCompleteList, inputEl.value);
    }
  }

  recommendKeyHandler(e) {
    const isPressEnter = e.key === "Enter";
    const isPressUp = e.key === "ArrowUp";
    const isPressDown = e.key === "ArrowDown";
    const LAST_INDEX = 9;

    const isFocusInput = searchFormModel.getCurIdx() === -1;
    const isPressArrow = isPressUp || isPressDown;
    if (!isPressArrow) return;
    if (isPressEnter) {
      handleSearchBtn();
      reload();
      return;
    }
    if (isPressUp) {
      if (isFocusInput) {
        searchFormModel.setCurIdx(LAST_INDEX + 1);
      }
      searchFormModel.minusCurIdx();
    }
    if (isPressDown) {
      searchFormModel.plusCurIdx();
    }
    const idx = searchFormModel.getCurIdx();
    selectRecommendKeyword(idx);

    function selectRecommendKeyword(cur) {
      const recommendOlEl = $(".recommend ol");
      const inputEl = $(".search-input input");
      deleteUnderlineAtList();
      recommendOlEl.children[cur].classList.add("search-selected");
      const selectedKeyword = recommendOlEl.children[cur].innerText;
      inputEl.value = selectedKeyword;

      function deleteUnderlineAtList() {
        const selected = $(".search-selected");
        if (selected) {
          selected.className = "";
        }
      }
    }
  }
}

export default AutoCompleteController;
