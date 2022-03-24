import { debounce, reload } from "../js/utils.js";
import { searchFormModel } from "../model/SearchFormModel.js";
import { handleSearchBtn } from "../View/SearchFormView.js";
import { $, hide, show } from "../js/utils.js";

export default class AutoCompleteView {
  constructor(target) {
    this.target = target;
    this.recommendList = [];
    this.searchKeyword = "";
    this.addEvent();
  }

  render() {
    this.target.innerHTML = this.template();
  }

  template() {
    return `
    <ol>
      ${
        this.recommendList
          ? this.recommendList
              .reduce((acc, x) => acc + `<li>${x.keyword}</li>`, "")
              .replaceAll(
                this.searchKeyword,
                `<strong>${this.searchKeyword}</strong>`
              )
          : ""
      }
    </ol>
    `;
  }

  addEvent() {
    const inputEl = $(".search-input input");
    inputEl.addEventListener("input", autoCompleteHandler.bind(this));
    inputEl.addEventListener("keydown", recommendKeyHandler);
  }
}

async function autoCompleteHandler(e) {
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
  if (hasChangedKeyword) {
    const DELAY_MS = 500;
    debounce(() => handleRerendering({ Recommend: this }), DELAY_MS);
    return;
  }
  const isPressBackspace = e.key === "Backspace";
  if (isPressBackspace && inputEl.value === "") {
    hide(recommendEl);
    show(recentEl);
    return;
  }

  function handleRerendering({ Recommend }) {
    show(recommendEl);
    Recommend.recommendList = autoCompleteList;
    Recommend.searchKeyword = inputEl.value;
    Recommend.render();
  }
}

function recommendKeyHandler(e) {
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
}

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
