import { autoComplete } from "../../data.js";
import { $, hide, show } from "../../utils.js";

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
    console.dir($(".search-input input"));
    inputEl.addEventListener("keyup", autoCompleteHandler.bind(this));
  }
}

function autoCompleteHandler(e) {
  const inputEl = $(".search-input input");
  const recentEl = $(".recent");
  const recommendEl = $(".recommend");
  const autoCompleteList = autoComplete[inputEl.value];
  if (autoCompleteList) {
    hide(recentEl);
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
