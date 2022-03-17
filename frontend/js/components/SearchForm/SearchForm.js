import Component from "/frontend/js/Component.js";

export default class SearchForm extends Component {
  constructor(target) {
    super(target);
  }
  template() {
    return `
    <div class="search-form flex-row">
      <div class="select-category"></div>
      <div class="flex-row">
        <div class="search-input flex-col">
          <input></input>
          <div class="recent">
            <h3>최근 검색어</h3>
            <ol>
              <li>가</li>
              <li>나</li>
              <li>다</li>
              <li>라</li>
              <li>마</li>
              <li>바</li>
              <li>사</li>
              <li>아</li>
              <li>자</li>
            </ol>
            <div class="search-footer flex-row">
              <button>전체삭제</button>
              <button>최근검색어끄기</button>
            </div>
          </div>
          <div class="recommend"></div>
        </div>
        <div class="icon-mic"></div>
        <div class="icon-search"></div>
      </div>
    </div>`;
  }
}
