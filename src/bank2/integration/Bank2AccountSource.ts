import { Bank2AccountBalance } from './Bank2AccountBalance';
import {
  Bank2AccountTransaction,
  TransactionTypes,
} from './Bank2AccountTransaction';

export class Bank2AccountSource {
  public getBalance(accountNum: number): Bank2AccountBalance {
    return new Bank2AccountBalance(512.5, 'USD');
  }

  public getTransactions(
    accountNum: number,
    fromDate: Date,
    toDate: Date,
  ): Bank2AccountTransaction[] {
    return [
      new Bank2AccountTransaction(125, TransactionTypes.DEBIT, 'Amazon.com'),
      new Bank2AccountTransaction(500, TransactionTypes.DEBIT, 'Car insurance'),
      new Bank2AccountTransaction(800, TransactionTypes.CREDIT, 'Salary'),
    ];
  }
}
