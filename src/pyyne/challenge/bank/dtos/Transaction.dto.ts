import { InternTransactionType } from './InternTransactionType.dto';

export interface Transaction {
  amount: number;
  type: InternTransactionType;
  text: string;
}
