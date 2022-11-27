import 'reflect-metadata';
import { BankController } from '../../controllers/BankController';
import { IBaseBankService } from '../../services/BaseBankService';
import { FakeBankService } from '../fakes/FakeBankService';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { JoiValidationException } from '../../exceptions/JoiValidationException';

let fakeBankService: IBaseBankService;
let bankController: BankController;
const fakeAccountId = 123;

describe('BankController', () => {
  beforeEach(() => {
    fakeBankService = new FakeBankService();
    bankController = new BankController(fakeBankService);
  });

  it('Should be able to return all transactions', () => {
    const fakeDate = new Date();
    const expectedTransactions = fakeBankService.getAllTransactions(
      fakeAccountId,
      fakeDate,
      fakeDate,
    );

    const fakeRequest = getMockReq();
    fakeRequest.params = {
      accountId: fakeAccountId.toString(),
      fromDate: fakeDate.toISOString(),
      toDate: fakeDate.toISOString(),
    };

    const fakeResponse = getMockRes();

    const transactions = bankController.printTransactions(
      fakeRequest,
      fakeResponse.res,
    );

    expect(JSON.stringify(transactions)).toEqual(
      JSON.stringify(getMockRes().res.json(expectedTransactions)),
    );
  });

  it('Should be able to return all balances', () => {
    const expectedBalance = fakeBankService.getAllBalances(fakeAccountId);

    const fakeRequest = getMockReq();
    fakeRequest.params = {
      accountId: fakeAccountId.toString(),
    };

    const fakeResponse = getMockRes();

    const balance = bankController.printBalances(fakeRequest, fakeResponse.res);

    expect(JSON.stringify(balance)).toEqual(
      JSON.stringify(getMockRes().res.json(expectedBalance)),
    );
  });

  it('Should not be able to accept a non numerical accountId', () => {
    const fakeRequest = getMockReq();

    const fakeResponse = getMockRes();

    expect(() => {
      bankController.printBalances(fakeRequest, fakeResponse.res);
    }).toThrow(JoiValidationException);
  });

  it('Should not be able to accept a non Date type fromDate', () => {
    const fakeRequest = getMockReq();
    fakeRequest.params = {
      accountId: fakeAccountId.toString(),
    };

    const fakeResponse = getMockRes();

    expect(() => {
      bankController.printTransactions(fakeRequest, fakeResponse.res);
    }).toThrow(JoiValidationException);
  });
  it('Should not be able to accept a non Date type toDate', () => {
    const fakeRequest = getMockReq();
    fakeRequest.params = {
      accountId: fakeAccountId.toString(),
    };

    const fakeResponse = getMockRes();

    expect(() => {
      bankController.printTransactions(fakeRequest, fakeResponse.res);
    }).toThrow(JoiValidationException);
  });
});
