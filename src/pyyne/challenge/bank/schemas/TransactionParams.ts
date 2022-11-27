import Joi from 'joi';

const transactionParamsRules = {
  accountId: Joi.number().required(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
};

export const transactionParamsSchema = Joi.object(transactionParamsRules);
