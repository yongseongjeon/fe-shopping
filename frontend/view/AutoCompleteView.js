import { $ } from "../js/utils.js";

export default class AutoCompleteView {
  constructor(target) {
    this.target = target;
  }

  render(autoCompleteList, searchKeyword) {
    this.target.innerHTML = this.template(autoCompleteList, searchKeyword);
  }

  template(autoCompleteList, searchKeyword) {
    return `
    <ol>
      ${
        autoCompleteList
          ? autoCompleteList
              .reduce((acc, x) => acc + `<li>${x.keyword}</li>`, "")
              .replaceAll(searchKeyword, `<strong>${searchKeyword}</strong>`)
          : ""
      }
    </ol>
    `;
  }

  addEvent(handleInput, handleAutoComplete) {
    const inputEl = $(".search-input input");
    inputEl.addEventListener("input", handleInput.bind(this));
    inputEl.addEventListener("keydown", handleAutoComplete);
  }
}
