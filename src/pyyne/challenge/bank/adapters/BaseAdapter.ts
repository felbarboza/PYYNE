import { AccountBalance } from '../dtos/AccountBalance.dto';
import { BankTransaction, Transaction } from '../dtos/Transaction.dto';

export interface BaseBankAdapter {
  getTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): BankTransaction;

  getBalance(accountId: number): AccountBalance;
}
