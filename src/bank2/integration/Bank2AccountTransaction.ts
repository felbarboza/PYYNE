export enum TransactionTypes {
  DEBIT,
  CREDIT,
}

export class Bank2AccountTransaction {
  private amount: number;
  private type: TransactionTypes;
  private text: string;

  constructor(amount: number, type: TransactionTypes, text: string) {
    this.amount = amount;
    this.type = type;
    this.text = text;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getType(): TransactionTypes {
    return this.type;
  }

  public getText(): string {
    return this.text;
  }
}
