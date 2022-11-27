import { AccountBalance } from '../dtos/AccountBalance.dto';
import { BankTransaction } from '../dtos/Transaction.dto';

export interface IBaseBankService {
  getAllTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): BankTransaction[];

  getAllBalances(accountId: number): AccountBalance[];
}
