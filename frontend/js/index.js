import { Header } from "/frontend/components/Header/Header.js";
import Recommend from "/frontend/components/Recommend/Recommend.js";
import SearchForm from "/frontend/components/SearchForm/SearchForm.js";
import { TopBar } from "/frontend/components/TopBar/topBar.js";
import { $ } from "./utils.js";

const headerEl = $(".header");
const header = new Header(headerEl);
const searchEl = $(".search");
const searchForm = new SearchForm(searchEl);
const recommendEl = $(".recommend");
const recommend = new Recommend(recommendEl);
const topBarEl = $(".top-bar");
const topBar = new TopBar(topBarEl);
