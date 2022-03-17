import { getLocalStorage } from "./utils.js";

export const recentSearch = getLocalStorage("recentSearch")
  ? getLocalStorage("recentSearch").split(",")
  : [];
