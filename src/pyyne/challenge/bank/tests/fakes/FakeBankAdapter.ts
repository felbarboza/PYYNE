import { BaseBankAdapter } from '../../adapters/BaseAdapter';
import { AccountBalance } from '../../dtos/AccountBalance.dto';
import { Transaction } from '../../dtos/Transaction.dto';

export class FakeBankAdapter implements BaseBankAdapter {
  balance: AccountBalance;
  transactions: Transaction[];

  constructor() {
    this.balance = {
      balance: 0,
      currency: 'USD',
    };
    this.transactions = [];
  }

  getBalance(_accountId: number): AccountBalance {
    return this.balance;
  }

  public setBalance(balance: number, currency: string): void {
    this.balance = {
      balance,
      currency,
    };
  }

  getTransactions(
    _accountId: number,
    _fromDate: Date,
    _toDate: Date,
  ): Transaction[] {
    return this.transactions;
  }

  public setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }
}
