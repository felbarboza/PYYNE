import { AccountBalance } from '../../dtos/AccountBalance.dto';
import { InternTransactionType } from '../../dtos/InternTransactionType.dto';
import { Transaction } from '../../dtos/Transaction.dto';
import { IBaseBankService } from '../../services/BaseBankService';

export class FakeBankService implements IBaseBankService {
  getAllBalances(accountId: number): AccountBalance[] {
    return [
      {
        balance: 123,
        currency: 'USD',
      },
    ];
  }

  getAllTransactions(
    _accountId: number,
    _fromDate: Date,
    _toDate: Date,
  ): Transaction[] {
    return [
      {
        amount: 123,
        type: InternTransactionType.CREDIT,
        text: 'transaction text',
      },
    ];
  }
}
