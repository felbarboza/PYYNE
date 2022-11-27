import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IBaseBankService } from '../services/BaseBankService';
import { transactionParamsSchema } from '../schemas/TransactionParams';
import { JoiValidationException } from '../exceptions/JoiValidationException';
import { balanceParamsSchema } from '../schemas/BalanceParams';
import { InjectionTypes } from '../../../../shared/container/injectionTypes';

@injectable()
export class BankController {
  constructor(
    @inject(InjectionTypes.BANK_SERVICE) private bankService: IBaseBankService,
  ) {}

  public printBalances(req: Request, res: Response) {
    const { error, value } = balanceParamsSchema.validate(req.params);

    if (error) {
      throw new JoiValidationException(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
      );
    }

    const { accountId } = value;

    const balances = this.bankService.getAllBalances(Number(accountId));
    return res.json(balances);
  }

  public printTransactions(req: Request, res: Response) {
    const { error, value } = transactionParamsSchema.validate(req.params);

    if (error) {
      throw new JoiValidationException(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
      );
    }

    const { accountId, fromDate, toDate } = value;

    const transactions = this.bankService.getAllTransactions(
      accountId,
      fromDate,
      toDate,
    );

    return res.json(transactions);
  }
}
