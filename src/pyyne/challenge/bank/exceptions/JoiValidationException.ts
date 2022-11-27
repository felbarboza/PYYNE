import { BaseException } from './BaseException';
export class JoiValidationException extends BaseException {
  constructor(message: string) {
    super();
    this.message = message;
    this.errCode = 400;
  }
}
