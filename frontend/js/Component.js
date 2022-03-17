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

// Component.prototype = {
//   template() {
//     return ``;
//   },
//   render() {
//     this.target.innerHTML = this.template();
//     this.addEvent();
//   },
//   addEvent() {},
// };

// Component.prototype.template = () => {
//   return ``;
// };

// Component.prototype.render = () => {
//   this.target.innerHTML = this.template();
//   this.addEvent();
// };

// Component.prototype.addEvent = () => {};
