import { getLocalStorage } from "./utils.js";

export const recentSearch = getLocalStorage("recentSearch")
  ? getLocalStorage("recentSearch").split(",")
  : [];

export const autoComplete = {
  아: [
    {
      keyword: "아이폰 13 pro",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 미니",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 pro max",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 충전기",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 충전케이블",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13 pro 케이스",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰12 pro 케이스",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰12 미니",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13 pro 자급제",
      travelKeyword: "false",
    },
  ],
  아이: [
    {
      keyword: "아이폰 13 pro",
      travelKeyword: "false",
    },
    {
      keyword: "아이패드 에어4",
      travelKeyword: "false",
    },
    {
      keyword: "아이깨끗해",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13",
      travelKeyword: "false",
    },
    {
      keyword: "아이패드",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 미니",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 pro max",
      travelKeyword: "false",
    },
    {
      keyword: "아이스크림",
      travelKeyword: "false",
    },
    {
      keyword: "아이깨끗해 리필",
      travelKeyword: "false",
    },
    {
      keyword: "아이패드프로 5세대 12.9",
      travelKeyword: "false",
    },
  ],
  아이폰: [
    {
      keyword: "아이폰 13 pro",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 미니",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰13 pro max",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 충전기",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 충전케이블",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13 pro 케이스",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰12 pro 케이스",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰12 미니",
      travelKeyword: "false",
    },
    {
      keyword: "아이폰 13 pro 자급제",
      travelKeyword: "false",
    },
  ],
};
