import AutoCompleteView from "../view/AutoCompleteView.js";
import { $, debounce, hide, show } from "../js/utils.js";
import { searchFormModel } from "../model/SearchFormModel.js";
import { autoCompleteModel } from "../model/autoCompleteModel.js";

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
    const resOfAutoComplete = await fetch("http://localhost:3000/search");
    const inputValue = inputEl.value;
    const autoComplete = await resOfAutoComplete.json();
    const fetchedAutoComplete = autoComplete[inputValue];

    if (fetchedAutoComplete) {
      hide(recentEl);
    }
    const isPressBackspace = e.key === "Backspace";
    if (isPressBackspace && inputValue === "") {
      hide(recommendEl);
      show(recentEl);
      return;
    }
    const hasChangedKeyword =
      autoCompleteModel.getAutoCompleteList() !== fetchedAutoComplete;
    if (hasChangedKeyword && fetchedAutoComplete) {
      const DELAY_MS = 500;
      debounce(() => handleRerendering({ AutoCompleteView: this }), DELAY_MS);
    }

    function handleRerendering({ AutoCompleteView }) {
      show(recommendEl);
      autoCompleteModel.setAutoCompleteList(fetchedAutoComplete);
      AutoCompleteView.render(fetchedAutoComplete, inputValue);
    }
  }

  recommendKeyHandler(e) {
    const isPressEnter = e.key === "Enter";
    const isPressUp = e.key === "ArrowUp";
    const isPressDown = e.key === "ArrowDown";
    const LAST_INDEX = 9;

    const isFocusInput = searchFormModel.getIdx() === -1;
    const isPressArrow = isPressUp || isPressDown;
    if (!isPressArrow) return;
    if (isPressEnter) {
      handleSearchBtn();
      reload();
      return;
    }
    if (isPressUp) {
      if (isFocusInput) {
        searchFormModel.setIdx(LAST_INDEX + 1);
      }
      searchFormModel.minusIdx();
    }
    if (isPressDown) {
      searchFormModel.plusIdx();
    }
    const idx = searchFormModel.getIdx();
    selectRecommendKeyword(idx);

    function selectRecommendKeyword(cur) {
      const recommendOlEl = $(".recommend ol");
      const inputEl = $(".search-input input");
      removeUnderlineAtList();
      const selectedListElem = recommendOlEl.children[cur];
      addUnderline(selectedListElem);
      const selectedKeyword = selectedListElem.innerText;
      inputEl.value = selectedKeyword;

      function removeUnderlineAtList() {
        const selected = $(".search-selected");
        if (selected) {
          selected.className = "";
        }
      }
      function addUnderline(el) {
        el.classList.add("search-selected");
      }
    }
  }
}

export default AutoCompleteController;
