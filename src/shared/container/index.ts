import { container } from 'tsyringe';
import { Bank1Adapter } from '../../pyyne/challenge/bank/adapters/Bank1Adapter';
import { Bank2Adapter } from '../../pyyne/challenge/bank/adapters/Bank2Adapter';
import { BaseBankAdapter } from '../../pyyne/challenge/bank/adapters/BaseAdapter';
import { BankService } from '../../pyyne/challenge/bank/services/BankService';
import { IBaseBankService } from '../../pyyne/challenge/bank/services/BaseBankService';
import { InjectionTypes } from './injectionTypes';

container.registerSingleton<BaseBankAdapter>(
  InjectionTypes.AVAILABLE_BANKS,
  Bank1Adapter,
);
container.registerSingleton<BaseBankAdapter>(
  InjectionTypes.AVAILABLE_BANKS,
  Bank2Adapter,
);
container.registerSingleton<IBaseBankService>(
  InjectionTypes.BANK_SERVICE,
  BankService,
);
