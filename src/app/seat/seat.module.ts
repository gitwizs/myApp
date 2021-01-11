import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatPageRoutingModule } from './seat-routing.module';

import { SeatPage } from './seat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatPageRoutingModule
  ],
  declarations: [SeatPage]
})
export class SeatPageModule {}
