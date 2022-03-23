import Component from "/frontend/js/Component.js";

export class Header extends Component {
  constructor(target) {
    super(target);
  }

  template() {
    return `
      <div class="category"><span>카테고리</span></div>
      <div class="right flex-col">
        <div class="flex-row">
          <img class="logo" src="//image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" width="174" height="41"></img>
          <div class="search"></div>
          <div class="my flex-row">
            <div class="info flex-col">
              <span class="icon-my"></span>
              <span>마이쿠팡</span>
            </div>
            <div class="cart flex-col">
              <span class="icon-cart"></span>
              <span>장바구니</span>
            </div>
          </div>
        </div>
        <div class="gnb">
          <ul class="flex-row">
            <li class="delivery">로켓배송</li>
            <li class="fresh">로켓프레시</li>
            <li class="biz">쿠팡비즈</li>
            <li class="purchase">로켓직구</li>
            <li>골드박스</li>
            <li>와우회원할인</li>
            <li>이벤트/쿠폰</li>
            <li>기획전</li>
            <li>여행/티켓</li>
          </ul>
        </div>
      </div>
    `;
  }
}
