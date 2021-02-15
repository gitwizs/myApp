import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentinfoPageRoutingModule } from './paymentinfo-routing.module';

import { PaymentinfoPage } from './paymentinfo.page';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from "../api/fetch.service";
import { DatePipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentinfoPageRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    
  ],
  declarations: [PaymentinfoPage],
  providers : [FetchService,Network,DatePipe,SQLite]
})
export class PaymentinfoPageModule {}
