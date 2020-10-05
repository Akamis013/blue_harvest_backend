import { IAcount } from 'app/shared/model/acount.model';

export interface IClient {
  id?: number;
  customerID?: number;
  name?: string;
  surname?: string;
  balance?: number;
  initialcredit?: number;
  acounts?: IAcount[];
  acount?: IAcount;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public customerID?: number,
    public name?: string,
    public surname?: string,
    public balance?: number,
    public initialcredit?: number,
    public acounts?: IAcount[],
    public acount?: IAcount
  ) {}
}
