export default class NotImplementedException extends Error {
  constructor() {
    super(`the ${this.message} method is not implemented`);
    this.name = 'NotImplementedException';
  }
}