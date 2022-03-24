import AutoCompleteView from "../view/AutoCompleteView.js";
import AutoCompleteModel from "../model/AutoCompleteModel.js";

class AutoCompleteController {
  constructor() {
    this.model = new AutoCompleteModel();
    this.view = new AutoCompleteView();
  }
}

export default AutoCompleteController;
