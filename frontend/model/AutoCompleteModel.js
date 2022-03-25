class AutoCompleteModel {
  constructor() {
    this.autoCompleteList = [];
    this.searchKeyword = "";
  }
  setAutoCompleteList(list) {
    this.autoCompleteList = list;
  }
  getAutoCompleteList() {
    return this.autoCompleteList;
  }
  setSearchKeyword(keyword) {
    this.searchKeyword = keyword;
  }
  getSearchKeyword() {
    return this.searchKeyword;
  }
}

export const autoCompleteModel = new AutoCompleteModel();
