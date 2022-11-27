import 'reflect-metadata';
import './shared/container/index';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

import { BaseException } from './pyyne/challenge/bank/exceptions/BaseException';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof BaseException) {
    return response.status(err.errCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => {
  console.log('Bank server started');
});
