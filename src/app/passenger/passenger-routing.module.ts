import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassengerPage } from './passenger.page';
import { TravelinfoPage } from '../travelinfo/travelinfo.page';
const routes: Routes = [
  {
    path: '',
    component: PassengerPage
  },
  {
    path:'travelinfo',
    component: TravelinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengerPageRoutingModule {}
