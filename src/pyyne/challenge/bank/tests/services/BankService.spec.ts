import 'reflect-metadata';
import { InternTransactionType } from '../../dtos/InternTransactionType.dto';
import { InvalidAccountIdException } from '../../exceptions/InvalidAccountIdExpection';
import { InvalidDateException } from '../../exceptions/InvalidDateExpection';
import { BankService } from '../../services/BankService';
import { IBaseBankService } from '../../services/BaseBankService';
import { FakeBankAdapter } from '../fakes/FakeBankAdapter';

const fakeBank1Adapter = new FakeBankAdapter('Bank1');
const fakeBank2Adapter = new FakeBankAdapter('Bank2');
const bank1Transactions = [
  {
    amount: 123,
    type: InternTransactionType.CREDIT,
    text: 'fakeBank1Transaction-1',
  },
  {
    amount: 456,
    type: InternTransactionType.DEBIT,
    text: 'fakeBank1Transaction-2',
  },
];

const bank2Transactions = [
  {
    amount: 321,
    type: InternTransactionType.DEBIT,
    text: 'fakeBank2Transaction-1',
  },
  {
    amount: 654,
    type: InternTransactionType.CREDIT,
    text: 'fakeBank2Transaction-2',
  },
];

fakeBank1Adapter.setTransactions(bank1Transactions);
fakeBank2Adapter.setTransactions(bank2Transactions);

const fakeBalance = 1000;
const fakeCurrency = 'USD';

fakeBank1Adapter.setBalance(fakeBalance, fakeCurrency);
fakeBank2Adapter.setBalance(fakeBalance, fakeCurrency);

const fakeAccountId = 123;
const fakeDate = new Date();

let bankService: IBaseBankService;

describe('BankService', () => {
  beforeEach(() => {
    bankService = new BankService([fakeBank1Adapter, fakeBank2Adapter]);
  });

  it('Should be able to fetch all transactions on all banks', () => {
    const expectedTransactions = [
      {
        bankName: 'Bank1',
        transactions: bank1Transactions,
      },
      {
        bankName: 'Bank2',
        transactions: bank2Transactions,
      },
    ];

    const transactions = bankService.getAllTransactions(
      fakeAccountId,
      fakeDate,
      fakeDate,
    );

    expect(transactions).toStrictEqual(expectedTransactions);
  });

  it('Should be able to fetch all balances on all banks', () => {
    const allBalances = [
      fakeBank1Adapter.getBalance(fakeAccountId),
      fakeBank2Adapter.getBalance(fakeAccountId),
    ];

    const balance = bankService.getAllBalances(fakeAccountId);

    expect(balance).toStrictEqual(allBalances);
  });

  it('Should not be able to retrieve balance from a invalid accountId', () => {
    const invalidAccountId = null;
    expect(() => bankService.getAllBalances(invalidAccountId as any)).toThrow(
      InvalidAccountIdException,
    );
  });

  it('Should not be able to retrieve transactions from invalid accountId', () => {
    const invalidAccountId = null;
    expect(() =>
      bankService.getAllTransactions(
        invalidAccountId as any,
        fakeDate,
        fakeDate,
      ),
    ).toThrow(InvalidAccountIdException);
  });

  it('Should not be able to fetch transactions from invalid dates', () => {
    const invalidDate = false;

    expect(() =>
      bankService.getAllTransactions(
        fakeAccountId,
        invalidDate as any,
        invalidDate as any,
      ),
    ).toThrow(InvalidDateException);
  });
});
