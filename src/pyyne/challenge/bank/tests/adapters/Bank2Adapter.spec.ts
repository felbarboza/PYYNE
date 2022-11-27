import { InternTransactionType } from '../../dtos/InternTransactionType.dto';
import { Bank2Adapter } from '../../adapters/Bank2Adapter';
import { Bank2AccountSource } from '../../../../../bank2/integration/Bank2AccountSource';
import { InvalidAccountIdException } from '../../exceptions/InvalidAccountIdExpection';
import { InvalidTransactionTypeException } from '../../exceptions/InvalidTransactionTypeException';
import { Bank2AccountBalance } from '../../../../../bank2/integration/Bank2AccountBalance';
import {
  Bank2AccountTransaction,
  TransactionTypes,
} from '../../../../../bank2/integration/Bank2AccountTransaction';
import { InvalidDateException } from '../../exceptions/InvalidDateExpection';

let bank2Adapter: Bank2Adapter;

describe('Bank2Adapter', () => {
  beforeEach(() => {
    bank2Adapter = new Bank2Adapter();
  });

  it('Should be able to retrieve account balance', () => {
    const expectedAccountBalance = 200;
    const expectedCurrency = 'USD';

    const accountBallance = 200;
    const currency = 'USD';

    jest
      .spyOn(Bank2AccountSource.prototype, 'getBalance')
      .mockImplementationOnce(() => {
        return new Bank2AccountBalance(accountBallance, currency);
      });

    const balance = bank2Adapter.getBalance(123);

    expect(balance).toStrictEqual({
      balance: expectedAccountBalance,
      currency: expectedCurrency,
    });
  });

  it('Should be able to retrieve account transactions', () => {
    const expectedTransactionAmount = 200;
    const expectedTransactionType = InternTransactionType.CREDIT;
    const expectedTransactionText = 'transaction text';

    const transactionAmount = 200;
    const transactionType = TransactionTypes.CREDIT;
    const transactionText = 'transaction text';

    jest
      .spyOn(Bank2AccountSource.prototype, 'getTransactions')
      .mockImplementationOnce(() => {
        return [
          new Bank2AccountTransaction(
            transactionAmount,
            transactionType,
            transactionText,
          ),
        ];
      });

    const transactions = bank2Adapter.getTransactions(
      123,
      new Date(),
      new Date(),
    );

    expect(transactions).toStrictEqual([
      {
        amount: expectedTransactionAmount,
        type: expectedTransactionType,
        text: expectedTransactionText,
      },
    ]);
  });

  it('Should not be able to retrieve balance from a non numerical accountId', () => {
    expect(() => bank2Adapter.getBalance(null as any)).toThrow(
      InvalidAccountIdException,
    );
  });

  it('Should not be able to retrieve transactions from a non numerical accountId', () => {
    expect(() =>
      bank2Adapter.getTransactions(null as any, new Date(), new Date()),
    ).toThrow(InvalidAccountIdException);
  });

  it('Should be able to convert bank transaction type to internal transaction type', () => {
    const expectedTransactionType = InternTransactionType.CREDIT;

    const bank2TransactionType = TransactionTypes.CREDIT;

    const bank2AdapterPrototype = Object.getPrototypeOf(bank2Adapter);

    const transactionType =
      bank2AdapterPrototype.convertTransactionType(bank2TransactionType);

    expect(transactionType).toBe(expectedTransactionType);
  });

  it('Should throw error when invalid transaction type appears', () => {
    const invalidTransactionType = 5;

    const bank2AdapterPrototype = Object.getPrototypeOf(bank2Adapter);

    expect(() =>
      bank2AdapterPrototype.convertTransactionType(invalidTransactionType),
    ).toThrow(InvalidTransactionTypeException);
  });

  it('Should not be able to fetch transactions from invalid dates', () => {
    const accountId = 123;
    const invalidDate = false;

    expect(() =>
      bank2Adapter.getTransactions(
        accountId,
        invalidDate as any,
        invalidDate as any,
      ),
    ).toThrow(InvalidDateException);
  });
});
