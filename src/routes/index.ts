import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { BankController } from '../pyyne/challenge/bank/controllers/BankController';

const bankController = container.resolve(BankController);

const routes = Router();

routes.get('/balance/:accountId', (req: Request, res: Response) => {
  bankController.printBalances(req, res);
});

routes.get(
  '/transactions/:accountId/:fromDate/:toDate',
  (req: Request, res: Response) => {
    bankController.printTransactions(req, res);
  },
);

export default routes;
