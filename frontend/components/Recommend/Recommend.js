import { debounce } from "../../js/utils.js";
import { searchFormModel } from "../../model/SearchFormModel.js";
import { searchBtnHandler } from "../SearchForm/SearchForm.js";
import { autoComplete } from "/frontend/js/data.js";
import { $, hide, show } from "/frontend/js/utils.js";

export default class Recommend {
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

function autoCompleteHandler(e) {
  const inputEl = $(".search-input input");
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
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
  const prevIdx = isFocusInput ? 0 : searchFormModel.getCurIdx();
  if (isPressEnter) {
    searchBtnHandler();
    reload();
    return;
  }
  if (isPressUp) {
    if (isFocusInput) {
      searchFormModel.setCurIdx(LAST_INDEX + 1);
    }
    searchFormModel.minusCurIdx();
    const curIdx = searchFormModel.getCurIdx();
    selectRecommendKeyword(prevIdx, curIdx);
    return;
  }
  if (isPressDown) {
    searchFormModel.plusCurIdx();
    const curIdx = searchFormModel.getCurIdx();
    selectRecommendKeyword(prevIdx, curIdx);
    return;
  }
}

function selectRecommendKeyword(prev, cur) {
  const recommendOlEl = $(".recommend ol");
  const inputEl = $(".search-input input");
  recommendOlEl.children[prev].classList.remove("search-selected");
  recommendOlEl.children[cur].classList.add("search-selected");
  const selectedKeyword = recommendOlEl.children[cur].innerText;
  inputEl.value = selectedKeyword;
}

function reload() {
  document.location.reload();
}
