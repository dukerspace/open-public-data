
export class BaseController {
  static instance
  constructor() {
    console.log('xx', BaseController.instance)
    if (BaseController.instance) {
      return BaseController.instance;
    }
    BaseController.instance = this;
  }
//   public static getInstance() {
//     if (this.instance) {
//       this.instance = new this();
//     }

//     return this.instance;
// }
}
