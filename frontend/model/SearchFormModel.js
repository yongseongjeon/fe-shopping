const LAST_INDEX = 9;

class SearchFormModel {
  constructor() {
    this.idx = -1;
  }
  getIdx() {
    return this.idx;
  }
  setIdx(idx) {
    this.idx = idx;
  }
  plusIdx() {
    this.idx = (this.idx + 1) % 10;
  }
  minusIdx() {
    if (this.idx === 0) {
      this.idx = LAST_INDEX;
      return;
    }
    this.idx = this.idx - 1;
  }
}

export const searchFormModel = new SearchFormModel();
