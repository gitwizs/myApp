import { Component, OnInit } from '@angular/core';
import { FetchService } from '../api/fetch.service'
import { debounceTime, isEmpty } from 'rxjs/operators';
import { Router,NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-travelinfo',
  templateUrl: './travelinfo.page.html',
  styleUrls: ['./travelinfo.page.scss'],
})
export class TravelinfoPage implements OnInit {

  constructor(private fetch : FetchService ,private router : Router,public datepipe: DatePipe) {
    this.travelParams = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit() {
    this.networkSubscriber();
    this.Departure = this.travelParams.seat.bus.search.departure;
    this.index  = this.citieAppv.findIndex(x => x.name === this.Departure);
    this.Departure = this.citieAppv[this.index];
    
    this.Arrival = this.travelParams.seat.bus.search.arrival;
    this.index  = this.citieAppv.findIndex(x => x.name === this.Arrival);
    this.Arrival = this.citieAppv[this.index];

    this.Bus = this.travelParams.seat.bus.bus.name;
    this.Price = this.travelParams.seat.bus.bus.price; 
    this.Total = parseInt(this.Price) * parseInt(this.travelParams.seat.bus.search.total);
    this.Seats = this.travelParams.seat.seat.toString();
    this.Date_ = new Date(this.travelParams.seat.bus.search.date1);
    this.formated_date = this.datepipe.transform(this.Date_, 'EEEE, 4 MMM y');
    this.Passenger =  this.travelParams.passenger[0];
     //alert(this.Passenger[0].name);
  }
  //VARS Declaration
  isConnected : boolean;
  travelParams : any;
  Departure : any;
  Arrival : any;
  Bus : any;
  Price : any;
  Seats : any;
  Date2 : Date;
  Date_ : Date;
  formated_date : any;
  Passenger : any;
  index : any;
  Total : number;

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

  validation(){

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

  pay() {
    let navigationExtras: NavigationExtras = {
      state: {
        travel: this.travelParams,
      }
    };
    this.router.navigate(['/payment'], navigationExtras);
   }
}
