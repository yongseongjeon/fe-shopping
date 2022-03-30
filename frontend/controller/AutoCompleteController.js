import AutoCompleteView from "../view/AutoCompleteView.js";
import { $, debounce, hide, show } from "../js/utils.js";
import { searchFormModel } from "../model/SearchFormModel.js";
import { autoCompleteModel } from "../model/autoCompleteModel.js";

class AutoCompleteController {
  constructor() {
    const recommendEl = $(".recommend");
    this.view = new AutoCompleteView(recommendEl);
    const handlers = [this.handleAutoComplete, this.handleAutoCompleteMovement];
    this.view.addEvent(...handlers);
  }

  async handleAutoComplete(e) {
    const inputEl = $(".search-input input");
    const recentEl = $(".recent");
    const recommendEl = $(".recommend");
    const inputValue = inputEl.value;
    const autoComplete = await fetchAutoComplete();

    if (autoComplete) {
      hide(recentEl);
    }
    const isPressBackspace = e.key === "Backspace";
    if (isPressBackspace && inputValue === "") {
      hide(recommendEl);
      show(recentEl);
      return;
    }
    const hasChangedKeyword =
      autoCompleteModel.getAutoCompleteList() !== autoComplete;
    if (hasChangedKeyword && autoComplete) {
      const DELAY_MS = 500;
      debounce(() => handleRerendering({ AutoCompleteView: this }), DELAY_MS);
    }

    async function fetchAutoComplete() {
      const resOfAutoComplete = await fetch("http://localhost:3000/search");
      const autoComplete = await resOfAutoComplete.json();
      return autoComplete[inputValue];
    }

    function handleRerendering({ AutoCompleteView }) {
      show(recommendEl);
      autoCompleteModel.setAutoCompleteList(autoComplete);
      AutoCompleteView.render(autoComplete, inputValue);
    }
  }

  handleAutoCompleteMovement(e) {
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
    selectAutoCompleteKeyword(idx);

    function selectAutoCompleteKeyword(cur) {
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
