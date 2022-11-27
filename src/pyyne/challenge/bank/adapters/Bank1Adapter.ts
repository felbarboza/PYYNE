import { AccountBalance } from '../dtos/AccountBalance.dto';
import { InternTransactionType } from '../dtos/InternTransactionType.dto';
import { BankTransaction, Transaction } from '../dtos/Transaction.dto';
import { InvalidTransactionTypeException } from '../exceptions/InvalidTransactionTypeException';
import { BaseBankAdapter } from './BaseAdapter';
import { InvalidDateException } from '../exceptions/InvalidDateExpection';
import { Bank1AccountSource } from '../../../../bank1/integration/Bank1AccountSource';
import { InvalidAccountIdException } from '../exceptions/InvalidAccountIdExpection';
import { Bank1Transaction } from '../../../../bank1/integration/Bank1Transaction';

export class Bank1Adapter implements BaseBankAdapter {
  private bank1AccountSource: Bank1AccountSource;
  private name = 'Bank1';

  constructor() {
    this.bank1AccountSource = new Bank1AccountSource();
  }

  public getBalance(accountId: number): AccountBalance {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }

    const balance = this.bank1AccountSource.getAccountBalance(accountId);
    const currency = this.bank1AccountSource.getAccountCurrency(accountId);

    return {
      bankName: this.name,
      balance,
      currency,
    };
  }

  public getTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): BankTransaction {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }
    if (!fromDate || !toDate) {
      throw new InvalidDateException();
    }

    const bank1Transactions = this.bank1AccountSource.getTransactions(
      accountId,
      fromDate,
      toDate,
    );

    const convertedTransactions = this.convertTransactions(bank1Transactions);

    return { bankName: this.name, transactions: convertedTransactions };
  }

  private convertTransactions(
    bank1Transactions: Bank1Transaction[],
  ): Transaction[] {
    return bank1Transactions.map((transaction: Bank1Transaction) => {
      const bank1TransactionType = transaction.getType();

      const convertedTransactionType =
        this.convertTransactionType(bank1TransactionType);

      return {
        amount: transaction.getAmount(),
        type: convertedTransactionType,
        text: transaction.getText(),
      };
    });
  }

  private convertTransactionType(
    bank1TransactionType: number,
  ): InternTransactionType {
    if (bank1TransactionType == Bank1Transaction.TYPE_CREDIT) {
      return InternTransactionType.CREDIT;
    }

    if (bank1TransactionType == Bank1Transaction.TYPE_DEBIT) {
      return InternTransactionType.DEBIT;
    }

    throw new InvalidTransactionTypeException();
  }
}
