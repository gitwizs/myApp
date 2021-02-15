import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { FetchService } from '../api/fetch.service'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
 
  constructor(private fetch : FetchService ,private router : Router) {
    this.payParams = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.networkSubscriber();
    try {
      this.Price = this.payParams.travel.seat.bus.bus.price;
      this.Total = parseInt(this.Price) * parseInt(this.payParams.travel.seat.bus.search.total);
      //alert(this.Total);
    }
    catch(e){
    }
  }
   payments: { name: string ,id: number}[] = [
    {"name":"COMMERCIAL BANK OF ETH","id":1},
    {"name":"AWASH BANK","id":2},
    {"name":"BANK OF ABYSSINA","id":3},
    {"name":"DASHE BANK","id":4},
    {"name":"WEGAGEN BANK","id":5},
    {"name":"ZEMEN BANK","id":6},
    {"name":"COOP","id":7},
  ]; 
  epayments: { name: string ,id: number}[] = [
    {"name":"CBE BIRR","id":12},
    {"name":"EBIRR","id":13},
    {"name":"HELLO CASH","id":14},
    {"name":"AMOLE","id":15},
    {"name":"AWASH WALLET","id":16},
  ]; 
  selected : string = "0";
  payParams : any;
  isConnected : boolean;
  validation(){}
  Price : any;
  index : any;
  Bank : any;
  Total : number;

  select(id : string){
    this.selected = id;
    if(parseInt(id) <= 7){
    this.index  = this.payments.findIndex(x => x.id === parseInt(id));
    this.Bank = this.payments[this.index];
    }
   else if(parseInt(id) >= 12){
      this.index  = this.epayments.findIndex(x => x.id === parseInt(id));
      this.Bank = this.epayments[this.index];
      }

    //alert(this.Bank.name);
  }
  networkSubscriber(): void {
    this.fetch
        .getNetworkStatus()
        .pipe(debounceTime(300))
        .subscribe((connected: boolean) => {
            this.isConnected = connected;
            if(!this.isConnected){
              this.validation()
            }
            else this.validation();
            //alert('isConnected' + this.isConnected);
        }); 
  }
  store(){

  }
  payment() {
    let navigationExtras: NavigationExtras = {
      state: {
        travel: this.payParams,
        pay: this.Bank,
      }
    };
    this.router.navigate(['/paymentinfo'], navigationExtras);
   }
  //paymentinfo
}
