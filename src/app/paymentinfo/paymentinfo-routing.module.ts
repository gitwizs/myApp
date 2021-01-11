import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentinfoPage } from './paymentinfo.page';
import { Tab2Page } from '../tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentinfoPage
  },
 {
  path: 'tab2',
  component: Tab2Page
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentinfoPageRoutingModule {}
