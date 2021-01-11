import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';
import { PaymentinfoPage } from '../paymentinfo/paymentinfo.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  },
{
  path: 'paymentinfo',
  component : PaymentinfoPage
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
