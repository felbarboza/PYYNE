import { BaseException } from './BaseException';

export class InvalidAccountIdException extends BaseException {
  constructor() {
    super();
    this.errCode = 400;
    this.message = 'Invalid Account Id - Only numeric are accepted';
  }
}
