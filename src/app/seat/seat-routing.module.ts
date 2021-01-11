import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatPage } from './seat.page';
import { PassengerPage } from '../passenger/passenger.page';

const routes: Routes = [
  {
    path: '',
    component: SeatPage,}
    ,{
    path:'passenger',
    component: PassengerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatPageRoutingModule {}
