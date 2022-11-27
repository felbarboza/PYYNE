import { AccountBalance } from '../dtos/AccountBalance.dto';
import { Transaction } from '../dtos/Transaction.dto';

export interface IBaseBankService {
  getAllTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): Transaction[];

  getAllBalances(accountId: number): AccountBalance[];
}
