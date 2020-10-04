import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITransactions } from 'app/shared/model/transactions.model';

type EntityResponseType = HttpResponse<ITransactions>;
type EntityArrayResponseType = HttpResponse<ITransactions[]>;

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  public resourceUrl = SERVER_API_URL + 'api/transactions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/transactions';

  constructor(protected http: HttpClient) {}

  create(transactions: ITransactions): Observable<EntityResponseType> {
    return this.http.post<ITransactions>(this.resourceUrl, transactions, { observe: 'response' });
  }

  update(transactions: ITransactions): Observable<EntityResponseType> {
    return this.http.put<ITransactions>(this.resourceUrl, transactions, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
