import Component from "/frontend/js/Component.js";

export class TopBar extends Component {
  constructor(target) {
    super(target);
  }

  template() {
    return `
      <div class="flex-row">
        <div>즐겨찾기</div>
        <div class="apply-store">입점신청</div>
      </div>
      <div class="flex-row">
        <div>로그인</div>
        <div>회원가입</div>
        <div>고객센터</div>
      </div>
    `;
  }
}
