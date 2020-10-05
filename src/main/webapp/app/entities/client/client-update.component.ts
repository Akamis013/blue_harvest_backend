import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from 'app/entities/acount/acount.service';
import { ITransactions } from 'app/shared/model/transactions.model';
import { TransactionsService } from 'app/entities/transactions/transactions.service';

type SelectableEntity = ITransactions | IAcount;

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;
  transactions: ITransactions[] = [];
  acounts: IAcount[] = [];

  editForm = this.fb.group({
    id: [],
    customerID: [],
    name: [],
    surname: [],
    balance: [],
    initialcredit: [],
    transactions: [],
    acount: [],
  });

  constructor(
    protected clientService: ClientService,
    protected acountService: AcountService,
    protected transactionsService: TransactionsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);

      this.transactionsService.query().subscribe((res: HttpResponse<ITransactions[]>) => (this.transactions = res.body || []));

      this.acountService.query().subscribe((res: HttpResponse<IAcount[]>) => (this.acounts = res.body || []));
    });
  }

  updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      customerID: client.customerID,
      name: client.name,
      surname: client.surname,
      balance: client.balance,
      initialcredit: client.initialcredit,
      transactions: client.transactions,
      acount: client.acount,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      customerID: this.editForm.get(['customerID'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      balance: this.editForm.get(['balance'])!.value,
      initialcredit: this.editForm.get(['initialcredit'])!.value,
      transactions: this.editForm.get(['transactions'])!.value,
      acount: this.editForm.get(['acount'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ITransactions[], option: ITransactions): ITransactions {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
