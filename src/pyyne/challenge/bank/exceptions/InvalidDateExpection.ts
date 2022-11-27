import { BaseException } from './BaseException';

export class InvalidDateException extends BaseException {
  constructor() {
    super();
    this.errCode = 400;
    this.message = 'Invalid Date - Only date types are accepted';
  }
}
