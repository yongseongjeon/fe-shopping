import { $ } from "./utils.js";
import TopBarView from "/frontend/view/topBarView.js";
import HeaderView from "/frontend/view/HeaderView.js";
import AutoCompleteController from "../controller/AutoCompleteController.js";
import SearchFormController from "../controller/SearchFormController.js";

const topBarEl = $(".top-bar");
const topBar = new TopBarView(topBarEl);
const headerEl = $(".header");
const header = new HeaderView(headerEl);

const searchFormController = new SearchFormController();
const autoCompleteController = new AutoCompleteController();
