import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlueHarvestBackendSharedModule } from 'app/shared/shared.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsDetailComponent } from './transactions-detail.component';
import { TransactionsUpdateComponent } from './transactions-update.component';
import { TransactionsDeleteDialogComponent } from './transactions-delete-dialog.component';
import { transactionsRoute } from './transactions.route';

@NgModule({
  imports: [BlueHarvestBackendSharedModule, RouterModule.forChild(transactionsRoute)],
  declarations: [TransactionsComponent, TransactionsDetailComponent, TransactionsUpdateComponent, TransactionsDeleteDialogComponent],
  entryComponents: [TransactionsDeleteDialogComponent],
})
export class BlueHarvestBackendTransactionsModule {}
