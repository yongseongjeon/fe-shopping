## TODO

- [ ] 쿠팡 UI
- [ ] 서브 카테고리
  - [ ] 토글로 버튼 아이콘 변경
  - [ ] 다른 곳 누르거나 선택하면 올리기
  - [ ] 선택한 카테고리로 바뀌기
- [ ] 최근 검색어 끄기
- [ ] 엔터키로 검색
- [ ] 서버에서 JSON 넘겨주기

## 설계

- 랜더

  - top bar
  - Header
    - categories
    - 검색창
    - more
    - GNB menu
  - main today

- 이벤트

  - 검색창
    - 서브 카테고리
    - 추천 검색어
    - 최근 검색어
  - 카테고리
  -

## 고민?

- 컴포넌트를 생성하는 기준을 어떻게 할까?

  - 모든 것을 컴포넌트화 시키면 오히려 복잡해져서 유지 보수의 비용이 올라갈 것 같다.
    - 재사용이 되는가
    - 추후에 수정될 가능성이 있는가

- 카테고리 버튼에 mouseover할 때 계층적으로 생성되는 레이아웃을 어떻게 만들까?

  1. 일일히 HTML 코딩
     - 추후에 서브 카테고리를 추가하거나 삭제할 때 해당하는 코드를 일일히 찾아 지워야 하는 비용이 크게 발생할 것 같다.
  2. 서버에서 JSON 파일을 받아 랜더링

  ```json
  {
    "fassion": {
      "name": "패션의류/잡화",
      "url": "https://fassion.blah",
      "child": {
        "woman-fassion": {
          "name": "여성패션",
          "url": "https://woman.blah"
        },
        "man-fassion": {
          "name": "남성패션",
          "url": "https://man.blah"
        },
        "unisex-fassion": {
          "name": "남녀 공용 의류",
          "url": "https://unisex.blah"
        },
        "kid-fassion": {
          "name": "유아용패션",
          "url": "https://kid.blah",
          "child": {
            "baby": {
              "name": "베이비",
              "url": "https://baby.blah"
            },
            "girl": {
              "name": "여아",
              "url": "https://girl.blah"
            },
            "boy": {
              "name": "남아",
              "url": "https://boy.blah"
            }
          }
        }
      }
    }
  }
  ```

  - 이런식으로 하고싶은데 구현 방법이 떠오르지 않는다.

- 추천 검색어를 구현할 때 `input`, `datalist`으로 구현하는 방법이 있는데 JS로 구현하는 방법과 어떤점이 다를까?

## 해보고 싶은 것들

- `prototype` 메서드 추가할 때 `Object.assign` 활용
- 클래스 속성에 `private` 활용
- Sass
  - Mixins
  - Extend
