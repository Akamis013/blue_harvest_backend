export interface IAcount {
  id?: number;
  acountID?: number;
  credit?: number;
}

export class Acount implements IAcount {
  constructor(public id?: number, public acountID?: number, public credit?: number) {}
}
