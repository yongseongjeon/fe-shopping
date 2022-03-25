import { getLocalStorage } from "./utils.js";

export const recentSearch = getLocalStorage("recentSearch")
  ? getLocalStorage("recentSearch").split(",")
  : [];

export const subCategories = [
  "전체",
  "여성패션",
  "남성패션",
  "남녀 공용 의류",
  "유아동패션",
  "뷰티",
  "출산/유아동",
  "식품",
  "주방용품",
  "생활용품",
  "홈인테리어",
  "가전디지털",
  "스포츠/레저",
  "자동차용품",
  "도서/음반/DVD",
  "완구/취미",
  "문구/오피스",
  "반려동물용품",
  "헬스/건강식품",
  "국내여행",
  "해외여행",
  "로켓설치",
  "공간별 집꾸미기",
  "헬스케어 전문관",
  "쿠팡 Only",
  "싱글라이프",
  "악기전문관",
  "결혼준비",
  "아트/공예",
  "홈카페",
  "실버스토어",
];
