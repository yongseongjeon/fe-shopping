export default function Component(target) {
  this.target = target;
  this.render();
}

Object.assign(Component.prototype, {
  template() {
    return ``;
  },
  render() {
    this.target.innerHTML = this.template();
    this.addEvent();
  },
  addEvent() {},
});
