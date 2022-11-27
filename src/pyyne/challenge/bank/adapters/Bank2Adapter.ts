import { InvalidDateException } from './../exceptions/InvalidDateExpection';
import { AccountBalance } from '../dtos/AccountBalance.dto';
import { Transaction } from '../dtos/Transaction.dto';
import { InternTransactionType } from '../dtos/InternTransactionType.dto';
import { BaseBankAdapter } from './BaseAdapter';
import { InvalidTransactionTypeException } from '../exceptions/InvalidTransactionTypeException';
import { InvalidAccountIdException } from '../exceptions/InvalidAccountIdExpection';
import { Bank2AccountSource } from '../../../../bank2/integration/Bank2AccountSource';
import {
  Bank2AccountTransaction,
  TransactionTypes,
} from '../../../../bank2/integration/Bank2AccountTransaction';

export class Bank2Adapter implements BaseBankAdapter {
  private bank2AccountSource: Bank2AccountSource;

  constructor() {
    this.bank2AccountSource = new Bank2AccountSource();
  }

  getBalance(accountId: number): AccountBalance {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }

    const bank2Balance = this.bank2AccountSource.getBalance(accountId);

    return {
      balance: bank2Balance.getBalance(),
      currency: bank2Balance.getCurrency(),
    };
  }

  getTransactions(
    accountId: number,
    fromDate: Date,
    toDate: Date,
  ): Transaction[] {
    if (!accountId) {
      throw new InvalidAccountIdException();
    }
    if (!fromDate || !toDate) {
      throw new InvalidDateException();
    }

    const bank2Transactions = this.bank2AccountSource.getTransactions(
      accountId,
      fromDate,
      toDate,
    );

    const convertedTransactions = this.convertTransactions(bank2Transactions);

    return convertedTransactions;
  }

  private convertTransactions(
    bank2Transactions: Bank2AccountTransaction[],
  ): Transaction[] {
    return bank2Transactions.map((transaction: Bank2AccountTransaction) => {
      const bank2TransactionType = transaction.getType();

      const convertedTransactionType =
        this.convertTransactionType(bank2TransactionType);

      return {
        amount: transaction.getAmount(),
        type: convertedTransactionType,
        text: transaction.getText(),
      };
    });
  }

  private convertTransactionType(bank2TransactionType: TransactionTypes) {
    if (bank2TransactionType == TransactionTypes.CREDIT) {
      return InternTransactionType.CREDIT;
    }

    if (bank2TransactionType == TransactionTypes.DEBIT) {
      return InternTransactionType.DEBIT;
    }

    throw new InvalidTransactionTypeException();
  }
}
