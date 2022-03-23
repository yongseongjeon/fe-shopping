import { searchFormModel } from "../../model/SearchFormModel.js";
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
  if (autoCompleteList) {
    hide(recentEl);
  }
  if (hasChangedKeyword) {
    show(recommendEl);
    this.recommendList = autoCompleteList;
    this.searchKeyword = inputEl.value;
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
  if (isPressEnter) {
    searchBtnHandler();
    reload();
    return;
  }
  const isFocusInput = searchFormModel.getCurIdx() === -1;
  if (isPressUp) {
    const recommendOlEl = $(".recommend ol");
    if (isFocusInput) {
      searchFormModel.setCurIdx(LAST_INDEX + 1);
    }
    const prevIdx = isFocusInput ? 0 : searchFormModel.getCurIdx();
    searchFormModel.minusCurIdx();
    const idx = searchFormModel.getCurIdx();
    recommendOlEl.children[prevIdx].classList.remove("search-selected");
    recommendOlEl.children[idx].classList.add("search-selected");
    return;
  }
  if (isPressDown) {
    const recommendOlEl = $(".recommend ol");
    const prevIdx = isFocusInput ? 0 : searchFormModel.getCurIdx();
    searchFormModel.plusCurIdx();
    const idx = searchFormModel.getCurIdx();
    recommendOlEl.children[prevIdx].classList.remove("search-selected");
    recommendOlEl.children[idx].classList.add("search-selected");
    return;
  }
}
