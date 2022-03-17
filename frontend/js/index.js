import Recommend from "./components/Recommend/Recommend.js";
import SearchForm from "./components/SearchForm/SearchForm.js";
import { $ } from "./utils.js";

const searchForm = new SearchForm(document.body);
const recommendEl = $(".recommend");
const recommend = new Recommend(recommendEl);
