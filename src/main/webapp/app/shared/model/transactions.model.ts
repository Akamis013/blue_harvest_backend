import { IClient } from 'app/shared/model/client.model';

export interface ITransactions {
  id?: number;
  value?: number;
  clients?: IClient[];
}

export class Transactions implements ITransactions {
  constructor(public id?: number, public value?: number, public clients?: IClient[]) {}
}
