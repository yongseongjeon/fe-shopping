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
    inputEl.addEventListener("keyup", autoCompleteHandler.bind(this));
    inputEl.addEventListener("keydown", recommendKeyHandler);
  }
}

function autoCompleteHandler(e) {
  const inputEl = $(".search-input input");
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  const autoCompleteList = autoComplete[inputEl.value];
  const hasChangedKeyword = this.recommendList !== autoCompleteList;
  const isPressArrowKey = e.keyCode === 38 || e.keyCode === 40;
  console.log("e.keyCode", e.keyCode);
  if (autoCompleteList) {
    hide(recentEl);
  }
  if (hasChangedKeyword && !isPressArrowKey) {
    show(recommendEl);
    this.recommendList = autoCompleteList;
    this.searchKeyword = inputEl.value;
    console.log("리랜더링 됐습니다.");
    this.render();
    return;
  }
  const isPressBackspace = e.keyCode === 8;
  if (isPressBackspace && inputEl.value === "") {
    hide(recommendEl);
    show(recentEl);
    return;
  }
}

function recommendKeyHandler(e) {
  const isPressEnter = e.keyCode === 13;
  const isPressUp = e.keyCode === 38;
  const isPressDown = e.keyCode === 40;
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
  recommendOlEl.children[prev].classList.remove("search-selected");
  recommendOlEl.children[cur].classList.add("search-selected");
  const selectedKeyword = recommendOlEl.children[cur].innerText;
  $(".search-input input").value = selectedKeyword;
}

function reload() {
  document.location.reload();
}
