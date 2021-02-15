import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerPageRoutingModule } from './passenger-routing.module';

import { PassengerPage } from './passenger.page';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { Network } from '@ionic-native/network/ngx';
import { FetchService } from "../api/fetch.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengerPageRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PassengerPage],
  providers : [Network,FetchService]
})
export class PassengerPageModule {}
