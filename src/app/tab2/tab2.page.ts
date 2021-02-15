import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { FetchService } from '../api/fetch.service'
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Screenshot } from '@ionic-native/screenshot/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class Tab2Page implements OnInit {
  value = "BX0010123409879";
  constructor(private fetch : FetchService ,private router : Router,private datepipe : DatePipe,private firestone : AngularFirestore,public loadingController: LoadingController,private screenshot: Screenshot) {
    this.ticketParams = this.router.getCurrentNavigation().extras.state;
    //this.retriveTicket();
    this.presentLoading();  
  }
ngOnInit() {
  this.networkSubscriber();
  try {
      //this.Price = this.ticketParams.travel.travel.seat.bus.bus.price;
    // this.Total = parseInt(this.Price) * parseInt(this.ticketParams.travel.travel.seat.bus.search.total);
    // this.Bank = this.ticketParams.pay;
    // this.setBankTheme(this.Bank.name);
    this.autoDocumentId = this.ticketParams.autoDocumentId;
    //console.log("ID"+this.autoDocumentId);
    this.retriveTicket();
  }
  catch(e){
    this.isFetch = false;
  }
  this.Date_issued = this.datepipe.transform(this.Date, 'EEEE, 4 MMM y HH:MM');
}
isConnected : boolean;
Price : any;
Bank : any = [{"name":''}];
validation(){}
ticketParams : any;
Total : number;
index : any;
theme: string;
Date : Date = new Date();
Date_issued : any;
collection :any;
isFetch : boolean;
autoDocumentId : any;
collectionName :any;
Ticket : any;
singleDoc : any = [{
age: "",
arrival: "",
bank: " ",
buscompany: "",
busnumber: "",
date1: "",
date2: "",
destination: "",
email: "",
gender: "",
name: "",
payment: "",
phone: "",
seats: "",
status: "",
total: "",
travelnumber: "",
way: ""}];
Departure : string;
Arrival : string;
visibility : string = "hidden";
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
citieAppv = [
  {name:'Addis Abeba',appv:"ADDX"},
  {name:'Mekelle',appv:"MQX"},
  {name:'Hawassa',appv:"HWS"},
  {name:'DireDawa',appv:"DRDA"},
  {name:'Jimma',appv:"JMA"},
  {name:'Bahirdar',appv:"BARD"},
  {name:'Gondar',appv:"GNDF"},
  {name:'Lalibela',appv:"LBX"},
  {name:'Afar',appv:"AFR"},
];
async presentLoading() {
  const loading = await this.loadingController.create({
    message:'please wait...',
    duration: 2000
  });
  await loading.present();
  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  if(this.isFetch)
  this.visibility = 'shown';
}
  TakeScreenShot(){
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg');
// Take a screenshot and get temporary file URI
    console.log(this.screenshot.URI(80));
  }
  retriveTicket() {
    this.collectionName = "tickets"
    //this.autoDocumentId = "lXDnK3JNIcx5HWeTPDMx";
    this.firestone.collection(this.collectionName).doc(this.autoDocumentId).valueChanges()
      .subscribe(singleDoc => {
      console.log(singleDoc)
      this.singleDoc = singleDoc;
        this.Arrival = this.singleDoc.arrival;
        this.index  = this.citieAppv.findIndex(x => x.name === this.Arrival);
        this.Arrival = this.citieAppv[this.index].appv;

        this.Departure = this.singleDoc.destination;
        this.index  = this.citieAppv.findIndex(x => x.name === this.Departure);
        this.Departure = this.citieAppv[this.index].appv;
        console.log(this.Arrival+"-"+this.Departure);
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

}
