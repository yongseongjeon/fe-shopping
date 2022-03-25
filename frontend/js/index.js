import { $ } from "./utils.js";
import TopBarView from "/frontend/view/topBarView.js";
import HeaderView from "/frontend/view/HeaderView.js";
import SearchFormView from "/frontend/view/SearchFormView.js";
import AutoCompleteController from "../controller/AutoCompleteController.js";

const topBarEl = $(".top-bar");
const topBar = new TopBarView(topBarEl);
const headerEl = $(".header");
const header = new HeaderView(headerEl);

const searchEl = $(".search");
const searchForm = new SearchFormView(searchEl);

const autoCompleteController = new AutoCompleteController();
