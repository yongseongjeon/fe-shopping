const LAST_INDEX = 9;

class SearchFormModel {
  constructor() {
    this.curIdx = -1;
  }
  getCurIdx() {
    return this.curIdx;
  }
  setCurIdx(idx) {
    this.curIdx = idx;
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
