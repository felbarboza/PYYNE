import { AccountBalance } from '../dtos/AccountBalance.dto';
import { Transaction } from '../dtos/Transaction.dto';

export interface BaseBankAdapter {
  getTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): Transaction[];

  getBalance(accountId: number): AccountBalance;
}
