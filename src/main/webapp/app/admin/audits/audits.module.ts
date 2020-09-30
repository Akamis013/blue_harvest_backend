import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlueHarvestBackendSharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [BlueHarvestBackendSharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent],
})
export class AuditsModule {}
