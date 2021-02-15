import { Component,Input } from '@angular/core';
import { MenuController, ModalController , } from '@ionic/angular';
import { stringify } from 'querystring';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { PopoverController,ToastController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FetchService } from '../api/fetch.service'
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { debounceTime } from 'rxjs/operators';
import { BusPage } from '../bus/bus.page';
import { Router,NavigationExtras } from '@angular/router';
/*
const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  alert('Network status:'+ status);
};
/* import { Storage } from '@capacitor/storage';

const setName = async () => {
  await Storage.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Storage.get({ key: 'name' });

  alert(`Hello ${value}!`);
};

const removeName = async () => {
  await Storage.remove({ key: 'name' });
}; */


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private menu: MenuController,private modalCtr :ModalController,public popoverController: PopoverController,private toastCtrl:ToastController,private sqlite: SQLite,private fetch: FetchService,private firestone : AngularFirestore,private router : Router) { 
  
  }
  ngOnInit(): void {
    this.networkSubscriber();
}
  //variable Declaration
  collection :any;
  city: String;
  type : string;
  cityData : any = {
    "city1":"From",
    "city2":"To",
  };  
  datas :any;
  twoDisabled = true;
  item: number = 1;
  row_data : any;
  submit = true;

  menus = [
    {"item":"Bus","icon":"bus"},
    {"item":"Flight","icon":"airplane"},
    {"item":"Hotel","icon":"bed"},
    {"item":"Restaurant","icon":"restaurant"}
  ];
  ticket = {
    "ways":"1",
    "departure":null,
    "arrival":null,
    "total":"1",
    "date1":null,
    "date2":null
  };
   isConnected : boolean;

  networkSubscriber(): void {
    this.fetch
        .getNetworkStatus()
        .pipe(debounceTime(300))
        .subscribe((connected: boolean) => {
            this.isConnected = connected;
            if(!this.isConnected){
              this.validation()
            }
            else this.validation()
            //alert('isConnected' + this.isConnected);
        });
}
 busSelection() {
  let navigationExtras: NavigationExtras = {
    state: {
      departure: this.ticket.departure,
      arrival: this.ticket.arrival,
      date1: this.ticket.date1,
      date2: this.ticket.date2,
      total : this.ticket.total,
      ways : this.ticket.ways
    }
  };
  this.router.navigate(['/bus'], navigationExtras);
 }
    store() {
      this.collection = this.firestone.collection<any>('tickets');
    try {
    this.collection.add({
      name: 'Jorge Vergara',
      email: 'j@javebratt.com',
      phone: '',
      age : '',
      gender : '',
      destination : '',
      arrival : '',
      date1 : '',
      date2 : '',
      total : '',
      way : '',
      buscompany : '',
      busnumber :'',
      travelnumber :'',
      seats : '',
      bank : '',
      payment : '',
      status : ''
    }); 
  }
  catch(e){
    alert(e);
  }
    }
  //validation 
  validation() {
    if(this.twoDisabled){
    if(
      this.ticket.date1 == null || 
      this.ticket.departure == null || 
      this.ticket.arrival == null || 
      this.isConnected == false || 
      this.cityData['city1'] == this.cityData['city2']) {
      this.submit = true;
    }
    else this.submit = false;
  }
  else {
    if(
      this.ticket.date1 == null || 
      this.ticket.date2 == null || 
      this.ticket.departure == null || 
      this.ticket.arrival == null || 
      this.isConnected == false || 
      this.cityData['city1'] == this.cityData['city2'] ) {
      this.submit = true;
    }
    else this.submit = false;
  }
    //alert(this.submit);
  }
 
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  trip(type : string) {
    this.validation();
    this.ticket.ways = type;
   if(type == '1') {
    this.twoDisabled = true;
   }
   else if(type == '2'){
    this.twoDisabled = false;
   }
   else if(type == '3') {
    this.twoDisabled = false;
   }
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  async openModal(type : string){
    this.type = type;
       let modal = await this.modalCtr.create({
      component: DepositModalComponent,
      componentProps: { datas: '3' },
    });
    modal.onDidDismiss().then((data) => {
      const data2 = data['data'];
      this.validation();
      if(this.type == '1') {
      this.cityData['city1'] = data2.city1; 
      this.ticket.departure = this.cityData['city1'];
      this.validation();
    }
      if(this.type == '2') {
      this.cityData['city2'] = data2.city1;
      this.ticket.arrival = this.cityData['city2'];
      this.validation();
      }
    }) 
    return await modal.present();
  }
  changeDate(type : any,date : string) {
      if(type == "1") {
        this.ticket.date1 = date;
        //alert(date);
      }
      else  if(type == "2") {
        this.ticket.date2 = date;
      }
    
     this.validation();
   }
    openFirst () {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
  
    openEnd() {
      this.menu.open('end');
    }
  
    openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
    }
    incrementQty() {
      this.validation();
      if(this.item<5){
          this.item++;
      }
      else ;
      this.ticket.total = this.item.toString() ;
    }
    decrementQty(){
      alert(this.submit);
      if(this.item>1){
      this.item--;
      }
      else ;
      this.ticket.total = this.item.toString() ;
    }

}
