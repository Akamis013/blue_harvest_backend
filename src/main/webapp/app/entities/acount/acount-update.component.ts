import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAcount, Acount } from 'app/shared/model/acount.model';
import { AcountService } from './acount.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-acount-update',
  templateUrl: './acount-update.component.html',
})
export class AcountUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    acountID: [],
    credit: [],
    client: [],
  });

  constructor(
    protected acountService: AcountService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acount }) => {
      this.updateForm(acount);

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(acount: IAcount): void {
    this.editForm.patchValue({
      id: acount.id,
      acountID: acount.acountID,
      credit: acount.credit,
      client: acount.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acount = this.createFromForm();
    if (acount.id !== undefined) {
      this.subscribeToSaveResponse(this.acountService.update(acount));
    } else {
      this.subscribeToSaveResponse(this.acountService.create(acount));
    }
  }

  private createFromForm(): IAcount {
    return {
      ...new Acount(),
      id: this.editForm.get(['id'])!.value,
      acountID: this.editForm.get(['acountID'])!.value,
      credit: this.editForm.get(['credit'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcount>>): void {
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

  trackById(index: number, item: IClient): any {
    return item.id;
  }
}
