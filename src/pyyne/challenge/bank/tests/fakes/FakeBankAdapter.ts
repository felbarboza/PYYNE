import { BaseBankAdapter } from '../../adapters/BaseAdapter';
import { AccountBalance } from '../../dtos/AccountBalance.dto';
import { BankTransaction, Transaction } from '../../dtos/Transaction.dto';

export class FakeBankAdapter implements BaseBankAdapter {
  balance: AccountBalance;
  transactions: Transaction[];
  name: string;

  constructor(bankName: string) {
    this.name = bankName;
    this.balance = {
      bankName: this.name,
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
      bankName: this.name,
      balance,
      currency,
    };
  }

  getTransactions(
    _accountId: number,
    _fromDate: Date,
    _toDate: Date,
  ): BankTransaction {
    return { bankName: this.name, transactions: this.transactions };
  }

  public setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }
}
