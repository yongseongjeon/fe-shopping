const LAST_INDEX = 9;

class SearchFormModel {
  constructor() {
    this.curIdx = 0;
  }
  plusCurIdx() {
    this.curIdx = (this.curIdx + 1) % 10;
  }
  minusCurIdx() {
    if (this.curIdx === 0) {
      this.curIdx = LAST_INDEX;
      return;
    }
    this.curIdx = this.curIdx - 1;
  }
}

export const searchFormModel = new SearchFormModel();
