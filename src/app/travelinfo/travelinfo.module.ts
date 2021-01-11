import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelinfoPageRoutingModule } from './travelinfo-routing.module';

import { TravelinfoPage } from './travelinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelinfoPageRoutingModule
  ],
  declarations: [TravelinfoPage]
})
export class TravelinfoPageModule {}
