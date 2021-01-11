import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelinfoPage } from './travelinfo.page';
import { PaymentPage } from '../payment/payment.page';

const routes: Routes = [
  {
    path: '',
    component: TravelinfoPage
  },
  {
    path:'payment',
    component: PaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelinfoPageRoutingModule {}
