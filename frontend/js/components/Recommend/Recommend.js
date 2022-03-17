import { autoComplete } from "../../data.js";
import { $, hide, show } from "../../utils.js";

export default class Recommend {
  constructor(target) {
    this.target = target;
    this.recommendList = [];
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
          ? this.recommendList.reduce(
              (acc, x) => acc + `<li>${x.keyword}</li>`,
              ""
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
    this.render();
    return;
  }
  const isPressBackspace = e.keyCode === 8;
  if (isPressBackspace && inputEl.value === "") {
    show(recentEl);
    hide(recommendEl);
    return;
  }
}
