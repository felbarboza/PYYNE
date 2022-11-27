import { InternTransactionType } from './InternTransactionType.dto';

export interface Transaction {
  amount: number;
  type: InternTransactionType;
  text: string;
}

export interface BankTransaction {
  bankName: string;
  transactions: Transaction[];
}
