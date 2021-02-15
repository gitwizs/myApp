import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelinfoPageRoutingModule } from './travelinfo-routing.module';

import { TravelinfoPage } from './travelinfo.page';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from '../api/fetch.service';
import { DatePipe } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelinfoPageRoutingModule
  ],
  declarations: [TravelinfoPage],
  providers: [FetchService,Network,DatePipe],
})
export class TravelinfoPageModule {}
