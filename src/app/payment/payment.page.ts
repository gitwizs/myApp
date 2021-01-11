import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
 
  constructor() { }

  ngOnInit() {
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
  
  select(id : string){
    this.selected = id;
    //alert(id);
  }
}
