import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { FetchService } from '../api/fetch.service'
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.page.html',
  styleUrls: ['./paymentinfo.page.scss'],
})
export class PaymentinfoPage implements OnInit {

  constructor(private fetch : FetchService ,private router : Router,private datepipe : DatePipe,private firestone : AngularFirestore,public loadingController: LoadingController,private sqlite: SQLite) {
    this.paymentParams = this.router.getCurrentNavigation().extras.state; }

  ngOnInit() {
    this.networkSubscriber();
    try {
      this.Price = this.paymentParams.travel.travel.seat.bus.bus.price;
      this.Total = parseInt(this.Price) * parseInt(this.paymentParams.travel.travel.seat.bus.search.total);
      this.Bank = this.paymentParams.pay;
      this.setBankTheme(this.Bank.name);
    }
    catch(e){
      this.isStored = false;
    }
    this.Date_issued = this.datepipe.transform(this.Date, 'EEEE, 4 MMM y HH:MM');
    
  }
  isConnected : boolean;
  Price : any;
  Bank : any = [{"name":''}];
  validation(){}
  paymentParams : any;
  Total : number;
  index : any;
  theme: string;
  Date : Date = new Date();
  Date_issued : any;
  collection :any;
  isStored : boolean;
  autoDocumentId : any;
  message : string = "please wait...";
  conObj : any;
  storage : any;
  ID : any;
  Banks: { name: string ,id: number,theme: string}[] = [
    {"name":"COMMERCIAL BANK OF ETH","id":1,"theme":'purple'},
    {"name":"AWASH BANK","id":2,"theme":'orange'},
    {"name":"BANK OF ABYSSINA","id":3,"theme":'rgb(255, 188, 5)'},
    {"name":"DASHE BANK","id":4 ,"theme":'navy'},
    {"name":"WEGAGEN BANK","id":5 ,"theme":'orange'},
    {"name":"ZEMEN BANK","id":6,"theme":'red'},
    {"name":"COOP","id":7,"theme":'lightskyblue'},
    {"name":"CBE BIRR","id":12,"theme":'purple'},
    {"name":"EBIRR","id":13,"theme":'green'},
    {"name":"HELLO CASH","id":14,"theme":'orange'},
    {"name":"AMOLE","id":15,"theme":'rgb(255, 188, 5)'},
    {"name":"AWASH WALLET","id":16,"theme":'orange'},
  ]; 

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: this.message,
      duration: 2000
    }) 
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.ticket();
  }
  createDatabase() {
    //this.createDatabase();new Promise((resolve, reject) => {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.storage = db;
        db.executeSql('create table Data(id VARCHAR(32),name VARCHAR(32),password VARCHAR(32))', [])
          .then(() => console.log('Create Table Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
      this.addData('userid','username','password2');
      this.fetchData();
  }
  addData(userid, username,password) {
    //let data = [artist_name, song_name];
     this.storage.executeSql('INSERT INTO Data(id, name,password) VALUES (userid, username , password)', [])
    .then(res => {
      console.log('Data Added Executed SQL.');
    });
  }
  fetchData(){
    this.storage.executeSql('SELECT * FROM Data', []).then(res => {
     let items: any = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).userid,
            username: res.rows.item(i).username,  
            password: res.rows.item(i).password
           });
        }
      }
      this.ID = items.id;
      console.log(items.toString());
    });
  }
  setBankTheme(bank : string) {
    this.index  = this.Banks.findIndex(x => x.name === bank);
    this.Bank = this.Banks[this.index];
    this.theme = this.Bank.theme;
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
  store() {
    this.collection = this.firestone.collection<any>('tickets');
  try {
  this.collection.add({
    name: this.paymentParams.travel.travel.passenger[0].name,
    email: this.paymentParams.travel.travel.passenger[0].email,
    phone: this.paymentParams.travel.travel.passenger[0].phone,
    age : this.paymentParams.travel.travel.passenger[0].age,
    gender : this.paymentParams.travel.travel.passenger[0].gender,
    destination : this.paymentParams.travel.travel.seat.bus.search.departure,
    arrival : this.paymentParams.travel.travel.seat.bus.search.arrival,
    date1 : this.paymentParams.travel.travel.seat.bus.search.date1,
    date2 : '',
    total : this.Total,
    way : this.paymentParams.travel.travel.seat.bus.search.ways,
    buscompany : this.paymentParams.travel.travel.seat.bus.bus.name,
    busnumber :'BX001',
    travelnumber :'SB-BX001',
    seats : this.paymentParams.travel.travel.seat.seat.toString(),
    bank : this.Bank.name,
    payment : this.Price,
    status : 'pending'
  }).then((value) => {
    this.autoDocumentId = value.id;
    //alert(this.autoDocumentId);
  });
    this.isStored = true;
}
catch(e){
    this.isStored = false;
}
this.presentLoading();
  }

  ticket() {
    console.log('ticket navigation');
    if(this.isStored) {
    let navigationExtras: NavigationExtras = {
      state: {
        travel: this.paymentParams,
        payment: this.Bank,
        autoDocumentId : this.autoDocumentId,
      }
    };
    this.router.navigate(['/tabs/tab2'], navigationExtras);
   }
  else {
    let navigationExtras: NavigationExtras = {
      state: {
        travel: this.paymentParams,
        payment: this.Bank,
      }
    };
    this.router.navigate(['/404'], navigationExtras);
  }
}
}
