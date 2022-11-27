import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { BankController } from '../pyyne/challenge/bank/controllers/BankController';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger_output.json';
const bankController = container.resolve(BankController);

const routes = Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

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
