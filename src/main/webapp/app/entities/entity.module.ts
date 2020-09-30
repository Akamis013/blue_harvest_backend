import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'acount',
        loadChildren: () => import('./acount/acount.module').then(m => m.BlueHarvestBackendAcountModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.BlueHarvestBackendClientModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class BlueHarvestBackendEntityModule {}
