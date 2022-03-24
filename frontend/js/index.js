import HeaderView from "/frontend/view/HeaderView.js";
import AutoCompleteView from "/frontend/view/AutoCompleteView.js";
import SearchFormView from "/frontend/view/SearchFormView.js";
import TopBarView from "/frontend/view/topBarView.js";
import { $ } from "./utils.js";
import AutoCompleteController from "../controller/AutoCompleteController.js";

const headerEl = $(".header");
const header = new HeaderView(headerEl);
const searchEl = $(".search");
const searchForm = new SearchFormView(searchEl);
const topBarEl = $(".top-bar");
const topBar = new TopBarView(topBarEl);

const autoCompleteController = new AutoCompleteController();
