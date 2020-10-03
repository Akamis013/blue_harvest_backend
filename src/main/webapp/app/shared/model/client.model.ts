export interface IClient {
  id?: number;
  customerID?: number;
  name?: string;
  surname?: string;
  balance?: number;
  initialcredit?: number;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public customerID?: number,
    public name?: string,
    public surname?: string,
    public balance?: number,
    public initialcredit?: number
  ) {}
}
