import { InternTransactionType } from './../../dtos/InternTransactionType.dto';
import { Bank1Adapter } from '../../adapters/Bank1Adapter';
import { Bank1AccountSource } from '../../../../../bank1/integration/Bank1AccountSource';
import { Bank1Transaction } from '../../../../../bank1/integration/Bank1Transaction';
import { InvalidAccountIdException } from '../../exceptions/InvalidAccountIdExpection';
import { InvalidTransactionTypeException } from '../../exceptions/InvalidTransactionTypeException';
import { InvalidDateException } from '../../exceptions/InvalidDateExpection';

let bank1Adapter: Bank1Adapter;

describe('Bank1Adapter', () => {
  beforeEach(() => {
    bank1Adapter = new Bank1Adapter();
  });

  it('Should be able to retrieve account balance', () => {
    const expectedAccountBalance = 200;
    const expectedCurrency = 'USD';

    jest
      .spyOn(Bank1AccountSource.prototype, 'getAccountBalance')
      .mockImplementationOnce(() => {
        return expectedAccountBalance;
      });

    jest
      .spyOn(Bank1AccountSource.prototype, 'getAccountCurrency')
      .mockImplementationOnce(() => {
        return expectedCurrency;
      });

    const balance = bank1Adapter.getBalance(123);

    expect(balance).toStrictEqual({
      bankName: 'Bank1',
      balance: expectedAccountBalance,
      currency: expectedCurrency,
    });
  });

  it('Should be able to retrieve account transactions', () => {
    const expectedTransactionAmount = 200;
    const expectedTransactionType = InternTransactionType.CREDIT;
    const expectedTransactionText = 'transaction text';

    const transactionAmount = 200;
    const transactionType = Bank1Transaction.TYPE_CREDIT;
    const transactionText = 'transaction text';

    jest
      .spyOn(Bank1AccountSource.prototype, 'getTransactions')
      .mockImplementationOnce(() => {
        return [
          new Bank1Transaction(
            transactionAmount,
            transactionType,
            transactionText,
          ),
        ];
      });

    const transactions = bank1Adapter.getTransactions(
      123,
      new Date(),
      new Date(),
    );

    expect(transactions).toStrictEqual({
      bankName: 'Bank1',
      transactions: [
        {
          amount: expectedTransactionAmount,
          type: expectedTransactionType,
          text: expectedTransactionText,
        },
      ],
    });
  });

  it('Should not be able to retrieve balance from a non numerical accountId', () => {
    expect(() => bank1Adapter.getBalance(null as any)).toThrow(
      InvalidAccountIdException,
    );
  });

  it('Should not be able to retrieve transactions from a non numerical accountId', () => {
    expect(() =>
      bank1Adapter.getTransactions(null as any, new Date(), new Date()),
    ).toThrow(InvalidAccountIdException);
  });

  it('Should be able to convert bank transaction type to internal transaction type', () => {
    const expectedTransactionType = InternTransactionType.CREDIT;

    const bank1TransactionType = Bank1Transaction.TYPE_CREDIT;

    const bank1AdapterPrototype = Object.getPrototypeOf(bank1Adapter);

    const transactionType =
      bank1AdapterPrototype.convertTransactionType(bank1TransactionType);

    expect(transactionType).toBe(expectedTransactionType);
  });

  it('Should throw error when invalid transaction type appears', () => {
    const invalidTransactionType = 5;

    const bank1AdapterPrototype = Object.getPrototypeOf(bank1Adapter);

    expect(() =>
      bank1AdapterPrototype.convertTransactionType(invalidTransactionType),
    ).toThrow(InvalidTransactionTypeException);
  });

  it('Should not be able to fetch transactions from invalid dates', () => {
    const accountId = 123;
    const invalidDate = false;

    expect(() =>
      bank1Adapter.getTransactions(
        accountId,
        invalidDate as any,
        invalidDate as any,
      ),
    ).toThrow(InvalidDateException);
  });
});
