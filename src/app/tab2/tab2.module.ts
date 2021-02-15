import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from "../api/fetch.service";
import { DatePipe } from '@angular/common'
import { Screenshot } from '@ionic-native/screenshot/ngx';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgxBarcodeModule,
    FontAwesomeModule
  ],
  declarations: [Tab2Page],
  providers: [Network,FetchService,DatePipe,Screenshot]
})
export class Tab2PageModule {}
