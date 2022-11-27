import Joi from 'joi';

const balanceParamsRules = {
  accountId: Joi.string().required(),
};

export const balanceParamsSchema = Joi.object(balanceParamsRules);
