import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusPageRoutingModule } from './bus-routing.module';

import { BusPage } from './bus.page';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from "../api/fetch.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusPageRoutingModule
  ],
  declarations: [BusPage],
  providers : [FetchService,Network]
})
export class BusPageModule {}
