import { BaseException } from './BaseException';

export class InvalidTransactionTypeException extends BaseException {
  constructor() {
    super();
    this.errCode = 400;
    this.message = 'Invalid Transaction Type - Only Debit and Credit accepted';
  }
}
