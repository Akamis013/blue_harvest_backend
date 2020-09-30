import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from './acount.service';
import { AcountDeleteDialogComponent } from './acount-delete-dialog.component';

@Component({
  selector: 'jhi-acount',
  templateUrl: './acount.component.html',
})
export class AcountComponent implements OnInit, OnDestroy {
  acounts?: IAcount[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected acountService: AcountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.acountService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IAcount[]>) => (this.acounts = res.body || []));
      return;
    }

    this.acountService.query().subscribe((res: HttpResponse<IAcount[]>) => (this.acounts = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAcounts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAcount): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAcounts(): void {
    this.eventSubscriber = this.eventManager.subscribe('acountListModification', () => this.loadAll());
  }

  delete(acount: IAcount): void {
    const modalRef = this.modalService.open(AcountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.acount = acount;
  }
}
