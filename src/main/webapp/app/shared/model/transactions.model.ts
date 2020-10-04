export interface ITransactions {
  id?: number;
  value?: number;
}

export class Transactions implements ITransactions {
  constructor(public id?: number, public value?: number) {}
}
