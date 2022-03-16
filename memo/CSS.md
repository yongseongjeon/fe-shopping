## Rem vs Em

범위: 16px ~ 160px

### Rem

- **n** rem : **html** 엘리먼트의 font size \* **n** px
  - 예를 들어, html의 font size가 16px이고 10rem 이면, 10rem은 160px이다.
- html의 font size가 지정되지 않았으면 브라우저의 설정값이 적용된다.
  - Chrome Developer Tools - Computed에서 확인 가능
  - 예를 들어, html의 font size에 rem을 적용하면 브라우저의 설정 font size \* html의 n rem

### Em

- **n** em : **해당** 엘리먼트의 font size \* **n** px
  - 예를 들어, 해당 태그의 font size가 20px이고 10em 이면, 10em은 200px이다.

### Rem 단위를 사용해야 하는 이유

- 상속에 상관없이 일관된 크기를 얻을 수 있다.
- font size에 맞춰 레이아웃을 적절하게 조절할 수 있다.

### Em 단위를 사용해야 하는 이유

- 특별한 상황에 따라 거기에 어울리는 변동성이 요구될 때 사용하면 좋다.
  - 예를 들어, 메뉴 font size에 따라 padding, margin, line-height를 설정할 때 좋다.

## display: none vs visivility: hidden

- display: none
  - DOM에 그리지 않는다.
  - 다른 엘리먼트들이 있다면 간격이 채워진다.
- visivility: hidden
  - DOM에 그리나 보이지만 않는다.
  - 다른 엘리먼트들이 있다면 사이에 떠있는 듯이 보인다.

## vw, vh vs %

- vw, vh
  - 뷰포트의 크기에 비례하여 설정
- %
  - 부모 요소의 크기에 비례하여 설정

## 웹 폰트 성능

웹 폰트를 다운로드하는 중에는 폰트를 렌더 할 수 없기에 문제가 발생한다.

이러한 문제를 다음과 같은 방법들로 해결한다.

1. 폰트 파일의 용량 줄이기
   1. WOFF 2.0
      - 압축되어서 크기가 상대적으로 작은 형식이다.
   1. 서브 세트 폰트
      - 불필요한 글자를 제외한 폰트이다.
   1. unicode-range 속성
      - 유니코드로 지정한 글자에만 웹 폰트를 적용하는 속성이다.
1. 텍스트가 항상 보이게 하기
   1. FOIT
      - 보이지 않는 상태에서 폰트가 바뀌면서 텍스트 번쩍임.
   1. FOUT
      - 폴백 폰트 상태에서 폰트가 바뀌면서 텍스트 번쩍임.
1. Font Style Matcher로 폰트 간 차이 줄이기
   텍스트는 FOUT으로 보이게 했으나 레이아웃이 깨지는 문제 발생.
   Font Style Matcher를 통해 최대한 비슷하게 맞춰서 적용하면 비슷하게 만들 수 있음.

   [https://d2.naver.com/helloworld/4969726](https://d2.naver.com/helloworld/4969726)
