import { injectable, injectAll } from 'tsyringe';
import { InjectionTypes } from '../../../../shared/container/injectionTypes';
import { BaseBankAdapter } from '../adapters/BaseAdapter';
import { AccountBalance } from '../dtos/AccountBalance.dto';
import { BankTransaction, Transaction } from '../dtos/Transaction.dto';
import { InvalidAccountIdException } from '../exceptions/InvalidAccountIdExpection';
import { InvalidDateException } from '../exceptions/InvalidDateExpection';
import { IBaseBankService } from './BaseBankService';

@injectable()
export class BankService implements IBaseBankService {
  constructor(
    @injectAll(InjectionTypes.AVAILABLE_BANKS)
    private availableBanks: BaseBankAdapter[],
  ) {}

  public getAllTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): BankTransaction[] {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }
    if (!fromDate || !toDate) {
      throw new InvalidDateException();
    }

    const transactions: BankTransaction[] = [];

    this.availableBanks.forEach((bankAdapter: BaseBankAdapter) => {
      const bankTransactions = bankAdapter.getTransactions(
        accountId,
        fromDate,
        toDate,
      );
      transactions.push(bankTransactions);
    });

    return transactions;
  }

  public getAllBalances(accountId: number): AccountBalance[] {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }

    const balances: AccountBalance[] = [];

    this.availableBanks.forEach((bankAdapter: BaseBankAdapter) => {
      const bankBalance = bankAdapter.getBalance(accountId);
      balances.push(bankBalance);
    });

    return balances;
  }
}
