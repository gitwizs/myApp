import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatPageRoutingModule } from './seat-routing.module';

import { SeatPage } from './seat.page';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from "../api/fetch.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatPageRoutingModule
  ],
  declarations: [SeatPage],
  providers: [Network,FetchService]
})
export class SeatPageModule {}
