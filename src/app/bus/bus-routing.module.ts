import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusPage } from './bus.page';
import { SeatPage } from '../seat/seat.page' 

const routes: Routes = [
  {
    path: '',
    component: BusPage
  },
  {path: 'seat', component: SeatPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusPageRoutingModule {}
