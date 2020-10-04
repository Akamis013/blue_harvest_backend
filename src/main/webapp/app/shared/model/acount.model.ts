import { IClient } from 'app/shared/model/client.model';

export interface IAcount {
  id?: number;
  acountID?: number;
  credit?: number;
  client?: IClient;
}

export class Acount implements IAcount {
  constructor(public id?: number, public acountID?: number, public credit?: number, public client?: IClient) {}
}
