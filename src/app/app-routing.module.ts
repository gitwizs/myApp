import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('./bus/bus.module').then( m => m.BusPageModule)
  },
  {
    path: 'seat',
    loadChildren: () => import('./seat/seat.module').then( m => m.SeatPageModule)
  },
  {
    path: 'passenger',
    loadChildren: () => import('./passenger/passenger.module').then( m => m.PassengerPageModule)
  },
  {
    path: 'travelinfo',
    loadChildren: () => import('./travelinfo/travelinfo.module').then( m => m.TravelinfoPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'paymentinfo',
    loadChildren: () => import('./paymentinfo/paymentinfo.module').then( m => m.PaymentinfoPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
